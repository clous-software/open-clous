import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import Logo from "@/components/navigation/FixedLogo";
import Link from "next/link";
import { unstable_setRequestLocale } from 'next-intl/server';

import HeroClous from "@/components/sections/hero/HeroClous";
import BandBlogs from "@/components/sections/BandBlogs";
import Fifty from "@/components/sections/SectionFifty";
import Sixty from "@/components/sections/SectionSixty";
import Seventy from "@/components/sections/SectionSeventy";
import { useTranslations } from "next-intl";

export function generateStaticParams() {
  return ['en', 'de', 'es', 'fr', 'pt'].map((locale) => ({ locale }));
}

const ClousH = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Clous');

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

        <div className="xl:max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex items-center justify-between relative h-[4rem]">
          <div className="-mt-36 -ml-6 transition rotate-12 transition-hover delay-150 duration-500 ease-in-out hover:translate-y-40 hover:rotate-0">
            <Link href="/contact" target="_blank" className="hidden lg:inline-flex w-[190px] p-4 bg-primary justify-center flex rounded-3xl flex-col">
              <img src="https://clous.s3.eu-west-3.amazonaws.com/images/Clous_QR.webp" alt="ClousH Alpha Launch" className="rounded-3xl" />
              <h3 className="text-2xl font-semibold text-secondary mt-2 text-center">
                Meet Clous
              </h3>

            </Link>
          </div>
          <Navbar />

        </div>
      </div>
      <div className="z-40 relative">
        <Logo />

      </div>

      <header className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold pt-24 mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
        <HeroClous />
      </header>
      <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold">
        <Fifty />
        <Sixty />

        <Seventy />


        <BandBlogs />
      </main>

      <Footer />
    </>
  );
}
export default ClousH;
