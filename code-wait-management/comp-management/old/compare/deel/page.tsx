// ExampleComparePage.tsx

import React from 'react';
import CompareLandingPage from '@/components/landing/CompareLandingPage';
import { ComparePageConfig } from '@/types/types';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export function generateStaticParams() {
    return ['en', 'de', 'es', 'fr', 'pt'].map((locale) => ({ locale }));
}

const ComparePage: React.FC<{ params: { locale: string } }> = ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);

    const t = useTranslations('Compare');


    const config: ComparePageConfig = {
        pageTitle: "Integration App vs Paragon",
        myProduct: {
            name: "Integration App",
            tagline: "Build any integration effortlessly",
            description: "Full flexibility and customization to create powerful integrations.",
            cta: {
                label: "Try Clous",
                url: "https://example.com/integrationapp"
            },
            sections: [
                {
                    heading: "Universal Integrations",
                    subheading: "Build once, integrate anywhere",
                    features: [
                        { title: "Google Suite", description: "Connect with your Google Workspace seamlessly." },
                        { title: "Salesforce", description: "Real-time sync of your CRM data." }
                    ]
                },
                {
                    heading: "Pre-built UI",
                    features: [
                        { title: "Customizable Dashboards", description: "Your users can plug and play." }
                    ]
                }
            ]
        },
        competitor: {
            name: "Paragon",
            tagline: "Old way integration, slow and limited",
            description: "Single-step integrations that lack flexibility.",
            cta: {
                label: "Visit Paragon",
                url: "https://paragon-example.com"
            },
            sections: [
                {
                    heading: "Single-step Integrations",
                    features: [
                        { title: "Slack", description: "Basic chat integration." },
                        { title: "HubSpot", description: "Limited CRM data sync." }
                    ]
                },
                {
                    heading: "Pre-built only",
                    features: [
                        { title: "Fixed UI", description: "No customization available." }
                    ]
                }
            ]
        },
        comparisonTable: {
            title: "Detailed Feature Comparison",
            rows: [
                { label: "Non-developer Support", myProductValue: "Full out-of-the-box", competitorValue: "Limited Workflow Builder" },
                { label: "API Access", myProductValue: "Full access & customizable", competitorValue: "Limited connectors" },
            ]
        },
        finalCta: {
            heading: "Supercharge your product integrations today",
            subheading: "Schedule a personalized demo",
            buttonLabel: "Get Started",
            buttonUrl: "https://example.com/demo"
        }
    };

    return <CompareLandingPage config={config} />;
};

export default ComparePage;
