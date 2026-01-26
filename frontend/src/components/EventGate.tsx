// frontend/src/components/EventGate.tsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Seo from '../components/Seo';
import { getOrCreateInactiveFlowerPlan } from '@/api';
import { toast } from 'sonner';

const EventGate: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const hasInitiated = useRef(false);

    useEffect(() => {
        if (isLoading || hasInitiated.current) {
            return;
        }

        if (isAuthenticated) {
            hasInitiated.current = true;
            const findOrCreatePlan = async () => {
                try {
                    const plan = await getOrCreateInactiveFlowerPlan();
                    navigate(`/book-flow/flower-plan/${plan.id}/recipient`, { replace: true });
                } catch (error: any) {
                    toast.error("Could not prepare your plan", {
                        description: error.message || "Please try again later.",
                    });
                    navigate('/dashboard', { replace: true });
                }
            };
            findOrCreatePlan();
        } else {
            navigate('/book-flow/create-account', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

    // Render a loading indicator while we determine the auth state
    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <Seo
                title="Create a Long-Term Reminder Event | ForeverFlower"
                description="Start here to create a new persistent, long-term reminder. We'll guide you through setting up your event and notification preferences."
                canonicalPath="/event-gate"
                noindex={true}
            />
            <div className="text-center">
                <p className="text-lg font-semibold">Preparing your workspace...</p>
                <p className="text-muted-foreground">Redirecting...</p>
            </div>
        </div>
    );
};

export default EventGate;