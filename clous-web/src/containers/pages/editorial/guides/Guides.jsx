import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import icon from "assets/img/favicon.png";
import mixpanel from "mixpanel-browser";
import FooterBand from "../../../../components/navigation/FooterBand";
import HeroGuides from "../../../../components/editorial/guides/HeroGuides";
import GuidesList from "../../../../components/editorial/guides/GuidesList";
import Navbar from "../../../../components/navigation/Navbar";
import Logo from "components/navigation/FixedLogo";

export default function Guides() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("Guides Webpage", {

    });
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>Empower Your Hiring Journey with Clous' Guides</title>
        <meta
          name="description"
          content="Unlock expert insights with Clous' Guides. Empower your hiring journey through essential how-tos and industry-specific insights for lasting success in hiring processes."
        />
      
      <meta name="robots" content="index, nofollow" />
      <link rel="icon" content={icon} />
        <meta name="author" content="Clous Technology SL" />
        <meta name="publisher" content="Clous" />
        <meta property="og:image" content='https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp' />
       
        <meta property="og:url" content="https://www.clous.app/contact/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Empower Your Hiring Journey with Clous' Guides"
        />
        <meta
          property="og:description"
          content="Unlock expert insights with Clous' Guides. Empower your hiring journey through essential how-tos and industry-specific insights for lasting success in hiring processes."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="The Team Behind People Analytics with AI | Clous"
        />

        <meta
          name="twitter:description"
          content="For immediate assistance, don't hesitate to reach out to us. Contact us now to receive prompt support, obtain additional information, or address any inquiries. Take action today!"
        />
        <meta property="twitter:image" content='https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp' />
      </Helmet>

      {!modalIsOpen && 
      <div className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold w-full fixed z-30  ">
      <div className=" max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap">
      <Navbar />
      </div> 
      </div>
}
<div className="z-40 relative">
        <Logo />
      </div>

      <header className="bg-[#FAFAFA] text-dark-blue-greenish text-lg pt-24 mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">


      </header>
      <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">

            <GuidesList />
     {/*<FooterBand/>*/} 
     </main>
      <Footer />
    </Layout>
  );
}

