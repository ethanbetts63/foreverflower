from rest_framework import serializers
from ..models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id', 'amount', 'status', 'created_at', 'stripe_payment_intent_id'
        ]
        read_only_fields = ['id', 'created_at', 'stripe_payment_intent_id']