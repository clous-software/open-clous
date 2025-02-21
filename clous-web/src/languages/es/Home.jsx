import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import Header from "./home/HeroHome";
import Uvp from "./home/SectionOne";
import { useEffect, useState } from "react";
import BandBlogs from "./home/BandBlogs";
import { Helmet } from "react-helmet-async";
import mixpanel from "mixpanel-browser";
import TabsSection from "./home/TabbedSection";
import Logo from "../../components/navigation/FixedLogo";
import { Link } from "react-router-dom";
import SectionPanel from "./home/SectionPanel";
import WarningPanel from "../../components/home/WarningPanel";
import SecurityPanel from "./home/SecurityPanel";

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
        <title>IA de Selección de Talento para Equipos - Clous</title>
       
        <meta
          name="description"
          content="Clous ha desarrollado un asistente IA de selección de talento llamado Clous Peer. Esta hecho para atraer y retener a los candidatos desde que se inscriben a la oferta hasta que los entrevistas."
        />
                <meta name="robots" content="index, follow" />
    <meta name='image' content='https://clous.s3.eu-west-3.amazonaws.com/images/Intelligent+Application+Clous.webp' />
        <meta property="og:url" content="https://www.clous.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="IA de Selección de Talento para Equipos - Clous"
        />
        <meta
          property="og:description"
          content="Clous ha desarrollado un asistente IA de selección de talento llamado Clous Peer. Esta hecho para atraer y retener a los candidatos desde que se inscriben a la oferta hasta que los entrevistas."
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

      
      <header className="text-dark-blue-greenish text-sm font-semibold flex flex-col h-screen mb-64">
      <Header modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            </header>
     <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold overflow-hidden">
    {/*<WhoIsFor/>*/}
     <SectionPanel />
     {/* <WarningPanel /> */}


        <TabsSection/>
        <Uvp />
        <SecurityPanel />

        <BandBlogs />
      </main>

<Footer />
    </Layout>
  );
}

export default Home;
