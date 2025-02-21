import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import HeroTeam from "components/about/team/HeroTeam";
import BandBlogs from "components/home/BandBlogs";

import RoadmapSection from "components/about/team/RaodmapSectionI";
import icon from "assets/img/favicon.png";
import mixpanel from "mixpanel-browser";
import SectionTeam from "../../../../components/about/team/SectionTeam";
import FooterBand from "components/navigation/FooterBand";
import FounderDemo from "../../../../components/resources/contact/FounderDemo";
import SectionManifiestos from "components/about/mision/SectionManifiestos";
import Logo from "components/navigation/FixedLogo";
import HeroPress from "components/about/press/HeroPress.js";

function Team() {
  useEffect(() => {
    window.scrollTo(0, 0);

    mixpanel.track("Team Webpage", {
    });
  }, []);
  return (
    <Layout>
      <Helmet>
      <title>Clous Team Builds AI Tool for Hiring Teams - About Clous</title>
       
       <meta
         name="description"
         content="Hiring technology with AI built by young operators. With ClousH, hiring teams automate their hiring processes and personalize candidate experience with AI." />
               <meta name="robots" content="index, follow" />
               <meta name='image' content='https://clous.s3.eu-west-3.amazonaws.com/images/Hiring-Made-Easy.webp' />
       <meta property="og:url" content="https://www.clous.app/company/" />
       <meta property="og:type" content="website" />
       <meta
         property="og:title"
         content="Clous Team Builds AI Tool for Hiring Teams - About Clous"
       />
       <meta
         property="og:description"
         content="Hiring technology with AI built by young operators. With ClousH, hiring teams automate their hiring processes and personalize candidate experience with AI."
       />
         <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Clous Team Builds AI Tool for Hiring Teams - About Clous"
        />
        <meta
          name="twitter:description"
          content="Hiring technology with AI built by young operators. With ClousH, hiring teams automate their hiring processes and personalize candidate experience with AI."
        />
        <meta
          name="twitter:image"
          content="https://clous.s3.eu-west-3.amazonaws.com/images/Hiring-Made-Easy.webp"
        />

      
      </Helmet>
      <div className="text-dark-blue-greenish text-sm font-semibold max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap w-full fixed z-30  ">

<Navbar />             
</div>
<div className="z-40 relative">
<Logo />

</div>
      <header className="text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl pt-24 px-4 sm:px-6 xl:px-16 2xl:px-24">
      <HeroTeam/>


      </header>
      <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl">

       <SectionTeam/>
 
       <SectionManifiestos />
       <RoadmapSection/>
       <HeroPress />

       <BandBlogs />
      </main>
      <Footer />
    </Layout>
  );
}
export default Team;
