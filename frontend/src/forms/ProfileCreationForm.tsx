// frontend/src/components/flow/ProfileCreationForm.tsx
import React from 'react';
import { useForm, type Resolver, type FieldErrors } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import type { ProfileCreationData, ProfileCreationFormProps } from '../types/forms';

export const ProfileCreationForm: React.FC<ProfileCreationFormProps> = ({ initialData, onSubmit }) => {
    const form = useForm<ProfileCreationData>({
        resolver: profileFormResolver, // Use the custom resolver
        defaultValues: initialData,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="first_name" render={({ field }) => (
                        <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="last_name" render={({ field }) => (
                        <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} type="email" />
                        </FormControl>
                        <FormDescription>&nbsp;</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem><FormLabel>Password</FormLabel><FormControl><Input {...field} type="password" /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                        <FormItem><FormLabel>Confirm Password</FormLabel><FormControl><Input {...field} type="password" /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                
                <Button type="submit" id="profile-creation-submit" className="hidden" />
            </form>
        </Form>
    );
};