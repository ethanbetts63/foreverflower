// foreverflower/frontend/src/pages/flow/BookingConfirmationPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';
import { toast } from 'sonner';
import { useEffect } from 'react';

const BookingConfirmationPage: React.FC = () => {
    const { planId } = useParams<{ planId: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("You must be logged in to access this page.");
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleConfirm = () => {
        toast.info("Payment page not yet implemented.");
        // Future: navigate(`/flower-plan/${planId}/payment`);
    };

    if (!isAuthenticated) {
        return null; // or a loading spinner while redirecting
    }

    return (
        <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--color4)' }}>
            <div className="container mx-auto max-w-2xl py-12">
                <Seo title="Confirm Your Plan | ForeverFlower" />
                <Card className="bg-white text-black border-none shadow-md">
                    <CardHeader>
                        <CardTitle className="text-3xl">Step 4: Confirm Your Plan</CardTitle>
                        <CardDescription className="text-black">
                            Please review your flower plan details below before proceeding to payment.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Plan ID: {planId}</p>
                        <p className="mt-4"><strong>TODO:</strong> Display a summary of the plan details and selected preferences here.</p>
                    </CardContent>
                     <CardFooter className="flex justify-end">
                        <Button size="lg" onClick={handleConfirm}>
                            Proceed to Payment
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default BookingConfirmationPage;
