"use client";
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq, and } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from 'lucide-react';
import FormUi from '../_components/FormUi';
import { Toaster, toast } from "sonner"; // ✅ Correct import
import Controller from '../_components/Controller';

function EditForm() {
    const { user } = useUser();  
    const params = useParams(); 
    const [jsonForm, setJsonForm] = useState(null);
    const router = useRouter();
    const [lastUpdated, setLastUpdated] = useState(null);
    const [record, setRecord] = useState(null);
    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            GetFormData();
        }
    }, [user]);

    const GetFormData = async () => {
        try {
            const result = await db
                .select()
                .from(JsonForms)
                .where(
                    and(
                        eq(JsonForms.id, Number(params?.formId)), 
                        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
                    )
                );

            if (result.length > 0) {
                setRecord(result[0]);
                setJsonForm(JSON.parse(result[0].jsonform));
            } else {
                toast.error("Form not found");
            }
        } catch (error) {
            toast.error("Error fetching form data");
            console.error(error);
        }
    };

    const updateJsonFormInDb = async () => {
        if (!record || !jsonForm) return;
        try {
            await db.update(JsonForms)
                .set({ jsonform: JSON.stringify(jsonForm) })
                .where(
                    and(
                        eq(JsonForms.id, record.id),
                        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
                    )
                );
            toast.success("Form auto-saved");
        } catch (err) {
            toast.error("Failed to update form");
            console.error(err);
        }
    };

    useEffect(() => {
        if (lastUpdated) {
            updateJsonFormInDb();
        }
    }, [lastUpdated]);

    const handleFieldUpdate = (updatedForm) => {
        setJsonForm(updatedForm);
        setLastUpdated(Date.now());
    };

    return (
        <div className='p-10'>
            <Toaster richColors />
            <h2 
                className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold' 
                onClick={() => router.back()}
            >
                <ArrowLeft /> Back
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='p-5 border rounded-lg shadow-md'>
                    <h3><Controller/></h3>
                </div>
                <div className='md:col-span-2 border rounded-lg p-4 min-h-screen'>
                    <FormUi jsonForm={jsonForm} onFieldUpdate={handleFieldUpdate} />
                </div>
            </div>
        </div>
    );
}

export default EditForm;
