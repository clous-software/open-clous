import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import NegativeButton from "components/ui/NegativeButton";

const EditorialList = () => {
  const [blogList, setBlogList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [guidesList, setGuidesList] = useState([]);
  const [hrtalksList, setHRTalksList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [blogIsFiltered, setBlogIsFiltered] = useState(true);
  const [wikisIsFiltered, setWikisIsFiltered] = useState(true);
  const [guidesIsFiltered, setGuidesIsFiltered] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_2}/api/blog/list`,
          { withCredentials: true }
        );
        setBlogList(
          Array.isArray(response.data.blogs) ? response.data.blogs : []
        );
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_2}/api/blog/categories/list`, { withCredentials: true });
        setCategoryList(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
 
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_2}/api/wikis/list`,
          { withCredentials: true }
        );
        setNewsList(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_2}/api/guide/list`,
          { withCredentials: true }
        );
        setGuidesList(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <section className="text-left place-items-center w-full mx-auto">
  <h1 className="font-semibold text-5xl lg:text-7xl mb-8 fadeOut">
  Editorial for hiring teams

</h1>

{/*<p className="my-2 text-lg lg:text-xl font-normal ">
Your source for HR and recruitment content that keeps updating monthly. Curated content for recruitment teams and knowledge workers.
</p>*/}
<div className="mt-4 flex justify-start gap-1 lg:gap-4 fadeOut">

<div className={`rounded-full shadow-none flex px-3 lg:px-4 py-1 font-semibold text-base lg:text-xl cursor-pointer border border-2 border-primary hover:bg-primary hover:text-secondary transition-hover duration-200 delay-100 ${blogIsFiltered ? "text-white bg-primary" : "text-primary"}`} nofollow onClick={() => {setBlogIsFiltered(true); setGuidesIsFiltered(false); setWikisIsFiltered(false);}}>Blog</div>
<div className={`rounded-full shadow-none flex px-3 lg:px-4 py-1 font-semibold text-base lg:text-xl cursor-pointer border border-2 border-primary hover:bg-primary hover:text-secondary transition-hover duration-200 delay-100 ${guidesIsFiltered ? "text-white bg-primary" : "text-primary"}`} nofollow onClick={() => {setBlogIsFiltered(false); setGuidesIsFiltered(true); setWikisIsFiltered(false);}}>Guides</div>
<div className={`rounded-full shadow-none flex px-3 lg:px-4 py-1 font-semibold text-base lg:text-xl cursor-pointer border border-2 border-primary hover:bg-primary hover:text-secondary transition-hover duration-200 delay-100 ${wikisIsFiltered ? "text-white bg-primary" : "text-primary"}`} nofollow onClick={() => {setBlogIsFiltered(false); setGuidesIsFiltered(false); setWikisIsFiltered(true);}}>Wikis</div>

{/* <a href="https://www.producthunt.com/products/cloush-demo?utm_source=badge-follow&utm_medium=badge&utm_souce=badge-cloush&#0045;demo" target="_blank"  rel="noreferrer"><img src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=562280&theme=light" alt="ClousH&#0032;Demo - Connecting&#0032;hiring&#0032;teams&#0032;with&#0032;efficiency | Product Hunt"  width="250" height="54" 
          onClick={() => trackButtonClick("Product Hunt")}

/></a> */}
</div>

</section>
    <main className="mt-12 grid grid-cols-3 gap-8 pb-24">
    {guidesIsFiltered && guidesList &&
        guidesList.map((post) => (
          <Link
            to={`/guides/${post.slug}`}
            key={post.slug}
            className="relative overflow-hidden transition duration-500 w-full rounded-lg lg:hover:text-primary group-hover:shadow-xl"
          >
            <ul className="rounded-xl flex flex-col gap-4 overflow-hidden justify-start my-6 text-left h-full ">
            <img
                className="rounded-xl w-full object-cover"
                src={post.cover}
                alt={post.alt_cover}
              />
              <li className="flex gap-4 flex-col">
              
              <div>
              <p
                  className="font-semibold text-primary text-lg"
                >
                  Guides
                </p>
                <h2 id={`title` + post.id} className=" text-2xl">
                  {post.title}
                </h2>
              </div>
              <div className="py-6">
              <p className="flex justify-start">
                {" "}
                <span>{moment(post.date_up).format("ll")}</span>
                <span className="ml-1"> · </span>
                <span className="ml-1">{post.reading_time} min read</span>
              </p>{" "}
              </div>
              </li>
              
              
            </ul>
          </Link>
        ))}
      {blogIsFiltered && blogList &&
        blogList.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.slug}  className="relative overflow-hidden transition duration-500 w-full rounded-lg lg:hover:text-primary group-hover:shadow-xl"
          >
            <ul className="rounded-xl my-6 flex flex-col gap-4 overflow-hidden justify-start items-start text-left h-full ">
            <img
                className="rounded-xl w-full h-[18rem] object-cover"
                src={post.cover}
                alt={post.alt_cover}
              />
              <li className=" flex flex-col gap-4">
              
              <div>
              <p
                  className="font-semibold text-primary text-lg
 "
                >
                  {"Blogs"}
                </p>
                <h2 id={`title` + post.id} className=" text-2xl">
                  {post.title}
                </h2>
              </div>
              <div className="py-1">
                <p className="font-medium text-sm rounded-full px-3 py-0.5 border border-2 bg-gray-200 inline-flex text-[#333333] mb-2">
                {post.category.name}

                </p>
              <p className="flex justify-start">
                {" "}
                <span>{moment(post.date_up).format("ll")}</span> 
                <span className="ml-1"> · </span>
                <span className="ml-1">{post.reading_time} min read</span>
              </p>{" "}
              </div>
                
              </li>
              
              
            </ul>
          </Link>
        ))}

      {wikisIsFiltered && newsList &&
        newsList.map((post) => (
          <Link
            to={`/clous-wiki/${post.slug}`}
            key={post.slug}
            className="relative overflow-hidden transition duration-500 w-full rounded-lg lg:hover:text-primary group-hover:shadow-xl"
            >
              <ul className="rounded-xl flex flex-col gap-4 overflow-hidden justify-start items-start text-left h-full ">
              <img
                  className="rounded-xl w-full object-cover"
                  src={post.cover}
                  alt={post.alt_cover}
                />
                <li className="my-6 flex flex-col gap-4">
                
                <div>
                <p
                    className="font-semibold text-primary text-lg
   "
                  >
                    Wikis
                  </p>
                  <h2 id={`title` + post.id} className=" text-2xl">
                    {post.title}
                  </h2>
                </div>
                <div className="py-1">
                <p className="flex justify-start">
                  {" "}
                  <span>{moment(post.date_up).format("ll")}</span>
                  <span className="ml-1"> · </span>
                  <span className="ml-1">{post.reading_time} min read</span>
                </p>{" "}
                </div>
                </li>
                
                
              </ul>
          </Link>
          
        ))}

      

     
    </main>
    </>
  );
};

export default EditorialList;
