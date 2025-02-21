import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import HeroStars from "components/solutions/startups/HeroStar";
import SectionIV from "components/solutions/startups/SectionIV";
import SectionV from "components/solutions/startups/SectionV";
import FooterBand from "components/navigation/FooterBand";
import icon from "assets/img/favicon.png";
import mixpanel from "mixpanel-browser";
import NeedHelp from "../../../components/solutions/startups/NeedHelp";
import Navbanner from "../../../components/navigation/Navbanner";

function Startups() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    mixpanel.track("Startups Page", {});

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
  mixpanel.track("Startups Page", {});
  return (
    <Layout>
      <Helmet>
        <title>AI-driven Hiring Technology for Startup Founders - Clous Startups</title>
        <meta
          name="description"
          content="Clous transforms startups' hiring quality with their AI-driven ATS. Improve hiring processes and recruit faster with our product ClousH, designed for startup founders."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" content={icon} />
        <meta name="author" content="Clous Technology SL" />
        <meta name="publisher" content="Clous" />
        <meta property="og:image" content='https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp' />
        <meta property="og:url" content="https://www.clous.app/startup/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="AI-driven Hiring Technology for Startup Founders - Clous Startups"
        />
        <meta
          property="og:description"
          content="Clous transforms startups' hiring quality with their AI-driven ATS. Improve hiring processes and recruit faster with our product ClousH, designed for startup founders."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hiring technology for efficient startup teams - Clous"
        />
         <meta
          name="twitter:description"
          content="We develop hiring software technology to help startups improve the quality of their hiring processes. Hire faster with our first product ClousH."
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
      <header className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl pt-24 px-4 sm:px-6 xl:px-16 2xl:px-24">
        <HeroStars modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
      </header>
      <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
        <SectionIV />
        <div id="startupform">
          <SectionV />
        </div>

        <NeedHelp />
        <FooterBand />
      </main>

      <Footer />
    </Layout>
  );
}

export default Startups;
