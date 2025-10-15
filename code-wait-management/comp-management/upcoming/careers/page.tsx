import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import Logo from "@/components/navigation/FixedLogo";
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import BandBlogs from "@/components/sections/cta/BandBlogs";

export function generateStaticParams() {
    return ['en', 'de', 'es', 'fr', 'pt'].map((locale) => ({ locale }));
}

export default function CareersPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = useTranslations('Careers');

    // Job listings data
    const jobs = [
        {
            id: 1,
            title: t('job1.title'),
            location: t('job1.location'),
            type: t('job1.type'),
            description: t('job1.description')
        },
        {
            id: 2,
            title: t('job2.title'),
            location: t('job2.location'),
            type: t('job2.type'),
            description: t('job2.description')
        },
        {
            id: 3,
            title: t('job3.title'),
            location: t('job3.location'),
            type: t('job3.type'),
            description: t('job3.description')
        },
        {
            id: 4,
            title: t('job4.title'),
            location: t('job4.location'),
            type: t('job4.type'),
            description: t('job4.description')
        }
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

            <div className="text-dark-blue-greenish text-sm font-semibold w-[100vw] fixed z-30">
                <div className="xl:max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex items-center justify-end relative h-[4rem]">
                    <Navbar />
                </div>
            </div>


            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('hero.description')}
                    </p>
                </div>
            </section>



            {/* About Our Company Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {t('aboutOurCompany.title')}
                    </h2>

                    <div className="prose prose-lg max-w-none">
                        <p>
                            {t('aboutOurCompany.description')}
                        </p>

                        <h3 className="text-2xl font-semibold mt-8 mb-4">
                            {t('aboutOurCompany.values.title')}
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                                    <span className="text-blue-600 text-sm font-bold">1</span>
                                </div>
                                <div>
                                    <strong className="text-gray-900">
                                        {t('aboutOurCompany.values.item1.title')}
                                    </strong> - {t('aboutOurCompany.values.item1.description')}
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                                    <span className="text-blue-600 text-sm font-bold">2</span>
                                </div>
                                <div>
                                    <strong className="text-gray-900">
                                        {t('aboutOurCompany.values.item2.title')}
                                    </strong> - {t('aboutOurCompany.values.item2.description')}
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                                    <span className="text-blue-600 text-sm font-bold">3</span>
                                </div>
                                <div>
                                    <strong className="text-gray-900">
                                        {t('aboutOurCompany.values.item3.title')}
                                    </strong> - {t('aboutOurCompany.values.item3.description')}
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                                    <span className="text-blue-600 text-sm font-bold">4</span>
                                </div>
                                <div>
                                    <strong className="text-gray-900">
                                        {t('aboutOurCompany.values.item4.title')}
                                    </strong> - {t('aboutOurCompany.values.item4.description')}
                                </div>
                            </li>
                        </ul>

                        <h3 className="text-2xl font-semibold mt-8 mb-4">
                            {t('aboutOurCompany.benefits.title')}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h4 className="font-semibold text-lg mb-3">
                                    {t('aboutOurCompany.benefits.item1.title')}
                                </h4>
                                <p>
                                    {t('aboutOurCompany.benefits.item1.description')}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h4 className="font-semibold text-lg mb-3">
                                    {t('aboutOurCompany.benefits.item2.title')}
                                </h4>
                                <p>
                                    {t('aboutOurCompany.benefits.item2.description')}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h4 className="font-semibold text-lg mb-3">
                                    {t('aboutOurCompany.benefits.item3.title')}
                                </h4>
                                <p>
                                    {t('aboutOurCompany.benefits.item3.description')}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h4 className="font-semibold text-lg mb-3">
                                    {t('aboutOurCompany.benefits.item4.title')}
                                </h4>
                                <p>
                                    {t('aboutOurCompany.benefits.item4.description')}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-xl font-medium">
                                {t('aboutOurCompany.readyToJoin.title')}
                            </p>
                            <div className="mt-6">
                                <a
                                    href="#open-positions"
                                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {t('aboutOurCompany.readyToJoin.button')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Listings Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 rounded-3xl">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        {t('jobListings.title')}
                    </h2>

                    <div className="space-y-6">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                            {job.title}
                                        </h3>
                                        <div className="mt-2 flex items-center text-gray-600">
                                            <FiMapPin className="mr-2" />
                                            <span>{job.location}</span>
                                            <span className="mx-3">•</span>
                                            <span>{job.type}</span>
                                        </div>
                                        <p className="mt-3 text-gray-600 hidden md:block">
                                            {job.description}
                                        </p>
                                    </div>

                                </div>
                                <p className="mt-3 text-gray-600 md:hidden">
                                    {job.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <BandBlogs />

            <Footer />
        </>
    );
}
