import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import FooterBand from "components/navigation/FooterBand";
import icon from "assets/img/favicon.png";
import HeroClous from "../../../components/product/cloush/HeroClous";
import mixpanel from "mixpanel-browser";
import DemoLaunch from "../../../components/resources/contact/DemoLaunch";
import BandBlogs from "components/home/BandBlogs";
import Twenty from "components/product/cloush/SectionTwenty";
import Thirty from "components/product/cloush/SectionThirty";
import Fourty from "components/product/cloush/SectionFourty";
import Logo from "components/navigation/FixedLogo";
import SectionBeta from "../../../components/product/cloush/SectionBeta";
import { Link } from "react-router-dom";


function ClousH() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("ClousH Webpage", {

    });
  }, []);
  return (
    <Layout>
      <Helmet>
      <title>Hiring Experiences with AI for Hiring Teams Globally</title>
       
       <meta
         name="description"
         content="ClousH is our flagship product, replacing the traditional job boards, ATS and meeting scheduling tools. Designed for hiring teams with AI to make hiring easier."
       />
               <meta name="robots" content="index, follow" />
               <meta name='image' content='https://clous.s3.eu-west-3.amazonaws.com/images/Hiring-Made-Easy.webp' />
       <meta property="og:url" content="https://www.clous.app/cloush/" />
       <meta property="og:type" content="website" />
       <meta
         property="og:title"
         content="Hiring Experiences with AI for Hiring Teams Globally"
       />
       <meta
         property="og:description"
         content="ClousH is our flagship product, replacing the traditional job boards, ATS and meeting scheduling tools. Designed for hiring teams with AI to make hiring easier."
       />
       <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hiring Experiences with AI for Hiring Teams Globally"
        />
        <meta
          name="twitter:description"
          content="ClousH is our flagship product, replacing the traditional job boards, ATS and meeting scheduling tools. Designed for hiring teams with AI to make hiring easier."
        />
        <meta
          name="twitter:image"
          content="https://clous.s3.eu-west-3.amazonaws.com/images/Hiring-Made-Easy.webp"
        />

      </Helmet>

      {!modalIsOpen && 
      <div className="text-dark-blue-greenish text-sm font-semibold w-[100vw] fixed z-30">
        
      <div className="xl:max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex items-center justify-between relative h-[4rem]">
      <div className="-mt-36 -ml-6 transition rotate-12 transition-hover delay-150 duration-500 ease-in-out hover:translate-y-40 hover:rotate-0">
      <Link to="https://beta.clous.app/waitlist" target="_blank" className="hidden lg:inline-flex w-[190px] p-4 bg-primary justify-center flex rounded-3xl flex-col">
        <img src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousContact_QR.webp" nofollow className="rounded-3xl"/>
        <p className="text-2xl font-semibold text-secondary mt-2 text-center">
          Get in touch
        </p>

        </Link>
                      </div>
     <Navbar />

     </div> 
     </div>
}
<div className="z-40 relative">
<Logo />

</div>
 
      <header className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold pt-24 mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
      <HeroClous modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
       </header>
      <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold">
        <Twenty />
      <Thirty/>

        {/*     AI-Led, Compare & Connect /> */}
        <Fourty />

        <SectionBeta />

        <BandBlogs />
      </main>

      <Footer />
    </Layout>
  );
}
export default ClousH;
