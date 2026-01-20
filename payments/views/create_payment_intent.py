import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from events.models import FlowerPlan
from payments.models import Payment

# Initialize the Stripe API key once
stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntentView(APIView):
    """
    Creates a Stripe PaymentIntent for a given FlowerPlan.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        flower_plan_id = request.data.get('flower_plan_id')

        if not flower_plan_id:
            return Response(
                {"error": "flower_plan_id is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            flower_plan = FlowerPlan.objects.get(id=flower_plan_id, user=request.user)
        except FlowerPlan.DoesNotExist:
            return Response(
                {"error": "FlowerPlan not found or you don't have permission."},
                status=status.HTTP_404_NOT_FOUND
            )

        # The price is now directly related to the FlowerPlan
        try:
            price = flower_plan.price
            if not price or price.total_amount <= 0:
                # This case should ideally not happen if a price is always created with a plan
                raise AttributeError
        except AttributeError:
             return Response(
                {"error": f"No active price could be found for the selected flower plan."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        amount_in_cents = int(price.total_amount * 100)

        try:
            # Check if a payment record already exists and is pending
            existing_payment = Payment.objects.filter(flower_plan=flower_plan, status='pending').first()
            
            if existing_payment:
                # If a PaymentIntent was already created, retrieve and return its client secret
                payment_intent = stripe.PaymentIntent.retrieve(existing_payment.stripe_payment_intent_id)
            else:
                # Create a new PaymentIntent with Stripe
                payment_intent = stripe.PaymentIntent.create(
                    amount=amount_in_cents,
                    currency=price.currency,
                    automatic_payment_methods={'enabled': True},
                    metadata={
                        'flower_plan_id': flower_plan.id,
                        'user_id': request.user.id,
                    }
                )

                # Create a corresponding Payment record in our database
                Payment.objects.create(
                    user=request.user,
                    flower_plan=flower_plan,
                    stripe_payment_intent_id=payment_intent.id,
                    amount=price.total_amount,
                    status='pending'
                )

            return Response({
                'clientSecret': payment_intent.client_secret
            })

        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )