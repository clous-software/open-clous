import { Card, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import NormalButton from "../../../../components/ui/NormalButton";
import axios from "axios";
import Footer from "components/navigation/Footer";
import { useEffect, useState } from "react";
import Layout from "hocs/layouts/Layout";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import icon from "assets/img/favicon.png";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import DOMPurify from "dompurify";
import Navbar from "components/navigation/Navbar";
import Logo from "components/navigation/FixedLogo";
import moment from "moment";
import mixpanel from "mixpanel-browser";

const LeadGenerations = () => {
  
  const { slug } = useParams();
  const [guidesDetail, setGuidesDetail] = useState({});
  const [formStatus, setFormStatus] = useState("idle"); // "idle", "success", "error"
  const [hasVoted, setHasVoted] = useState(false); // New state for tracking if the user has voted
  
  const handleVote = async (choice) => {
    if (!hasVoted) {
      try {
        // Make the POST request to vote
        await axios.post(`${process.env.REACT_APP_API_URL_2}/api/guides/details/${slug}`, { vote: choice }, { withCredentials: true });
        
        // Update the state to reflect that the user has voted
        setHasVoted(true);
      } catch (error) {
        console.error('Error submitting vote:', error);
      }
    }
  };

  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    companyName: "", // Añade el campo subject en el estado del formulario
    companyWebsite: "",
    companySize: "",
    interest: "",
  });
  const {
    first,
    last,
    email,
    companyName,
    companyWebsite,
    companySize,
    interest,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_2}/api/guide/details/${slug}`,
          { withCredentials: true }
        );
        setGuidesDetail(response.data);
      } catch (error) {
        console.error("Error fetching guides detail:", error);
      }
    };

    fetchData();
  }, [slug]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_2}/api/resource`,
        formData
      );

      // Update the form status to "success"
      setFormStatus("success");


      // You can perform other actions based on the response if needed
    } catch (error) {
      // Handle errors here

      // Update the form status to "error"
      setFormStatus("error");

      console.error("Error sending data:", error.response.data.email);
    }
  };

  const contentSections = guidesDetail.content_sections || [];
  
  const truncateDescription = (introduction, maxLength) => {
    if (introduction && introduction.length > maxLength) {
      return introduction.slice(0, maxLength - 3) + '...';
    }
    return introduction;
  };

  return (
    <Layout>
      <Helmet>
        <title>{guidesDetail ? guidesDetail.title : "Loading..."}</title>
        <meta
          name="description"
          content={
            guidesDetail
              ? truncateDescription(guidesDetail.introduction, 165)
              : "Our blogs are carefully curated by our editors and our popular content writers. We also invite guest writers from other companies, startups, and partners.".slice(0, 165)
          }
        />
        <meta name="robots" content="index" />
        <link
          rel="canonical"
          href={
            guidesDetail
              ? `https://www.clous.app/guides/${guidesDetail.slug}/`
              : ""
          }
        />
        <meta name="author" content={guidesDetail.first_name + ' ' + guidesDetail.last_name} />
        <meta
          property="og:url"
          content={
            guidesDetail
              ? `https://www.clous.app/guides/${guidesDetail.slug}/`
              : ""
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={guidesDetail ? guidesDetail.title : "Loading..."}
        />
        <meta
          property="og:description"
          content={
            guidesDetail
              ? truncateDescription(guidesDetail.introduction, 165)
              : "Our blogs are carefully curated by our editors and our popular content writers. We also invite guest writers from other companies, startups, and partners.".slice(0, 165)
          }
        />
        <meta
          property="og:image"
          content={guidesDetail ? guidesDetail.cover : icon}
        />
        <meta itemprop='image' content={guidesDetail ? guidesDetail.cover : icon}
 />
    <meta name='image' content={guidesDetail ? guidesDetail.cover : icon}
 />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={guidesDetail ? guidesDetail.title : "Loading..."}
        />
        <meta
          name="twitter:description"
          content={
            guidesDetail
              ? truncateDescription(guidesDetail.introduction, 165)
              : "Our blogs are carefully curated by our editors and our popular content writers. We also invite guest writers from other companies, startups, and partners.".slice(0, 165)
          }
        />
        <meta
          name="twitter:image"
          content={guidesDetail ? guidesDetail.cover : icon}
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
      <section className="py-24 bg-[#FAFAFA] text-dark-blue-greenish text-lg font-semibold mx-auto max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 lg:flex flex-col gap-8 justify-center">
        <Card
          color="transparent"
          className="gap-4 pt-0 text-muted mx-auto"
          shadow={false}
        >

    <header className="max-w-4xl mx-auto flex flex-col gap-6 mt-4 text-center">
    <p className="text-base font-normal text-gray flex flex-col gap-1">
   {moment(guidesDetail.date_up).format("ll")}
  {/*   &middot;
      <span className="mx-2 mt-2">{guidesDetail.reading_time} min read</span> */}
</p>
<h1
  className="text-4xl font-bold
sm:text-5xl lg:text-6xl"
>
  {guidesDetail.title}
</h1>
<h2 className="flex-col flex font-medium text-lg leading-5">
          Written by {guidesDetail.first_name} {guidesDetail.last_name}

      </h2>
<img
  className="h-full mx-auto max-w-3xl object-cover rounded-2xl"
  src={guidesDetail.cover}
  alt={guidesDetail.alt_cover}
  />



      


                  
        </header>     

          <section className="max-w-4xl flex flex-col gap-12">
          <embed
      src={guidesDetail.pdf}
      type="application/pdf"
      width="100%"
      height="500px"
      className="rounded-2xl"
    />
         
            <div className="font-normal"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(guidesDetail.introduction),
              }}
            />
            <div>
              {contentSections.map((section, index) => (
                <div key={index} className="flex flex-col gap-6">
                  <h2>{section.heading}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: section.content }}
                    className=" mb-12"
                  />
                  <img
                    src={section.image}
                    alt={section.alt_image}
                    className="rounded-xl"
                  />
                </div>
              ))}
            </div>
          </section>
        </Card>
            <aside className="max-w-4xl mx-auto">
           
           <h2 className="text-5xl font-semibold">Was this helpful ?</h2>
           <div className="flex gap-3 mt-4">
           <button
         onClick={() => handleVote('yes')}
         className={`border rounded-lg px-3 py-1.5 bg-primary text-white font-semibold ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
         disabled={hasVoted}
       >
         Yes
       </button>
       <button
         onClick={() => handleVote('no')}
         className={`border rounded-lg px-3 py-1.5 bg-main-white text-primary font-semibold ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
         disabled={hasVoted}
       >
         No
       </button>

           </div>
         </aside>
      </section>

      <Footer />
    </Layout>
  );
};

export default LeadGenerations;
