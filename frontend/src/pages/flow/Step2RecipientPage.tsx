import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { getFlowerPlan, updateFlowerPlan } from '@/api';
import type { RecipientData } from '@/forms/RecipientForm';
import RecipientEditor from '@/components/RecipientEditor';
import Seo from '@/components/Seo';

const RecipientPage: React.FC = () => {
    const navigate = useNavigate();
    const { planId } = useParams<{ planId: string }>();
    const { isAuthenticated } = useAuth();
    
    const [formData, setFormData] = useState<RecipientData>({
        recipient_first_name: '',
        recipient_last_name: '',
        recipient_street_address: '',
        recipient_suburb: '',
        recipient_city: '',
        recipient_state: '',
        recipient_postcode: '',
        recipient_country: 'New Zealand',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("You must be logged in to create a plan.");
            navigate('/login');
            return;
        }
        if (!planId) {
            toast.error("No plan ID was provided.");
            navigate('/dashboard');
            return;
        }

        setIsLoading(true);
        getFlowerPlan(planId)
            .then(plan => {
                setFormData({
                    recipient_first_name: plan.recipient_first_name || '',
                    recipient_last_name: plan.recipient_last_name || '',
                    recipient_street_address: plan.recipient_street_address || '',
                    recipient_suburb: plan.recipient_suburb || '',
                    recipient_city: plan.recipient_city || '',
                    recipient_state: plan.recipient_state || '',
                    recipient_postcode: plan.recipient_postcode || '',
                    recipient_country: plan.recipient_country || 'New Zealand',
                });
            })
            .catch(error => {
                toast.error("Failed to load plan details", { description: error.message });
                navigate('/dashboard');
            })
            .finally(() => setIsLoading(false));

    }, [planId, isAuthenticated, navigate]);

    const handleFormChange = (field: keyof RecipientData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = async () => {
        if (!planId) return;

        if (!formData.recipient_first_name || !formData.recipient_street_address || !formData.recipient_city) {
            toast.error("Please fill in at least the recipient's first name, address, and city.");
            return;
        }
        
        setIsSaving(true);
        try {
            await updateFlowerPlan(planId, formData);
            navigate(`/book-flow/flower-plan/${planId}/preferences`);
        } catch (error: any) {
            toast.error("Failed to save recipient details", { description: error.message });
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleCancel = () => {
        navigate('/dashboard');
    }

    return (
        <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--color4)' }}>
            <div className="container mx-auto max-w-2xl py-12">
                <Seo title="Create Plan: Recipient | ForeverFlower" />
                <RecipientEditor
                    formData={formData}
                    onFormChange={handleFormChange}
                    onSave={handleNext}
                    onCancel={handleCancel}
                    isSaving={isSaving}
                    isLoading={isLoading}
                    title="Who is receiving the flowers?"
                    saveButtonText="Next: Plan Preferences"
                    showCancelButton={true}
                    cancelButtonText="Cancel"
                />
            </div>
        </div>
    );
};

export default RecipientPage;
