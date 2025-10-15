import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import HeroClous from "@/components/sections/hero/HeroClous";
import BandBlogs from "@/components/sections/cta/BandBlogs";
import ActionSection from "@/components/sections/SectionTwenty";
import ThirdSection from "@/components/sections/SectionThirty";
import TwoCardsSection from "@/components/sections/SectionFourty";
import Logo from "@/components/navigation/FixedLogo";
import SectionBeta from "@/components/sections/cta/SectionBeta";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return ['en', 'de', 'es', 'fr', 'pt'].map((locale) => ({ locale }));
}

export default async function UseCases({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Clous');

  return (
    <main className="bg-[#FAFAFA] bg-pattern bg-gradient-to-br from-gray-50 to-gray-100 text-dark-blue-greenish text-sm font-semibold overflow-hidden">
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

      <header className="bg-[#FAFAFA] bg-pattern bg-gradient-to-br from-gray-50 to-gray-100 text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 overflow-hidden">
      </header>
      <main className="bg-[#FAFAFA] bg-pattern bg-gradient-to-br from-gray-50 to-gray-100 text-dark-blue-greenish text-sm font-semibold overflow-hidden">


        <BandBlogs />
      </main>

      <Footer />
    </main>
  );
}