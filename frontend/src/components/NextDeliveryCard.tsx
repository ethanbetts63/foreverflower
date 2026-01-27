// src/components/NextDeliveryCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Calendar, Hash, User, MapPin } from 'lucide-react';
import type { FlowerPlan, Event as PlanEvent } from '@/api';

export interface NextDeliveryInfo {
    plan: FlowerPlan;
    event: PlanEvent;
    deliveryIndex: number;
}

interface NextDeliveryCardProps {
    deliveryInfo: NextDeliveryInfo | null;
}

const NextDeliveryCard: React.FC<NextDeliveryCardProps> = ({ deliveryInfo }) => {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (!deliveryInfo) {
        return (
            <Card className="bg-white shadow-md border-none text-black">
                <CardHeader>
                    <CardTitle className="flex items-center text-xl font-semibold">
                        <Truck className="mr-3 h-6 w-6" />
                        Your Next Delivery
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">You have no upcoming deliveries scheduled.</p>
                </CardContent>
            </Card>
        );
    }
    
    const { plan, event, deliveryIndex } = deliveryInfo;
    const fullAddress = `${plan.recipient_address_line_1}${plan.recipient_address_line_2 ? `, ${plan.recipient_address_line_2}` : ''}, ${plan.recipient_city}, ${plan.recipient_state} ${plan.recipient_postcode}`;

    return (
        <Card className="bg-white shadow-md border-none text-black">
            <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                    <Truck className="mr-3 h-6 w-6" />
                    Your Next Delivery
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-start">
                    <Calendar className="h-4 w-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <span className="font-semibold">{formatDate(event.delivery_date)}</span>
                </div>
                <div className="flex items-start">
                    <Hash className="h-4 w-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <span>Plan #{plan.id} &mdash; Delivery {deliveryIndex} of {plan.events.length}</span>
                </div>
                <div className="flex items-start">
                    <User className="h-4 w-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <span>{plan.recipient_name}</span>
                </div>
                <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <span>{fullAddress}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default NextDeliveryCard;
