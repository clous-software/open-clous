import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import mixpanel from "mixpanel-browser";

import FooterBand from "../../../../components/navigation/FooterBand";
import HeroNews from "../../../../components/editorial/news/HeroNews";
import WikiList from "../../../../components/editorial/news/WikiList";
import Navbar from "../../../../components/navigation/Navbar";
import Logo from "components/navigation/FixedLogo";

function NewsRoom() {
  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("Wiki Webpage", {});
  }, []);

  return (
    <Layout>
      <Helmet>
      <title>Where Clous Delivers Knowledge - Clous Wiki</title>
        <meta
          name="description"
          content="Explore Clous' Wikis for the latest in hiring software technology. Get breaking news, industry updates, and expert insights for timely workforce analysis."
        />
        <meta name="robots" content="index, follow"/>
        <meta property="og:url" content="https://www.clous.app/clous-wiki/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Where Clous Delivers Knowledge - Clous Wiki"
        />
        <meta
          property="og:description"
          content="Explore Clous' Wikis for the latest in hiring software technology. Get breaking news, industry updates, and expert insights for timely workforce analysis."
        />
          <meta property="og:site_name" content="Clous Wiki" />

        <meta itemprop='title' content='Hiring AI for Hiring Teams and Professionals' />
    <meta itemprop='description' content='Clous created a hiring AI assistant called Clous Peer. You will find it inside ClousH, built to help hiring teams improve the efficiency of their hiring processes.    ' />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="How to Use AI in Your HR Team | News-Room | Clous"
        />
        <meta
          name="twitter:description"
          content="Our news articles are carefully curated by our editors and our 
          popular content writers. We also invite guest writers from other companies, startups and partners."
        />
      </Helmet>
      
      <div className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold w-full fixed z-30  ">
      <div className=" max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap">
      <Navbar />
      </div> 
      </div>
      <div className="z-40 relative">
        <Logo />
      </div>

      <header className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold pt-24 max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap">
      </header>
      <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
        
            <WikiList />
  
      {/*<FooterBand/>*/} 
      </main>
      <Footer />
    </Layout>
  );
}

export default NewsRoom;
