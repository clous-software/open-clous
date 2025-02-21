import axios from "axios";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import moment from "moment";
import DomPurify from "dompurify";
import Navbar from "components/navigation/Navbar";
import Logo from "components/navigation/FixedLogo";
import mixpanel from "mixpanel-browser";


function TableOfContents({ contentSections, activeSection }) {
  return (
    <div className="fixed top-80 left-2 bg-secondary w-[15rem] font-medium rounded-2xl bg-transparent p-4">
      <ul className="flex flex-col gap-3">
        <h2 className="text-sm font-medium border-b border-black pb-1">Table of contents</h2>
        {contentSections.map((section, index) => (
          <li key={index}>
            <a
              href={`#section-${index}`}
              className="text-xs font-semibold leading-3 hover:underline hover:text-primary transition-all duration-200 delay-100"
              style={{ color: activeSection === index ? '#f26c21' : '' }}
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsDetails() {
  const { slug } = useParams(); // Obtener el slug de la URL
  const [newsDetail, setNewsDetail] = useState({});
  axios.defaults.withCredentials = true;
  const [hasVoted, setHasVoted] = useState(false); // New state for tracking if the user has voted
  const [activeSection, setActiveSection] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_2}/api/wikis/details/${slug}`, { withCredentials: true });
        setNewsDetail(response.data);
      } catch (error) {
        console.error('Error fetching wiki detail:', error);
      }
    };

    fetchData();
  }, [slug]);
  
  const contentSections = newsDetail.content_sections || [];

  const handleVote = async (choice) => {
    if (!hasVoted) {
      try {
        // Make the POST request to vote
        await axios.post(`${process.env.REACT_APP_API_URL_2}/api/wikis/details/${slug}`, { vote: choice }, { withCredentials: true });
        
        // Update the state to reflect that the user has voted
        setHasVoted(true);
      } catch (error) {
        console.error('Error submitting vote:', error);
      }
    }
  };
  
  const truncateDescription = (introduction, maxLength) => {
    if (introduction && introduction.length > maxLength) {
      return introduction.slice(0, maxLength - 3) + '...';
    }
    return introduction;
  };


  return (
    <Layout>
      <Helmet>
        <title>{newsDetail ? newsDetail.title : "Loading..."}</title>
        <meta
          name="description"
          content={
            newsDetail
              ? truncateDescription(newsDetail.introduction, 165)
              : "Our blogs are carefully curated by our editors and our popular content writers. We also invite guest writers from other companies, startups, and partners.".slice(0, 165)
          }
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={
            newsDetail ? `https://www.clous.app/clous-wiki/${newsDetail.slug}/` : ""
          }
        />
        <meta name="author" content={newsDetail.first_name + ' ' + newsDetail.last_name} />
        <meta
          property="og:url"
          content={
            newsDetail ? `https://www.clous.app/clous-wiki/${newsDetail.slug}/` : ""
          }
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={newsDetail ? newsDetail.title : "Loading..."}
        />
        <meta
          property="og:description"
          content={
            newsDetail
              ? truncateDescription(newsDetail.introduction, 165)
              : "Our blogs are carefully curated by our editors and our popular content writers. We also invite guest writers from other companies, startups, and partners.".slice(0, 165)
          }
        />
        <meta
          property="og:image"
          content={newsDetail ? newsDetail.cover : 'https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp'}
        />
        <meta itemprop='image' content={newsDetail ? newsDetail.cover : 'https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp'}
 />
    <meta name='image' content={newsDetail ? newsDetail.cover : 'https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp'}
 />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={newsDetail ? newsDetail.title : "Loading..."}
        />
        <meta
          name="twitter:description"
          content={
            newsDetail
              ? truncateDescription(newsDetail.introduction, 165)
              : "Our blogs are carefully curated by our editors and our popular content writers. We also invite guest writers from other companies, startups, and partners.".slice(0, 165)
          }
        />
        <meta
          name="twitter:image"
          content={newsDetail ? newsDetail.cover : 'https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp'}
        />
      </Helmet>
      <div className=" text-dark-blue-greenish text-sm font-semibold w-full fixed z-30  ">
      <div className=" max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap">
      <Navbar />
      </div> 
      </div>
      <div className="z-40 relative pb-24">
      <Logo />

      </div>
    
      {newsDetail ? (
          <main className="pt-6 mb-24" key={newsDetail.slug}>


<header className="max-w-4xl mx-auto flex text-center flex-col gap-6 mt-4">

    <p className="text-sm font-medium text-gray flex flex-col gap-1">
    {moment(newsDetail.date_up).format("ll")}
  {/*   &middot;
      <span className="mx-2 mt-2">{newsDetail.reading_time} min read</span> */}
</p>
<h1
  className="text-4xl font-bold
sm:text-5xl lg:text-6xl"
>
  {newsDetail.title}
</h1>
<h2 className="flex-col flex font-medium text-lg leading-5">
         Written by {newsDetail.first_name} {newsDetail.last_name}
        
      </h2>
      <img
  className="h-full w-full mx-auto max-w-4xl object-cover rounded-2xl"
  src={newsDetail.cover}
  alt={newsDetail.alt_cover}
  />


<div id="detail" className="max-w-4xl">
 
      
   
  <div className="flex flex-col gap-8 pt-8 text-left">
    <p
      dangerouslySetInnerHTML={{
        __html: DomPurify.sanitize(newsDetail.introduction),
      }}
    />
    <div>
      {contentSections.map((section, index) => (
        <ul key={index} className="mb-12">
          <li>
            <h2>{section.heading}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: section.content }}
              className="mt-4 mb-12"
            />
            <img
              src={section.image}
              alt={section.alt_image}
              className="rounded-xl"
            />
          </li>
        </ul>
      ))}
    </div>
  </div>
</div>

                  
        </header>     
      
            <footer className="max-w-4xl mx-auto py-12 flex">
            <p
                  dangerouslySetInnerHTML={{
                    __html: DomPurify.sanitize(newsDetail.conclusion),
                  }}
                />
            </footer>
            <aside className="max-w-4xl mx-auto">
           
           <h2 className="text-5xl font-semibold text-center">Was this resource helpful?</h2>
           <div className="flex gap-3 mt-4 justify-center">
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
         <TableOfContents contentSections={contentSections} activeSection={activeSection} />
          </main>
         ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </Layout>
  );
}

export default NewsDetails;
