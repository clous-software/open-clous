import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import HeroTeams from "components/solutions/hrTeams/HeroTeams";
import FooterBand from "components/navigation/FooterBand";
import PopUp from "components/solutions/hrTeams/Popup";
import SocialMedia from "components/conect/SocialMedia";
import icon from "assets/img/favicon.png";
import SectionIII from "components/solutions/hrTeams/SectionIII";
import mixpanel from "mixpanel-browser";
import Navbanner from "../../../components/navigation/Navbanner";
import TabsSectionI from "../../../components/product/cloush/TabsSectionI";
import FounderDemo from "../../../components/resources/contact/FounderDemo";
import Uvp from "components/home/SectionOne";
import TrustedPartners from "components/home/TrustedPartners";

export default function HrTeams() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("HrTeams Page", {});    
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Esperar 100ms antes de desplazarse
    }
  }, []);

    mixpanel.track("HrTeams Page", {});


  return (
    <Layout>
      <Helmet>
        <title>Next-gen ATS with AI for Hiring Teams - Clous for Teams</title>
        <meta
          name="description"
          content="Clous offers AI-driven ATS solutions for HR and hiring teams. Elevate hiring efficiency, improve quality, and achieve your best results with ClousH."
        />

        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" content={icon} />
        <meta name="author" content="Clous Technology SL" />
        <meta name="publisher" content="Clous" />
        <meta property="og:image" content='https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp' />

        <meta property="og:url" content="https://www.clous.app/hrteams/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Next-gen ATS with AI for Hiring Teams - Clous for Teams"
        />
        <meta
          property="og:description"
          content="Clous offers AI-driven ATS solutions for HR and hiring teams. Elevate hiring efficiency, improve quality, and achieve your best results with ClousH."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hiring technology for efficient hiring teams - Clous"
        />

      <meta
          name="twitter:description"
          content="We develop hiring products to help hiring and HR teams  improve the efficiency and quality of their hiring processes. Hire better with our first product ClousH."
        />
      </Helmet>

      {!modalIsOpen && 
      <div className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold w-full fixed z-30  ">
      <Navbanner/>
      <div className=" max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap">
      <Navbar />
      </div> 
      </div>
      }
      
      <header className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto pt-24 max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
        <HeroTeams modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </header>

      <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
      <TrustedPartners />
      <Uvp />
      <TabsSectionI />

      <FounderDemo />
        <SectionIII />
        <SocialMedia />

        <div id="hrsupportform">
        <PopUp />
</div>
        <FooterBand />
      </main>
      <Footer />
    </Layout>
  );
}
