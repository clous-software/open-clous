import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Hero from "components/solutions/enterprises/HeroEnter";
import SectionManifestos from "components/solutions/enterprises/SectionManifestos";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import icon from "assets/img/favicon.png";
import TrustedPartners from "components/home/TrustedPartners";
import SectionShowcases from "components/solutions/enterprises/SectionShowcases";
import Uvp from "components/home/SectionOne";
import Uds from "components/home/Uds";
import mixpanel from "mixpanel-browser";
import Programs from "../../../components/others/Programs";
import favicon from "assets/img/favicon.ico";
import Navbanner from "../../../components/navigation/Navbanner";

function Business() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {

    window.scrollTo(0, 0);
      mixpanel.track("Enterprise Page",{
      });
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Enterprise ATS with AI for Efficient Hiring - Clous Enterprise</title>
        <meta
          name="description"
          content="Clous delivers an enterprise-grade ATS with AI, optimizing hiring efficiency. Scale your recruitment processes with ClousH, our powerful hiring technology."
        />
        <link rel="icon" href={favicon} type="image/x-icon" />

        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" content={icon} />
        <meta name="author" content="Clous Technology SL" />
        <meta name="publisher" content="Clous" />
        <meta property="og:image" content='https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp' />

        <meta property="og:url" content="https://www.clous.app/enterprise/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Enterprise ATS with AI for Efficient Hiring - Clous Enterprise"
        />
        <meta
          property="og:description"
          content="Clous delivers an enterprise-grade ATS with AI, optimizing hiring efficiency. Scale your recruitment processes with ClousH, our powerful hiring technology."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hiring technology for efficient Enterprise teams - Clous"
        />

          <meta
          name="twitter:description"
          content="We build hiring technology to help Enterprises improve the efficiency of their hiring processes. Hire at scale with our first product ClousH."
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
      <header className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold pt-24 mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
      <Hero modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />      
      </header>
      <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
        <TrustedPartners />
        <Uvp />

        <Uds />
        <SectionShowcases />
        <SectionManifestos />
        <Programs/>

      </main>
      <Footer />
    </Layout>
  );
}
export default Business;
