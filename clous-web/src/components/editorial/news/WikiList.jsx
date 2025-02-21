import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

function WikiList() {
  const [wikiList, setWikiList] = useState([]);
  axios.defaults.withCredentials = true;

  // Realiza la solicitud GET con las credenciales
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_2}/api/wikis/list`, { withCredentials: true });
        setWikiList(response.data);
      } catch (error) {
        console.error('Error fetching wikis:', error);
      }
    };

    fetchData();
  }, []); // El segundo parámetro [] significa que useEffect se ejecutará solo una vez al montar el componente
  
  return (
    <main>
      <h1 className="font-semibold text-3xl lg:text-7xl mb-8">
  Wikis

</h1>
       <section className="grid md:grid-cols-3 gap-8">
       {wikiList &&
        wikiList.map((post) => (
          <Link
            to={`/clous-wiki/${post.slug}`}
            key={post.slug}
            className="relative overflow-hidden transition duration-500 w-full rounded-lg lg:hover:text-primary group-hover:shadow-xl"
            >
              <ul className="rounded-xl flex flex-col gap-4 overflow-hidden justify-start items-start text-left h-full ">
              <img
                  className="rounded-xl max-h-[18rem] w-full object-cover"
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
                  <h3 id={`title` + post.id} className=" text-2xl">
                    {post.alt_cover}
                  </h3>
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
      </section>
    </main>
  );
}

export default WikiList;
