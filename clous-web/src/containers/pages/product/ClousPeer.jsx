import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import FooterBand from "components/navigation/FooterBand";
import icon from "assets/img/favicon.png";
import HeroClous from "../../../components/product/clouspeer/HeroClous";
import mixpanel from "mixpanel-browser";
import DemoLaunch from "../../../components/resources/contact/DemoLaunch";
import BandBlogs from "components/home/BandBlogs";
import Twenty from "components/product/clouspeer/SectionTwenty";
import Thirty from "components/product/clouspeer/SectionThirty";
import Fourty from "components/product/clouspeer/SectionFourty";
import Logo from "components/navigation/FixedLogo";
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
      <title>AI Assistant for Hiring Teams and Recruiters - Clous Peer</title>
       
       <meta
         name="description"
         content="Clous Peer is an intelligent assistant for hiring teams. It saves hours to hiring teams by automating platform actions and delivering insights to improve your hiring process."
       />
               <meta name="robots" content="index, follow" />
               <meta name='image' content='https://clous.s3.eu-west-3.amazonaws.com/images/Hiring-Made-Easy.webp' />
       <meta property="og:url" content="https://www.clous.app/clouspeer/" />
       <meta property="og:type" content="website" />
       <meta
         property="og:title"
         content="AI Assistant for Hiring Teams and Recruiters - Clous Peer"
       />
       <meta
         property="og:description"
         content="Clous Peer is an intelligent assistant for recruiters. It increases productivity of hiring teams by automating platform actions and delivering insights to improve your hiring process."
       />
       <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="AI Assistant for Hiring Teams and Recruiters - Clous Peer"
        />
        <meta
          name="twitter:description"
          content="Clous Peer is an intelligent assistant for recruiters. It increases productivity of hiring teams by automating platform actions and delivering insights to improve your hiring process."
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
      <Link to="/contact" target="_blank" className="hidden lg:inline-flex w-[190px] p-4 bg-primary justify-center flex rounded-3xl flex-col">
        <img src="https://clous.s3.eu-west-3.amazonaws.com/images/Clous_QR.webp" alt="ClousH Alpha Launch" className="rounded-3xl"/>
        <h3 className="text-2xl font-semibold text-secondary mt-2 text-center">
          Meet Clous
        </h3>

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


        <BandBlogs />
      </main>

      <Footer />
    </Layout>
  );
}
export default ClousH;
