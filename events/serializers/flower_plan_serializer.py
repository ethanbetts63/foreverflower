# foreverflower/events/serializers/flower_plan_serializer.py
from rest_framework import serializers
from ..models import FlowerPlan, Color, FlowerType
from .event_serializer import EventSerializer

class FlowerPlanSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    # This field is for reading the nested events, it's ignored on write operations.
    events = EventSerializer(many=True, read_only=True)

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
            'events',  
        ]
        read_only_fields = [
            'id', 'is_active', 'created_at', 'updated_at', 'total_amount', 'currency'
        ]




