import React, { useState, useEffect, useMemo } from 'react';
import { getFlowerPlans, type FlowerPlan, type PlanEvent } from '@/api';
import NextDeliveryCard, { type NextDeliveryInfo } from '@/components/NextDeliveryCard';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const UserDashboardPage: React.FC = () => {
  const [plans, setPlans] = useState<FlowerPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await getFlowerPlans();
        setPlans(plansData);
      } catch (err: any) {
        toast.error("Failed to load your flower plans.", { description: err.message });
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const nextDelivery = useMemo((): NextDeliveryInfo | null => {
    const upcomingDeliveries: NextDeliveryInfo[] = [];
    const now = new Date();

    plans.forEach(plan => {
      if (plan.events && plan.events.length > 0) {
        const sortedEvents = [...plan.events].sort((a, b) => new Date(a.delivery_date).getTime() - new Date(b.delivery_date).getTime());
        
        plan.events
          .filter(event => new Date(event.delivery_date) >= now)
          .forEach(event => {
            const deliveryIndex = sortedEvents.findIndex(e => e.id === event.id);
            upcomingDeliveries.push({
              plan,
              event,
              deliveryIndex: deliveryIndex + 1,
            });
          });
      }
    });

    if (upcomingDeliveries.length === 0) {
      return null;
    }

    upcomingDeliveries.sort((a, b) => new Date(a.event.delivery_date).getTime() - new Date(b.event.delivery_date).getTime());

    return upcomingDeliveries[0];
  }, [plans]);

  return (
    <div className="w-full text-black">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <p className="mb-8 text-lg">
        This is your central hub for managing everything related to your Forever Flower account. 
        Here you can get a quick overview of your flower plans, upcoming deliveries, and recent account activity.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center col-span-1 md:col-span-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Loading your summary...</p>
          </div>
        ) : (
          <>
            <NextDeliveryCard deliveryInfo={nextDelivery} />
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">Flower Plan Status</h2>
              <p>You have <strong>{plans.length}</strong> active flower plan(s).</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
              <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>
              <p className="text-muted-foreground">Activity tracking coming soon.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
