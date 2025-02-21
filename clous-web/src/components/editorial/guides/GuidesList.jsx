import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";


function GuidesList() {
  const [guidesList, setGuidesList] = useState([]);
  const [error, setError] = useState(null); // Added error state

  axios.defaults.withCredentials = true;

  // Realiza la solicitud GET con las credenciales
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_2}/api/guide/list`, { withCredentials: true });
        if (response.data) {
          setGuidesList(response.data);
        } else {
          console.error('Error fetching guides: Response data is undefined');
        }
      } catch (error) {
        setError(error); // Set the error state
        console.error('Error sending data:', error);
  console.error('Error response data:', error.response ? error.response.data : 'No response data');
  console.error('Error response status:', error.response ? error.response.status : 'No response status');

      }
    };

    fetchData();
  }, []); // El segundo parámetro [] significa que useEffect se ejecutará solo una vez al montar el componente

  return (
    <main>
      <h1 className="font-semibold text-3xl lg:text-7xl mb-8">
  Guides

</h1>
       <section className="grid md:grid-cols-3 gap-8 pb-24">
        
       {guidesList &&
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
                <h3 id={`title` + post.id} className=" text-2xl">
                  {post.title}
                </h3>
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
      </section>
      {error && (
        <div>
          <p>Error fetching guides: {error.message}</p>
        </div>
      )}
    </main>
  );
}

export default GuidesList;
