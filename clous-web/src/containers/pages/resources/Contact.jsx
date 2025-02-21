import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import ContactPage from "components/resources/contact/ContactPage";
import icon from "assets/img/favicon.png";
import mixpanel from "mixpanel-browser";
import TrustedPartners from "components/home/TrustedPartners";
import CtaBand from "../../../components/home/CtaBand";
import FooterBand from "components/navigation/FooterBand";
import Navbanner from "../../../components/navigation/Navbanner";
import SectionShowcases from "components/solutions/enterprises/SectionShowcases";
import Logo from "components/navigation/FixedLogo";
import FounderDemo from "components/resources/contact/FounderDemo";
import Roi from "../../../components/others/RoiCalculator";


export default function Contact() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("Contact Page");
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>Talk to Clous Sales Team - Contact Clous</title>
        <meta
          name="description"
          content="We are entrepreneurs building hiring intelligence solutions. Our first product is a hiring AI that saves hours weekly to hiring teams."
        />
      
      <meta name="robots" content="noindex, nofollow" />
      <link rel="icon" content={icon} />
        <meta name="author" content="Clous Technology SL" />
        <meta name="publisher" content="Clous" />
        <meta itemprop='image' content='https://clous.s3.eu-west-3.amazonaws.com/images/Clous+Sharing+Cover.png' />
    <meta property="og:image" content="https://clous.s3.eu-west-3.amazonaws.com/images/Clous+Sharing+Cover.png" />
    <meta name='image' content='https://clous.s3.eu-west-3.amazonaws.com/images/Clous+Sharing+Cover.png' />
        <meta property="og:url" content="https://www.clous.app/contact/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Talk to Clous Sales Team - Contact Clous"
        />
        <meta
          property="og:description"
          content="We are entrepreneurs building hiring intelligence solutions. Our first product is a hiring AI that saves hours weekly to hiring teams."
        />

   
      </Helmet>

      {!modalIsOpen && 
      <div className="text-dark-blue-greenish text-sm font-semibold w-full fixed z-30  ">
      <div className=" max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap">
      <Navbar />
      </div> 
      </div>
      }
<div className="z-40 relative">
  <Logo />
</div>
      <header className="bg-[#FAFAFA] text-dark-blue-greenish text-lg pt-24 mx-auto max-w-8xl">

        <ContactPage modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </header>
      <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl mb-32">        
      <Roi />

      </main>

      <Footer />
    </Layout>
  );
}

