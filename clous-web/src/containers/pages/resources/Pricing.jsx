import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import HeroPricing from "components/resources/pricing/HeroPricing";
import icon from "assets/img/favicon.png";
import FooterBand from "components/navigation/FooterBand";
import mixpanel from "mixpanel-browser";
import Services from "../../../components/resources/pricing/Services";
import PricingFaqs from "../../../components/resources/pricing/PricingFaqs";
import QuickCompare from "../../../components/resources/pricing/QuickCompare";

import FeaturedResources from "../../../components/reuse/FeaturedResources";
import Navbanner from "../../../components/navigation/Navbanner";
import Logo from "components/navigation/FixedLogo";
import FounderDemo from "components/resources/contact/FounderDemo";
import SectionPartners from "../../../components/about/partners/SectionPartners";
import BandBlogs from "components/home/BandBlogs";


export default function GetQuote() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("Pricing Webpage", {
      Cohort: 'High-Intent User',
  });
  }, []);
  return (
    <Layout>
      <Helmet>
      <title>Hiring AI Pricing Plans: Free and Enterprise - Clous Pricing</title>
       
       <meta
         name="description"
         content="AI for hiring teams means you are only charged when you use AI. Post a job opening for free and get advanced AI features with Team and Enterprise plans."
       />
               <meta name="robots" content="index, follow" />
               <meta name='image' content='https://clous.s3.eu-west-3.amazonaws.com/images/Hiring-Made-Easy.webp' />
       <meta property="og:url" content="https://www.clous.app/pricing/" />
       <meta property="og:type" content="website" />
       <meta
         property="og:title"
         content="Hiring AI Pricing Plans: Free and Enterprise - Clous Pricing"
       />
       <meta
         property="og:description"
         content="AI for hiring teams means you are only charged when you use AI. Post a job opening for free and get advanced AI features with Team and Enterprise plans."
       />
       <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hiring AI Pricing Plans: Free and Enterprise - Clous Pricing"
        />
        <meta
          name="twitter:description"
          content="AI for hiring teams means you are only charged when you use AI. Post a job opening for free and get advanced AI features with Team and Enterprise plans."
        />
        <meta
          name="twitter:image"
          content="https://clous.s3.eu-west-3.amazonaws.com/images/Hiring-Made-Easy.webp"
        />
       
      </Helmet>
      {!modalIsOpen && 
      <div className=" text-dark-blue-greenish text-sm font-semibold w-full fixed z-30  ">
      <div className=" max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap">
      <Navbar />
      </div> 
      </div>
}
<div className="z-40 relative">
<Logo />

</div>
      <header className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold pt-24 max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap">
        <HeroPricing  modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            </header>
            <main className="bg-[#FAFAFA] text-dark-blue-greenish text-lg font-semibold mx-auto max-w-8xl">
            <QuickCompare/>
              <Services/>
              <FeaturedResources/>

               <SectionPartners />
              <PricingFaqs/>
              <BandBlogs />
        </main>
      <Footer />
    </Layout>
  );
}

