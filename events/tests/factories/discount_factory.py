import factory
from factory.django import DjangoModelFactory
from factory import Faker
from events.models import Discount

class DiscountFactory(DjangoModelFactory):
    class Meta:
        model = Discount

    code = Faker('bothify', text='DISCOUNT####')
    florist_name = Faker('name')
    active = Faker('boolean')
    expiry_date = Faker('future_datetime')
