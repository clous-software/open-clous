import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

function HRTalksList() {
  const [hrtalksList, setHRTalksList] = useState([]);
  axios.defaults.withCredentials = true;

  // Realiza la solicitud GET con las credenciales
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_2}/api/hrtalks/list`, { withCredentials: true });
        setHRTalksList(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, []); // El segundo parámetro [] significa que useEffect se ejecutará solo una vez al montar el componente

  return (
    <main>
      <h1 className="font-bold text-3xl lg:text-8xl mb-8">
  HR Talks

</h1>
       <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {hrtalksList &&
          hrtalksList.map((post) => (
     
            <Link
            to={`/hr-talks/${post.slug}`}
            key={post.slug}
            className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
            
          >
            <ul className="rounded-xl overflow-hidden text-left h-full">
              <img
                className="rounded-xl h-[25rem] w-[100%] object-cover"
                src={post.cover}
                alt={post.title}
              />
              <li className="my-6 flex flex-col gap-1">
                <p
                  className="font-semibold text-primary text-lg"
                >
                  HR Talks
                </p>
                <h3 id={`title` + post.id} className=" text-2xl">
                  {post.title}
                </h3>
              </li>
              <p className="flex justify-start font-normal text-lg">
                {" "}
                <span>{moment(post.date_up).format("ll")}</span> &middot;
                <span className="ml-1">{post.reading_time} min read</span>
              </p>{" "}
            </ul>
          </Link>
          ))}
      </section>
    </main>
  );
}

export default HRTalksList;
