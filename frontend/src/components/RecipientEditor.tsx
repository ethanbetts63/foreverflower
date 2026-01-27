// foreverflower/frontend/src/components/plan/RecipientEditor.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import RecipientForm, { type RecipientData } from '@/forms/RecipientForm';
import BackButton from '@/components/BackButton';

interface RecipientEditorProps {
    formData: RecipientData;
    onFormChange: (field: keyof RecipientData, value: string) => void;
    onSave: () => void;
    onCancel?: () => void;
    isSaving: boolean;
    isLoading: boolean;
    title: string;
    saveButtonText?: string;
    cancelButtonText?: string;
    showCancelButton?: boolean;
    backButtonTo?: string;
}

const RecipientEditor: React.FC<RecipientEditorProps> = ({
    formData,
    onFormChange,
    onSave,
    onCancel,
    isSaving,
    isLoading,
    title,
    saveButtonText = 'Save Changes',
    cancelButtonText = 'Cancel',
    showCancelButton = true,
    backButtonTo
}) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        );
    }

    return (
        <Card className="bg-white text-black border-none shadow-md">
            <CardHeader>
                <CardTitle className="text-3xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <RecipientForm
                    formData={formData}
                    onFormChange={onFormChange}
                    title="" // Title is handled by the CardHeader
                />
            </CardContent>
            <CardFooter className="flex justify-between">
                {backButtonTo ? <BackButton to={backButtonTo} /> : <div />}
                <div className="flex gap-4">
                    {showCancelButton && onCancel && (
                        <Button variant="outline" size="lg" onClick={onCancel} disabled={isSaving}>
                            {cancelButtonText}
                        </Button>
                    )}
                    <Button size="lg" onClick={onSave} disabled={isSaving}>
                        {isSaving ? <Spinner className="mr-2 h-4 w-4" /> : saveButtonText}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default RecipientEditor;
