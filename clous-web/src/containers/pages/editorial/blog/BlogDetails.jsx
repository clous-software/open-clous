import axios from "axios";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import icon from "assets/img/favicon.png";
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
        <p className="text-sm font-medium border-b border-black pb-1">Table of contents</p>
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

function BlogDetails() {
  const { slug } = useParams();
  const [blogDetail, setBlogDetail] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const contentSections = blogDetail.content_sections || [];

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    contentSections.forEach((section, index) => {
      const sectionElement = document.getElementById(`section-${index}`);
      if (sectionElement) {
        const { top, bottom } = sectionElement.getBoundingClientRect();
        if (top <= 100 && bottom >= 100) {
          setActiveSection(index);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [contentSections]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_2}/api/blog/details/${slug}`,
          { withCredentials: true }
        );
        setBlogDetail(response.data);
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    const updateProgressBar = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setProgressWidth(progress);
    };

    window.addEventListener('scroll', updateProgressBar);
    return () => {
      window.removeEventListener('scroll', updateProgressBar);
    };
  }, []);

  const handleVote = async (choice) => {
    if (!hasVoted) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL_2}/api/blog/details/${slug}`,
          { vote: choice },
          { withCredentials: true }
        );
        setHasVoted(true);
      } catch (error) {
        console.error("Error submitting vote:", error);
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
        <title>{blogDetail ? blogDetail.title : "Loading..."}</title>
        <meta
          name="description"
          content={
            blogDetail
              ? truncateDescription(blogDetail.introduction, 165)
              : "Our blogs are carefully curated by our editors and our popular content writers. We also invite guest writers from other companies, startups, and partners.".slice(0, 165)
          }
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={blogDetail ? `https://www.clous.app/blog/${blogDetail.slug}/` : ""}
        />
        <meta name="author" content={blogDetail.first_name + ' ' + blogDetail.last_name} />
        <meta
          property="og:url"
          content={blogDetail ? `https://www.clous.app/blog/${blogDetail.slug}/` : ""}
        />
        <meta property="og:type" content="blog" />
        <meta
          property="og:title"
          content={blogDetail ? blogDetail.title : "Loading..."}
        />
        <meta
          property="og:description"
          content={
            blogDetail
              ? truncateDescription(blogDetail.introduction, 165)
              : "Our blogs are carefully curated by our editors and our popular content writers. We also invite guest writers from other companies, startups, and partners.".slice(0, 165)
          }
        />
        <meta property="og:image" content={blogDetail ? blogDetail.cover : icon} />
        <meta itemprop='image' content={blogDetail ? blogDetail.cover : icon} />
        <meta name='image' content={blogDetail ? blogDetail.cover : icon} />
        <meta name="twitter:image" content={blogDetail ? blogDetail.cover : icon} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={blogDetail ? blogDetail.title : "Loading..."}
        />
        <meta
          name="twitter:description"
          content={
            blogDetail
              ? truncateDescription(blogDetail.introduction, 165)
              : "Our blogs are carefully curated by our editors and our popular content writers. We also invite guest writers from other companies, startups, and partners.".slice(0, 165)
          }
        />
      </Helmet>
      <div className="progress-bar" style={{ width: `${progressWidth}%` }}></div>
      <div className="text-dark-blue-greenish text-sm font-semibold w-full fixed z-30">
        <div className="max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap">
          <Navbar />
        </div>
      </div>
      <div className="z-40 relative">
        <Logo />
      </div>
      {blogDetail ? (
        <main className="pt-24 mb-24 relative" key={blogDetail.slug}>
          <header className="max-w-4xl text-center mx-auto flex flex-col gap-2 mt-4">
            <p className="text-base font-normal text-gray flex flex-col gap-1">
              {moment(blogDetail.date_up).format("ll")}
            </p>
            <h1 className="text-3xl font-semibold sm:text-5xl lg:text-6xl">
              {blogDetail.title}
            </h1>
            <h2 className="flex justify-center font-medium text-lg leading-5 mt-4">
              Written by {blogDetail.first_name} {blogDetail.last_name}
            </h2>
          </header>
          <img
            className="h-full w-full max-w-4xl mx-auto mt-6 object-cover rounded-2xl"
            src={blogDetail.cover}
            alt={blogDetail.alt_cover}
          />
          <section className="max-w-4xl mx-auto flex flex-col gap-6">
            <div id="detail" className="max-w-4xl">
              <div className="flex flex-col gap-8 pt-8">
                <p
                  dangerouslySetInnerHTML={{
                    __html: DomPurify.sanitize(blogDetail.introduction),
                  }}
                />
                <div>
                  {contentSections.map((section, index) => (
                    <ul key={index} className="mb-12">
                      <li id={`section-${index}`}>
                        <h2>{section.heading}</h2>
                        <div
                          dangerouslySetInnerHTML={{ __html: section.content }}
                          className="mt-4 mb-12"
                        />
                        {section.image && (
                          <img
                            src={section.image}
                            alt={section.alt_image}
                            className="rounded-xl"
                          />
                        )}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="max-w-4xl mx-auto py-12">
            <p
              dangerouslySetInnerHTML={{
                __html: DomPurify.sanitize(blogDetail.conclusion),
              }}
            />
          </section>
          <aside className="max-w-4xl mx-auto justify-center flex flex-col text-center">
            <h2 className="text-5xl font-semibold">Was this helpful?</h2>
            <div className="flex gap-3 mt-4 justify-center">
              <button
                onClick={() => handleVote("yes")}
                className={`border rounded-lg px-3 py-1.5 bg-primary text-white font-semibold ${
                  hasVoted ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={hasVoted}
              >
                Yes
              </button>
              <button
                onClick={() => handleVote("no")}
                className={`border rounded-lg px-3 py-1.5 bg-main-white text-primary font-semibold ${
                  hasVoted ? "opacity-50 cursor-not-allowed" : ""
                }`}
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

export default BlogDetails;
