// foreverflower/frontend/src/components/plan/StructureEditor.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import PlanStructureForm, { type PlanStructureData } from '@/forms/PlanStructureForm';
import BackButton from '@/components/BackButton';

interface StructureEditorProps {
    formData: PlanStructureData;
    onFormChange: (field: keyof PlanStructureData, value: number | string) => void;
    onSave: () => void;
    onCancel?: () => void;
    isSaving: boolean;
    isLoading: boolean;
    title: string;
    saveButtonText?: string;
    showCancelButton?: boolean;
    backButtonTo?: string;

    // Price calculation props
    amountOwing: number | null;
    isApiCalculating: boolean;
    isDebouncePending: boolean;
    calculationError: string | null;
    setIsDebouncePending: (isPending: boolean) => void;
}

const StructureEditor: React.FC<StructureEditorProps> = ({
    formData,
    onFormChange,
    onSave,
    onCancel,
    isSaving,
    isLoading,
    title,
    saveButtonText = 'Save Changes',
    showCancelButton = true,
    backButtonTo,
    amountOwing,
    isApiCalculating,
    isDebouncePending,
    calculationError,
    setIsDebouncePending
}) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        );
    }

    const getSaveButtonText = () => {
        if (amountOwing !== null && amountOwing > 0) {
            return 'Proceed to Payment';
        }
        return saveButtonText;
    }

    return (
        <Card className="bg-white text-black border-none shadow-md">
            <CardHeader>
                <CardTitle className="text-3xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <PlanStructureForm
                    formData={formData}
                    onFormChange={onFormChange}
                    setIsDebouncePending={setIsDebouncePending}
                    title=""
                />
                {/* Calculation Result */}
                <div className="mt-8 text-center h-12 flex flex-col items-center justify-center">
                    {(isApiCalculating || isDebouncePending) ? (
                        <Spinner className="h-8 w-8" />
                    ) : (
                        amountOwing !== null && (
                        <>
                            <div className="text-2xl font-bold">${amountOwing.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <p className="text-xs text-gray-600">Amount to pay (inc. service free, delivery & tax)</p>
                        </>
                        )
                    )}
                    {calculationError && <div className="text-red-500 text-sm">{calculationError}</div>}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                {backButtonTo ? <BackButton to={backButtonTo} /> : <div />}
                <div className="flex gap-4">
                    {showCancelButton && onCancel && (
                        <Button variant="outline" size="lg" onClick={onCancel} disabled={isSaving}>
                            Cancel
                        </Button>
                    )}
                    <Button size="lg" onClick={onSave} disabled={isSaving || isApiCalculating || isDebouncePending || amountOwing === null}>
                        {isSaving 
                            ? <Spinner className="mr-2 h-4 w-4" /> 
                            : getSaveButtonText()
                        }
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default StructureEditor;
