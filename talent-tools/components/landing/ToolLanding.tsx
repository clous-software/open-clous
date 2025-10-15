// components/LandingTemplate.tsx
"use client";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import Footer from "@/components/navigation/Footer";
import FileInput from "@/components/ui/fileInput";
import mammoth from 'mammoth';
import Link from 'next/link';
import Services from '@/components/sections/Services';
import BandBlogs from '@/components/sections/BandBlogs';
import Uvp from '@/components/sections/Uvp';
import { IoLogoTwitter, IoLogoLinkedin } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';

interface LandingTemplateProps {
    namespace: string;
    apiEndpoint: string;
    ctaLink: string;
}

const LandingTemplate: React.FC<LandingTemplateProps> = ({ namespace, apiEndpoint, ctaLink }) => {
    const t = useTranslations(namespace);

    const [filePreview, setFilePreview] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [response, setResponse] = useState<string>('');
    const [isCtaActive, setIsCtaActive] = useState<boolean>(false);
    const [pdfjsLib, setPdfjsLib] = useState<typeof import('pdfjs-dist') | null>(null);

    const { scrollYProgress } = useScroll();
    const sectionHeight = 0.05;
    const rotate = useTransform(scrollYProgress, [0, sectionHeight], [20, 0]);
    const translate = useTransform(scrollYProgress, [0, sectionHeight], [0, -100]);

    useEffect(() => {
        const loadPdfJs = async () => {
            try {
                const pdfjs = (await import('pdfjs-dist'));
                pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
                setPdfjsLib(pdfjs);
            } catch (error) {
                console.error('Error loading PDF.js library:', error);
            }
        };
        loadPdfJs();
    }, []);

    async function extractTextFromPdf(file: File): Promise<string> {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib?.getDocument({ data: arrayBuffer }).promise;

        let fullText = '';

        if (pdf) {
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += `${pageText} \n`;
            }
        }
        return fullText;
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const fileType = file.type;
            const reader = new FileReader();

            reader.onloadend = async () => {
                let resumeText = "";

                if (fileType === "application/pdf") {
                    resumeText = await extractTextFromPdf(file);
                } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                    const wordData = await mammoth.extractRawText({ arrayBuffer: reader.result as ArrayBuffer });
                    resumeText = wordData.value;
                } else if (fileType.startsWith("text/")) {
                    resumeText = reader.result as string;
                } else {
                    console.error("Unsupported file type");
                    return;
                }

                setFilePreview(reader.result as string);
                handleUpload(resumeText);
            };

            if (fileType === "application/pdf" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsText(file);
            }
        }
    };

    const simulateTyping = (textToType: string) => {
        setIsTyping(true);
        const decodeHTMLEntities = (text: string) => {
            const textArea = document.createElement('textarea');
            textArea.innerHTML = text;
            return textArea.value;
        };

        const words = decodeHTMLEntities(textToType).split(" ");
        let currentIndex = 0;

        const animateTyping = () => {
            if (currentIndex < words.length) {
                const partialText = words.slice(0, currentIndex + 1).join(" ");
                setResponse(
                    partialText +
                    '<span class="fade-in"></span>' +
                    (currentIndex === words.length - 1 ? "" : '<span class="cursorRound ml-1"></span>')
                );

                currentIndex++;
                requestAnimationFrame(animateTyping);
            } else {
                setIsCtaActive(true);
            }
        };

        requestAnimationFrame(animateTyping);
    };

    const handleUpload = async (resumeText: string) => {
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resumeText }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const chatResponse = data.chatResponse || "";
            simulateTyping(chatResponse);
        } catch (error) {
            console.error('Error in handleUpload:', error);
        }
    };

    const ScrollHeader: React.FC<{ translate: any }> = ({ translate }) => {
        return (
            <motion.div
                style={{
                    translateY: translate,
                }}
                className="div mx-auto text-left mb-12 flex flex-col lg:flex-row lg:gap-12"
            >
                <div className='w-[60%]'>
                    <h1 className="text-3xl lg:text-5xl fadeOut relative max-w-2xl">
                        {t('hero.title')}
                    </h1>
                    <p className="mt-3 mb-2 text-dark-gray font-medium lg:max-w-2xl">{t('hero.description')}</p>
                    <div className="mt-2 text-xl gap-2 fadeOut">
                        <Button
                            onClick={() => window.open(ctaLink)}
                            className="text-white max-w-[12rem]"
                        >{t('hero.cta')}</Button>
                    </div>
                </div>

                <section className="w-[50%]">
                    <FileInput
                        onChange={(e) => {
                            handleFileInputChange(e);
                        }}
                    />
                </section>
            </motion.div>
        );
    };

    // Share buttons after response done typing
    const renderShareButtons = () => {
        return (
            <div className="flex gap-4 mt-8 items-center">
                <p className="font-medium text-gray-600 text-sm">Share:</p>
                <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(response.replace(/<.*?>/g, ''))}`} target="_blank" className="hover:opacity-80">
                    <IoLogoTwitter className="w-6 h-6 text-[#1DA1F2]" />
                </Link>
                <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://your-landing-page.com')}`} target="_blank" className="hover:opacity-80">
                    <IoLogoLinkedin className="w-6 h-6 text-[#0077B5]" />
                </Link>
            </div>
        );
    };

    return (
        <>
            <head>
                <title>{t('SEO.title')}</title>
                <meta name="description" content={t('SEO.description')} />
                <meta name="robots" content={t('SEO.robots')} />
                <meta name='image' content={t('SEO.image')} />
                <meta property="og:url" content={t('SEO.openGraph.url')} />
                <meta property="og:type" content={t('SEO.openGraph.type')} />
                <meta property="og:title" content={t('SEO.openGraph.title')} />
                <meta property="og:description" content={t('SEO.openGraph.description')} />
                <meta name="twitter:card" content={t('SEO.twitter.card')} />
                <meta name="twitter:title" content={t('SEO.twitter.title')} />
                <meta name="twitter:description" content={t('SEO.description')} />
                <meta name="twitter:image" content={t('SEO.image')} />
            </head>

            <main className="bg-[#FAFAFA] bg-pattern bg-gradient-to-br from-gray-50 to-gray-100 px-24">
                <Link href="https://talent.clous.app" className="absolute left-24 top-8 text-primary text-lg font-medium">Made by Clous</Link>

                {!isTyping ? (
                    <main className="mb-12 flex justify-between items-start text-left w-full mx-auto">
                        <section className="flex flex-col h-screen">
                            <div className="h-[180vh] transform flex items-center justify-center relative ">
                                <div
                                    className="lg:py-24 w-full relative"
                                    style={{
                                        perspective: '1000px',
                                    }}
                                >
                                    <ScrollHeader translate={translate} />
                                </div>
                            </div>
                        </section>
                    </main>
                ) : (
                    <>
                        <div className="text-sm pt-20" dangerouslySetInnerHTML={{ __html: response }}></div>
                        {isCtaActive && (
                            <div className='mt-6 flex gap-8'>
                                <Button
                                    onClick={() => window.open(ctaLink)}
                                    className="text-white max-w-[12rem] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 delay-100"
                                >{t('hero.cta')}</Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => window.open(ctaLink)}
                                    className="text-gray-foreground max-w-[12rem] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 delay-100"
                                >{t('hero.cta')}</Button>
                            </div>
                        )}

                        {/* Share Buttons */}
                        {isCtaActive && renderShareButtons()}
                    </>
                )}

                {/* Add the Services, BandBlogs, Uvp components after everything */}
                <Services />
                <Uvp />
                <BandBlogs />
            </main>
            <Footer />
        </>
    );
};

export default LandingTemplate;
