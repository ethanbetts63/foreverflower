// foreverflower/frontend/src/pages/user_dashboard/EditRecipientPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { getFlowerPlan, updateFlowerPlan, type PartialFlowerPlan } from '@/api';
import type { RecipientData } from '@/forms/RecipientForm';
import RecipientEditor from '@/components/plan/RecipientEditor';
import Seo from '@/components/Seo';

const EditRecipientPage: React.FC = () => {
    const { planId } = useParams<{ planId: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [formData, setFormData] = useState<RecipientData>({
        recipient_first_name: '',
        recipient_last_name: '',
        recipient_street_address: '',
        recipient_suburb: '',
        recipient_city: '',
        recipient_state: '',
        recipient_postcode: '',
        recipient_country: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("You must be logged in to edit a plan.");
            navigate('/login');
            return;
        }
        if (!planId) {
            toast.error("No flower plan specified.");
            navigate('/dashboard');
            return;
        }

        const fetchPlanData = async () => {
            setIsLoading(true);
            try {
                const plan = await getFlowerPlan(planId);
                setFormData({
                    recipient_first_name: plan.recipient_first_name || '',
                    recipient_last_name: plan.recipient_last_name || '',
                    recipient_street_address: plan.recipient_street_address || '',
                    recipient_suburb: plan.recipient_suburb || '',
                    recipient_city: plan.recipient_city || '',
                    recipient_state: plan.recipient_state || '',
                    recipient_postcode: plan.recipient_postcode || '',
                    recipient_country: plan.recipient_country || '',
                });
            } catch (err) {
                toast.error("Failed to load plan data.");
                navigate('/dashboard');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlanData();
    }, [planId, isAuthenticated, navigate]);

    const handleFormChange = (field: keyof RecipientData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!planId) return;
        setIsSaving(true);
        try {
            const payload: PartialFlowerPlan = { ...formData };
            await updateFlowerPlan(planId, payload);
            toast.success("Recipient details updated successfully!");
            navigate(`/dashboard/plans/${planId}/overview`);
        } catch (err) {
            toast.error("Failed to update recipient details.");
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleCancel = () => {
        if (planId) {
            navigate(`/dashboard/plans/${planId}/overview`);
        } else {
            navigate('/dashboard');
        }
    }

    return (
        <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--color4)' }}>
            <div className="container mx-auto max-w-2xl py-12">
                <Seo title="Edit Recipient | ForeverFlower" />
                <RecipientEditor
                    formData={formData}
                    onFormChange={handleFormChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    isSaving={isSaving}
                    isLoading={isLoading}
                    title="Edit Recipient Details"
                    saveButtonText="Save Changes"
                    showCancelButton={true}
                    backButtonTo={planId ? `/dashboard/plans/${planId}/overview` : '/dashboard'}
                />
            </div>
        </div>
    );
};

export default EditRecipientPage;

