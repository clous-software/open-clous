// TalkToSalesPage.tsx
"use client";
import React, { useState } from 'react';
import LandingPageForm from '@/components/pages/LandingPageForm';
import { sendNotifications } from '@/app/api/jobs/route';
import { useToast } from '@/hooks/use-toast';

const TalkToSalesPage: React.FC = () => {
    const { toast } = useToast();
    const [isSuccess, setIsSuccess] = useState(false);

    const formFields = [
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
        },
        {
            name: 'company',
            label: 'Company',
            type: 'text',
            placeholder: 'Enter your company name',
        },
        {
            name: 'company_size',
            label: 'Company Size',
            type: 'select',
            options: [
                { value: '1-10', label: '1-10' },
                { value: '11-50', label: '11-50' },
                { value: '51-200', label: '51-200' },
                { value: '201-500', label: '201-500' },
                { value: '501-1000', label: '501-1000' },
                { value: '1000+', label: '1000+' },
            ],
        },
        {
            name: 'tools_used',
            label: 'Tools Used',
            type: 'textarea',
            placeholder: 'List the tools you are currently using',
        },
        {
            name: 'reason',
            label: 'Reason of Contact',
            type: 'textarea',
            placeholder: 'Tell us why you are contacting us',
        },
    ];

    const handleSubmit = async (values: { [key: string]: any }) => {
        const email_body = `
    Email: ${values.email}
    Need: ${values.need}
        `;
        const email_subject = 'New Submission - Talk with Sales';
        const type = 'notify_admin';
        const subtype = 'talk_with_sales';

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
                // setJoinedSuccess(true);
                // Show success message or redirect as needed
                toast({
                    title: 'Email sent successfully',
                    description: 'Our sales team will get back to you soon.',
                });
                setIsSuccess(true);
            } else {
                console.error('Error sending email');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    return (
        <LandingPageForm
            title="Talk with sales"
            subtitle="Our sales team also has expertise in everything related to HR tech, and they're here to help you make a decision."
            formFields={formFields}
            onSubmit={handleSubmit}
            submitButtonLabel="Get in touch"
            showCarousel={true}
            showMap={false}
            showTeamSection={false}
            showFooter={true}
            isSuccess={isSuccess}
        />
    );
};

export default TalkToSalesPage;
