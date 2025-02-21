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
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {help &&
          help.map((category) => (
     
            <Link
            to={`/help/${category.slug}`}
          >
            <div className="rounded-xl overflow-hidden border text-center h-full pb-2">
            <img className='w-6' src={category.thumbnail} alt={category.title+" Icon"}/>
              <h3 id={`title` + category.id} className="mx-4 text-2xl my-2">
              {category.title.length > 34
                      ? category.title.slice(0, 33)
                      : category.title}              
                      </h3>
            </div>
          </Link>
          ))}
      </section>
    </>
  );
}

export default HelpCard;
