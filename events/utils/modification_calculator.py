# foreverflower/events/utils/modification_calculator.py
from decimal import Decimal
from django.db import models
from .pricing_calculators import forever_flower_upfront_price
from payments.models import Payment

def calculate_modification_details(flower_plan, new_structure: dict):
    """
    Calculates the financial details of a plan modification.

    Args:
        flower_plan: The FlowerPlan instance being modified.
        new_structure (dict): A dictionary with the proposed new structure,
                              containing keys like 'budget', 'deliveries_per_year', 'years'.

    Returns:
        A dictionary containing the new total price, the amount already paid,
        and the final amount owing.
    """
    # 1. Calculate the new total price based on the proposed structure
    new_total_price, _ = forever_flower_upfront_price(
        budget=new_structure['budget'],
        deliveries_per_year=new_structure['deliveries_per_year'],
        years=new_structure['years']
    )

    # 2. Calculate the total amount already paid for this plan
    total_paid = flower_plan.payments.filter(status='succeeded').aggregate(
        total=models.Sum('amount')
    )['total'] or Decimal('0.00')

    # 3. Calculate the difference
    amount_owing = Decimal(new_total_price) - total_paid

    # Ensure amount_owing is not negative for this calculation's purpose
    if amount_owing < 0:
        # In a downgrade scenario, the user doesn't owe anything.
        # The extra value is handled by adjusting the plan (e.g., higher budget),
        # but for this calculation, the amount to pay is zero.
        amount_owing = Decimal('0.00')

    return {
        "new_total_price": round(Decimal(new_total_price), 2),
        "total_paid": round(total_paid, 2),
        "amount_owing": round(amount_owing, 2),
    }
