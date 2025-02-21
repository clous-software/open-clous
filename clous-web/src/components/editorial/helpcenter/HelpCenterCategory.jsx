import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

function HelpCard() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/news/list`) // Asegúrate de usar la URL correcta
      .then((response) => {
        // Actualizar el estado con los datos de las noticias
        setNews(response.data.posts);
      })
      .catch((error) => {
        console.error("Error al obtener noticias:", error);
      });
  }, []);

  return (
    <>
      <section className="p-16">
      {help &&
          help.map((category) => (
     
            <h1 className="text-5xl lg:text-7xl">{category.title}</h1>
          ))}

        {help &&
          help.map((post) => (
     
            <Link
            to={`/help/${post.slug}`}
          >
            <div className="rounded-xl overflow-hidden text-left w-full pb-2">
              <h3 id={`title` + post.id} className="mx-4 text-lg my-2 hover:text-primary">
              {post.title.length > 34
                      ? post.title.slice(0, 33)
                      : post.title}              
                      </h3>
                      {/* falta añadir la flecha mítica de nuestros CTAs; también cuando podamos categorizarlo como en squareup.com pero sin dropdowns - @alvipe-dev */}
            </div>
          </Link>
          ))}
      </section>
    </>
  );
}

export default HelpCard;
