import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import icon from "assets/img/favicon.png";
import mixpanel from "mixpanel-browser";
import FooterBand from "components/navigation/FooterBand";
import EditorialList from "../../../components/editorial/EditorialList";
import Logo from "components/navigation/FixedLogo";


const Editorial = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("Editorial Webpage", {

    });
  }, []);
  return ( 
    <Layout>
    <Helmet>
    <title>How to Hire with AI for Hiring Teams - Clous Editorial</title>
       
       <meta
         name="description"
         content="In Clous' Editorial you can find insights about recruitment technology. The Clous Team regularly updates their blogs, guide resources and wikis." />
               <meta name="robots" content="index, follow" />
   <meta name='image' content='https://clous.s3.eu-west-3.amazonaws.com/images/Intelligent+Application+Clous.webp' />
       <meta property="og:url" content="https://www.clous.app/editorial/" />
       <meta property="og:type" content="website" />
       <meta
         property="og:title"
         content="How to Hire with AI for Hiring Teams - Clous Editorial"
       />
       <meta
         property="og:description"
         content="In Clous' Editorial you can find insights about recruitment technology. The Clous Team regularly updates their blogs, guide resources and wikis."
       />

  
    </Helmet>
   
      <div className=" text-dark-blue-greenish text-sm font-semibold w-full fixed z-30  ">
      <div className=" max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap">
      <Navbar />
      </div> 
      </div>
      <div className="z-40 relative">
      <Logo />

      </div>
 
    <header className="bg-[#FAFAFA] text-dark-blue-greenish text-lg pt-24 mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
    </header>
    <main className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24">
{/*       <EditorialCategories/>*/}

<EditorialList/>
     {/*<FooterBand/>*/} 

      </main>
    <Footer />
  </Layout>
   );
}
 
export default Editorial;