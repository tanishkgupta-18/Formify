"use client"
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { chatSession } from '@/configs/AIModel'
import { useUser } from '@clerk/nextjs'
import { JsonForms } from '@/configs/schema'
import { db } from '@/configs'
import moment from 'moment'
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react'

const PROMPT = ', on the basis of information create form with headings, subheadings, sections and all neccessary things';
function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState();
    const {user} = useUser();
    const route = useRouter();
    const handleSubmit = async() => {
        console.log("User Input:", userInput);
        setLoading(true);
        const result = await chatSession.sendMessage("Description:"+userInput+PROMPT);
        console.log(result.response.text());
        setOpenDialog(false);
        if(result.response.text()){
            const resp = await db.insert(JsonForms)
            .values({
                jsonform: result.response.text(),
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().toDate()
            }).returning({id:JsonForms.id});
            console.log("New Form ID",resp[0].id);
            if(resp[0].id){
                route.push(`/edit-form/${resp[0].id}`);
            }
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <div>
            {/* Open Dialog */}
            <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>

            <Dialog open={openDialog} onOpenChange={(isOpen) => setOpenDialog(isOpen)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new form</DialogTitle>
                        <DialogDescription>Enter form details below.</DialogDescription>
                    </DialogHeader>

                    {/* Form Content */}
                    <Textarea 
                        className='my-2' 
                        value={userInput} 
                        onChange={(event) => setUserInput(event.target.value)} 
                    />

                    <div className='flex items-center justify-between mt-4'>
                        <Button disabled={loading} onClick={handleSubmit}>{loading? <Loader2 className ='animate-spin'/> : 'Create'}</Button>
                        <Button variant='destructive' onClick={() => setOpenDialog(false)}>Cancel</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateForm
