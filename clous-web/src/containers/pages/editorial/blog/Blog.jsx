import Footer from "components/navigation/Footer";
import FooterBand from "components/navigation/FooterBand";
import HeroBlog from "components/editorial/blog/HeroBlog";
import BlogList from "components/editorial/blog/BlogList";
import Layout from "hocs/layouts/Layout";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import icon from "assets/img/favicon.png";
import mixpanel from "mixpanel-browser";
import Navbar from "../../../../components/navigation/Navbar";
import Logo from "components/navigation/FixedLogo";

function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("Blog Page", {});
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>Blog Articles about Hiring Technology - Clous Blogs</title>
        <meta
          name="description"
          content="Learn about hiring technology trends in insightful blogs on Clous. Stay informed with expert opinions and discover new methodologies to hire more efficiently."
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" content={icon} />
        <meta name="author" content="Clous Technology SL" />
        <meta name="publisher" content="Clous" />
        <meta property="og:image" content='https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp' />
        <meta property="og:url" content="https://www.clous.app/blog/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Blog Articles about Hiring Technology - Clous Blogs"
        />
        <meta
          property="og:description"
          content="Learn about hiring technology trends in insightful blogs on Clous. Stay informed with expert opinions and discover new methodologies to hire more efficiently."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="How to Use AI in Your HR Team | Blogs | Clous"
        />
        <meta
          name="twitter:description"
          content="Our blog articles are carefully curated by our editors and our 
          popular content writers. We also invite guest writers from other companies, startups and partners."
        />
        <meta name="twitter:image" content='https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp' />
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
      <main className=" bg-[#fafafa] mx-auto  px-4 sm:px-6 lg:px-16 2xl:px-24">

            <BlogList />

      {/*<FooterBand/>*/} 
      </main>
      <Footer />
    </Layout>
  );
}

export default Blog;
