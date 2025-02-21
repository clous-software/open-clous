import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import FooterBand from "components/navigation/FooterBand";
import icon from "assets/img/favicon.png";

import mixpanel from "mixpanel-browser";
import HeroProductLaunch from "components/product/HeroProductLaunch";
import Uvp from "components/home/SectionOne";
import SectionShowcases from "components/solutions/enterprises/SectionShowcases";
import NeedHelp from "components/solutions/startups/NeedHelp";
import Logo from "components/navigation/FixedLogo";
import DemoLaunch from "../../components/resources/contact/DemoLaunch";

function ProductLaunch() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("ProductLaunch Page", {

    });
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>
        ClousH Launch by Clous
        </title>
       
        <meta
          name="description"
          content="On 21st February we launched the Alpha version of ClousH. Our product is a Talent CRM with AI for hiring teams and recruiters."
        />

        <meta name="robots" content="index, follow" />
        <link rel="icon" content={icon} />
        <meta name="author" content="Clous Technology SL" />
        <meta name="publisher" content="Clous" />

        <meta property="og:url" content="https://www.clous.app/ProductLaunch/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="ClousH Launch by Clous"
        />
        <meta
          property="og:description"
          content="On 21st February we launched the Alpha version of ClousH. Our product is a Talent CRM with AI for hiring teams and recruiters."
        />
      </Helmet>

      {!modalIsOpen && 
      <div className="text-dark-blue-greenish text-sm font-semibold w-[100vw] fixed z-30">
        
      <div className="xl:max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex items-center justify-between relative">
      <div className="-mt-36 -ml-6 transition rotate-12 transition-hover delay-150 duration-500 ease-in-out hover:translate-y-40 hover:rotate-0">
                     <a href="https://buy.stripe.com/3cs9Cl8JcfQT79m4go" target="_blank" rel="noreferrer" className="hidden lg:inline-flex"><img src="https://clous.s3.eu-west-3.amazonaws.com/images/Pre-order+QR.png" alt="Pre-order ClousH Alpha" width="170"/></a>
                     </div>
     <Navbar />

     </div> 
     </div>
}
<div className="z-40 relative">
        <Logo />
      </div>

<header className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold pt-24 mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
<HeroProductLaunch modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
       </header>
      <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl">
        <Uvp/>
        <DemoLaunch />
        <FooterBand />
      </main>

      <Footer />
    </Layout>
  );
}
export default ProductLaunch;
