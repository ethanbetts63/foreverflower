# foreverflower/events/serializers/flower_plan_serializer.py
from rest_framework import serializers
from ..models import FlowerPlan, Color, FlowerType
from .event_serializer import EventSerializer
from payments.serializers.payment_serializer import PaymentSerializer # New Import

class FlowerPlanSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    events = EventSerializer(many=True, read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)

    budget = serializers.DecimalField(
        max_digits=10, decimal_places=2
    )
    years = serializers.IntegerField()
    deliveries_per_year = serializers.IntegerField()

    preferred_colors = serializers.PrimaryKeyRelatedField(
        queryset=Color.objects.all(), many=True, required=False
    )
    preferred_flower_types = serializers.PrimaryKeyRelatedField(
        queryset=FlowerType.objects.all(), many=True, required=False
    )
    rejected_colors = serializers.PrimaryKeyRelatedField(
        queryset=Color.objects.all(), many=True, required=False
    )
    rejected_flower_types = serializers.PrimaryKeyRelatedField(
        queryset=FlowerType.objects.all(), many=True, required=False
    )

    # Make total_amount and currency explicitly writable fields
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, allow_null=True)
    currency = serializers.CharField(max_length=3, required=False, allow_null=True)

    class Meta:
        model = FlowerPlan
        fields = [
            'id', 'user', 'is_active', 'budget', 'deliveries_per_year',
            'years', 'notes', 'created_at', 'updated_at',
            'total_amount', 'currency',
            'recipient_first_name', 'recipient_last_name',
            'recipient_street_address', 'recipient_suburb', 'recipient_city',
            'recipient_state', 'recipient_postcode', 'recipient_country',
            'preferred_colors', 'preferred_flower_types', 'rejected_colors', 'rejected_flower_types',
            'events', 'payments',
        ]
        read_only_fields = [
            'id', 'is_active', 'created_at', 'updated_at' # Removed total_amount and currency
        ]

    def update(self, instance, validated_data):
        # Prevent direct updates to total_amount/currency if the plan is active
        if instance.is_active:
            if 'total_amount' in validated_data:
                raise serializers.ValidationError(
                    "Cannot directly update 'total_amount' for an active plan. "
                    "This field is managed via payment webhooks."
                )
            if 'currency' in validated_data:
                raise serializers.ValidationError(
                    "Cannot directly update 'currency' for an active plan. "
                    "This field is managed via payment webhooks."
                )

        # Allow updates for inactive plans or other fields
        return super().update(instance, validated_data)





