import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

function BlogList() {
  const [blogList, setBlogList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Nuevo estado para almacenar la categoría seleccionada
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_2}/api/blog/list`, { withCredentials: true });
        setBlogList(Array.isArray(response.data.blogs) ? response.data.blogs : []);
      } catch (error) {
        console.error('Error fetching blog:', error);
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

  // Función para filtrar los blogs por categoría
  const filterBlogsByCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <main className=" mb-32">
    <h1 className="font-semibold text-3xl lg:text-7xl mb-8">
  Blogs

</h1>
     <section className="flex text-left w-full justify-start mb-16">

      {categoryList &&
        categoryList.map((cat, index) => (
          <div key={index} className="flex mx-2">
            <button
              className={`border-2  bg-beige-gray rounded-full px-4 lg:px-6 text-xl font-medium py-2 ${cat.name === selectedCategory ? 'bg-primary text-white border-primary ' : 'border-[#333333] hover:bg-dark-blue-greenish/5 hover:-translate-y-1 transition:translate duration-300 delay-100'}`}

              onClick={() => filterBlogsByCategory(cat.name)}
            >
              {cat.name}
            </button>
          </div>
        ))}
    </section>
    <section className="grid md:grid-cols-3 gap-8">
      {blogList &&
        blogList
          .filter((post) => {
            const postCategories = post.categories || (post.category ? [post.category] : []); // Manejar categorías como objeto
            return selectedCategory ? postCategories.some((category) => category.name === selectedCategory) : true;
      
          })
          .map((post) => (
              
              <Link to={`/blog/${post.slug}`} key={post.slug} className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl">
                <ul className="rounded-xl overflow-hidden text-left h-full">
              <img
                className="rounded-xl w-full h-[18rem] object-cover"
                src={post.cover}
                alt={post.alt_cover}
              />
              <p
                  className="font-semibold my-3 text-primary text-lg
 "
                >
                  {"Blogs"}
                </p>
              <li className='mb-6 flex flex-col gap-1'>
              <h2 id={`title` + post.id} className="text-2xl">
              {post.title}       
                      </h2>
              
              
                      </li>
                      <p className="font-medium text-sm rounded-full px-3 py-0.5 border border-2 bg-gray-200 inline-flex text-[#333333] mb-2">
                {post.category.name}

                </p>
                      <p className="flex justify-start font-semibold text-sm">
                {" "}
                
                <span className="mr-1">
                {moment(post.date_up).format("ll")}
                </span>{" "}
                &middot;
                <span className="ml-1">{post.reading_time} min read</span>
              </p>{" "}
            </ul>
          </Link>
          ))}
      </section>
    </main>
  );
}

export default BlogList;
