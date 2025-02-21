import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import Header from "components/home/HeroHome";
import Uvp from "components/home/SectionOne";
import { useEffect, useState } from "react";
import BandBlogs from "components/home/BandBlogs";
import { Helmet } from "react-helmet-async";
import mixpanel from "mixpanel-browser";
import TabsSection from "../../components/home/TabbedSection";
import Logo from "../../components/navigation/FixedLogo";
import { Link } from "react-router-dom";
import SectionPanel from "../../components/home/SectionPanel";
import SectionResources from "../../components/reuse/SectionResources";
import WarningPanel from "../../components/home/WarningPanel";
import SecurityPanel from "../../components/home/SecurityPanel";

function Home() {
 

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("Home Webpage", {
      Type: 'Home Entry',
  });
  }, []);
  

  return (
    <Layout>
      <Helmet>
        <title>Hiring AI for Hiring Teams to Improve Hiring Processes</title>
       
        <meta
          name="description"
          content="Improve your hiring process with AI designed for hiring teams. Provide a great candidate experience to retain talent with engaging hiring experiences."
        />
                <meta name="robots" content="index, follow" />
                <meta name='image' content='https://clous.s3.eu-west-3.amazonaws.com/images/Hiring-Made-Easy.webp' />
        <meta property="og:url" content="https://www.clous.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Hiring AI for Hiring Teams to Improve Hiring Processes"
        />
        <meta
          property="og:description"
          content="Improve your hiring process with AI designed for hiring teams. Provide a great candidate experience to retain talent with engaging hiring experiences."
        />
         <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hiring AI for Hiring Teams with Engaging Candidate Experiences"
        />
        <meta
          name="twitter:description"
          content="Improve your hiring process with AI designed for hiring teams. Provide a great candidate experience to retain talent with engaging hiring experiences."
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
       <Link to="https://beta.clous.app/getintouch" target="_blank" className="hidden lg:inline-flex w-[190px] p-4 bg-primary justify-center flex rounded-3xl flex-col">
        <img src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousContact_QR.webp" alt="Clous Team Contact QR" className="rounded-3xl"/>
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

      
      <header className="text-dark-blue-greenish text-sm font-semibold flex flex-col h-screen mb-64">
      <Header modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            </header>
     <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold overflow-hidden">
    {/*<WhoIsFor/>*/}
     <SectionPanel />
     {/* <WarningPanel /> */}

        <TabsSection/>
        <Uvp />
        <SectionResources />
        <SecurityPanel />
        <BandBlogs />
      </main>

<Footer />
    </Layout>
  );
}

export default Home;
