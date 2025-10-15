// pages/custom-landing.tsx
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import CustomContentSection from '@/components/sections/CustomContentSection';
import FeatureSection from '@/components/sections/FeatureSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/navigation/Footer';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export function generateStaticParams() {
    return ['en', 'de', 'es', 'fr', 'pt'].map((locale) => ({ locale }));
}

const CustomLandingPage = ({ params: { locale } }: { params: { locale: string } }) => {
    unstable_setRequestLocale(locale);
    const t = useTranslations('Showcase');
    // Mock data; replace with real account and lead information
    const accountName = 'Acme Corp';
    const leadName = 'John Doe';
    const customMessage = 'We have tailored solutions just for your team.';

    const features = [
        {
            title: 'Feature One',
            description: 'Description of feature one.',
            imageSrc: '/images/feature1.jpg',
            imageAlt: 'Feature One Image',
            variant: 'default', // Replace 'basic' with an actual variant value
            media: {
                type: 'image',
                src: '/images/feature1.jpg',
                alt: 'Feature One Image',
            },
        },
        // Add more features as needed, ensuring they include the 'variant' property
    ];


    const testimonials = [
        {
            quote: 'This product changed our workflow completely!',
            author: 'Jane Smith',
            role: 'CTO at Beta Inc.',
            imageSrc: '/images/testimonial1.jpg',
        },
        // Add more testimonials as needed
    ];

    return (
        <>
            <head>
                <title>{t('SEO.title')}</title>
                <meta name="title" content={t('SEO.title')} />
                <meta name="description" content={t('SEO.description')} />

                <link rel="alternate" href={`https://www.clous.app/${locale}`} hrefLang={locale} />

                <meta name='image' content={t('SEO.image')} />

                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="Clous Engineering & Product Teams" />
                <meta name="publisher" content="Clous Technology SL" />
                <meta name="theme-color" content="#F26C21" />

                {/* Favicon Links */}
                <link rel="icon" href="https://clous.s3.eu-west-3.amazonaws.com/favicon.ico" type="image/x-icon" sizes="16x16" />
                <link rel="icon" href="https://clous.s3.eu-west-3.amazonaws.com/32x32Logo.png" type="image/png" sizes="32x32" />
                <link rel="icon" href="https://clous.s3.eu-west-3.amazonaws.com/64x64Logo.png" type="image/png" sizes="64x64" />
                <link rel="apple-touch-icon" href="https://clous.s3.eu-west-3.amazonaws.com/favicon.ico" />

                {/* Robots Tag */}
                <meta name="robots" content="index, follow" />

                <meta property="og:url" content={t('SEO.openGraph.url')} />
                <meta property="og:type" content={t('SEO.openGraph.type')} />
                <meta property="og:title" content={t('SEO.openGraph.title')} />
                <meta property="og:description" content={t('SEO.openGraph.description')} />

                <meta name="twitter:card" content={t('SEO.twitter.card')} />
                <meta name="twitter:title" content={t('SEO.twitter.title')} />
                <meta name="twitter:description" content={t('SEO.description')} />
                <meta name="twitter:image" content={t('SEO.image')} />
            </head>
            <Navbar />
            <HeroSection
                title={`Welcome, ${leadName}!`}
                description="Discover how our solutions can help your team at Acme Corp."
                ctaText="Get Started"
                ctaLink="/signup"
                backgroundImage="/images/hero-bg.jpg"
            />
            <CustomContentSection
                accountName={accountName}
                leadName={leadName}
                customMessage={customMessage}
            />
            <FeatureSection features={features} />
            <TestimonialSection testimonials={testimonials} />
            <CTASection
                title="Ready to take the next step?"
                ctaText="Contact Us"
                ctaLink="/contact"
            />
            <Footer />
        </>
    );
};

export default CustomLandingPage;
