"use client";

import React from 'react';
import { FiCode, FiDatabase, FiLayers, FiShield, FiUsers, FiSettings, FiTrendingUp, FiCpu, FiGlobe } from 'react-icons/fi';
import UseCaseTemplate from '@/components/templates/UseCaseTemplate';

const FeaturesPage = () => {
    // Sample data for the feature showcase
    const featureShowcaseData = [
        {
            id: "feature1",
            title: "AI Matching",
            description: "Advanced AI algorithms match candidates to jobs with unprecedented accuracy, reducing time-to-hire by up to 50%.",
            bgGradient: "bg-gradient-to-r from-blue-600 to-indigo-600",
            icon: <FiUsers className="w-10 h-10" />,
            ctaText: "Learn More",
            ctaLink: "/features/ai-matching"
        },
        {
            id: "feature2",
            title: "Smart Analytics",
            description: "Gain deep insights into your recruitment process with real-time analytics and customizable dashboards.",
            bgGradient: "bg-gradient-to-r from-purple-600 to-pink-600",
            icon: <FiDatabase className="w-10 h-10" />,
            ctaText: "Explore Analytics",
            ctaLink: "/features/analytics"
        },
        {
            id: "feature3",
            title: "Automated Workflows",
            description: "Streamline your hiring process with customizable automated workflows that adapt to your unique requirements.",
            bgGradient: "bg-gradient-to-r from-green-600 to-teal-600",
            icon: <FiLayers className="w-10 h-10" />,
            ctaText: "See How It Works",
            ctaLink: "/features/workflows"
        },
        {
            id: "feature4",
            title: "Security First",
            description: "Enterprise-grade security to protect your sensitive recruitment data with SOC 2 and GDPR compliance.",
            bgGradient: "bg-gradient-to-r from-red-600 to-orange-600",
            icon: <FiShield className="w-10 h-10" />,
            ctaText: "Security Details",
            ctaLink: "/features/security"
        },
        {
            id: "feature5",
            title: "Developer API",
            description: "Integrate with your existing tools using our comprehensive API and webhooks for seamless connectivity.",
            bgGradient: "bg-gradient-to-r from-yellow-600 to-amber-600",
            icon: <FiCode className="w-10 h-10" />,
            ctaText: "API Documentation",
            ctaLink: "/developers/api"
        }
    ];

    // Features for the feature section
    const features = [
        {
            id: "feature1",
            title: "AI-Powered Talent Matching",
            description: "Our advanced AI algorithms analyze skills, experience, and cultural fit to match the right candidates with the right roles.",
            variant: "withTags",
            media: {
                type: "image",
                src: "https://clous.s3.eu-west-3.amazonaws.com/images/Hiring_Processes_Automate_Text-Heavy_Tasks_By_Clous.webp",
                alt: "AI Matching"
            },
            tags: [
                { id: "1", label: "AI" },
                { id: "2", label: "Machine Learning" },
                { id: "3", label: "Talent Matching" }
            ],
            ctaText: "Learn More",
            ctaLink: "/features/ai-matching"
        },
        {
            id: "feature2",
            title: "Comprehensive Analytics",
            description: "Get real-time insights into your recruitment process with customizable dashboards and reports.",
            variant: "withSubtitles",
            media: {
                type: "image",
                src: "https://clous.s3.eu-west-3.amazonaws.com/images/Create-People-Analytics-with-Clous-Peer.webp",
                alt: "Analytics Dashboard"
            },
            subtitles: [
                { text: "Performance Metrics", icon: <FiTrendingUp /> },
                { text: "Candidate Insights", icon: <FiUsers /> },
                { text: "Process Optimization", icon: <FiSettings /> }
            ]
        }
    ];

    // Benefit cards
    const benefitCards = [
        {
            title: "Increased Efficiency",
            description: "Reduce time-to-hire by up to 50% with automated workflows and AI-powered matching.",
            icon: <FiTrendingUp className="w-8 h-8" />
        },
        {
            title: "Better Candidate Experience",
            description: "Provide a seamless and personalized experience for candidates throughout the recruitment process.",
            icon: <FiUsers className="w-8 h-8" />
        },
        {
            title: "Data-Driven Decisions",
            description: "Make informed decisions based on real-time analytics and insights.",
            icon: <FiDatabase className="w-8 h-8" />
        },
        {
            title: "Global Talent Pool",
            description: "Access a diverse pool of talent from around the world with our platform.",
            icon: <FiGlobe className="w-8 h-8" />
        },
        {
            title: "Advanced Technology",
            description: "Stay ahead of the competition with cutting-edge AI and machine learning technology.",
            icon: <FiCpu className="w-8 h-8" />
        },
        {
            title: "Customizable Workflows",
            description: "Tailor the platform to your specific recruitment needs and processes.",
            icon: <FiSettings className="w-8 h-8" />
        }
    ];

    // Testimonials
    const testimonials = [
        {
            quote: "This platform has revolutionized our recruitment process. We've reduced our time-to-hire by 40% and improved the quality of our hires.",
            author: "Sarah Johnson",
            role: "Head of Talent Acquisition, TechCorp",
            imageSrc: "https://clous.s3.eu-west-3.amazonaws.com/images/avatar1.jpg"
        },
        {
            quote: "The AI matching capabilities are incredible. We're finding candidates that are not only qualified but also a great cultural fit for our organization.",
            author: "Michael Chen",
            role: "HR Director, InnovateX",
            imageSrc: "https://clous.s3.eu-west-3.amazonaws.com/images/avatar2.jpg"
        },
        {
            quote: "The analytics dashboard has given us insights we never had before. We can now make data-driven decisions about our recruitment strategy.",
            author: "Emily Rodriguez",
            role: "Recruitment Manager, GlobalFirm",
            imageSrc: "https://clous.s3.eu-west-3.amazonaws.com/images/avatar3.jpg"
        }
    ];

    return (
        null
        // <UseCaseTemplate
        //     title="Powerful Features for Modern Recruitment"
        //     subtitle="Discover the innovative features that make our platform the leading solution for modern recruitment teams."
        //     description="Our platform offers a comprehensive suite of features designed to streamline your recruitment process and help you find the best talent."
        //     heroSection={{
        //         title: "Powerful Features for Modern Recruitment",
        //         description: "Discover the innovative features that make our platform the leading solution for modern recruitment teams.",
        //         ctaText: "Get Started",
        //         ctaLink: "/signup",
        //         backgroundImage: "https://clous.s3.eu-west-3.amazonaws.com/images/hero-recruitment.jpg"
        //     }}
        //     useCaseSection={{
        //         title: "Transform Your Recruitment Process",
        //         description: "Our platform offers a comprehensive suite of features designed to streamline your recruitment process and help you find the best talent.",
        //         points: [
        //             "AI-powered talent matching for better candidate selection",
        //             "Comprehensive analytics for data-driven decisions",
        //             "Automated workflows to reduce manual tasks",
        //             "Seamless integration with your existing tools"
        //         ],
        //         imageSrc: "https://clous.s3.eu-west-3.amazonaws.com/images/JobOpeningEditor.webp",
        //         imageAlt: "Platform Overview"
        //     }}
        //     // features={features}
        //     showcaseSection={{
        //         features: featureShowcaseData,
        //         title: "Explore Our Features",
        //         subtitle: "Hover over each feature to learn more"
        //     }}
        //     testimonials={testimonials}
        //     ctaSection={{
        //         title: "Ready to Transform Your Recruitment Process?",
        //         description: "Join thousands of companies that are already using our platform to find the best talent.",
        //         ctaText: "Start Free Trial",
        //         ctaLink: "/signup"
        //     }}
        //     benefitCards={benefitCards}
        //     showGlassMorphicShowcase={true}
        //     darkMode={false}
        // />
    );
};

export default FeaturesPage; 