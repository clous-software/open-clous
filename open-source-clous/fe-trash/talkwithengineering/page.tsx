// TalkWithEngineeringPage.tsx
"use client";
import React, { useState } from 'react';
import LandingPageForm from '@/components/pages/LandingPageForm';
import { sendNotifications } from '@/app/api/jobs/route';
import { useToast } from '@/hooks/use-toast';
const TalkWithEngineeringPage: React.FC = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();
    const formFields = [
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
        },
        {
            name: 'help_needed',
            label: 'Where do you need help?',
            type: 'select',
            options: [
                { value: 'data_ai', label: 'Data & AI' },
                { value: 'security_compliance', label: 'Security & Compliance' },
                { value: 'ux_engineering', label: 'UX Engineering' },
            ],
        },
    ];

    const handleSubmit = async (values: { [key: string]: any }) => {
        const email_body = `
    Email: ${values.email}
    Help Needed: ${values.help_needed}
        `;
        const email_subject = 'New Submission - Talk with Engineering';
        const type = 'notify_admin';
        const subtype = 'talk_with_engineering';

        try {
            const response = await sendNotifications({
                email_body,
                email_subject,
                type,
                subtype,
                email: values.email,
            });
            if (response.status === 200) {
                console.log('Email sent successfully');
                setIsSuccess(true);
                toast({
                    title: 'Email sent successfully',
                    description: 'Our success team will get back to you soon.',
                    variant: 'default',
                });
                // Show success message or redirect as needed
            } else {
                console.error('Error sending email');
                toast({
                    title: 'Error sending email',
                    description: 'Please try again later.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    return (
        <LandingPageForm
            title="Talk with our engineers"
            subtitle="Our engineers are ready to assist you in everything related to technology and adopting HR."
            formFields={formFields}
            onSubmit={handleSubmit}
            submitButtonLabel="Get help"
            showCarousel={false}
            showMap={true}
            showTeamSection={false}
            showFooter={true}
            isSuccess={isSuccess}
        />
    );
};

export default TalkWithEngineeringPage;
