import React, { useState, useEffect } from "react";
import NegativeButton from "../ui/NegativeButton";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";


function Who() {
  const phrases = ["top recruiters","the best HR leaders", "amazing hiring teams", "founders and operators", "awesome hiring managers", "top 1% ambitious talent", "startup founders and hustlers", "recruitment leaders"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState([false]);
 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 5000);
    const handleScroll = () => {
      const uvps = document.querySelectorAll(".section-transition");
      uvps.forEach((uvp, index) => {
        if (uvp && window.scrollY > uvp.offsetTop - window.innerHeight / 1.5) {
          setIsVisible(prevState => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; // Cambia el número 5000 por el intervalo de tiempo en milisegundos que deseas entre cada cambio de frase

    return () => clearInterval(intervalId);
    }, [phrases.length]);

  return (
    <main className="pt-32 pb-8 px-2 lg:px-24 ">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       {/* <div className={`lg:flex lg:gap-16 text-3xl lg:text-6xl gap-4 items-center transition-opacity duration-500 ${isVisible[3] ? "opacity-100" : "opacity-0"} section-transition`}>
         <h2>

          Built for
          </h2>
          <div className="carousel-container">
            <ul className="carousel-list">
              {phrases.map((phrase, index) => (
                <li
                  key={index}
                  className={`carousel-item text-primary pb-3 ${
                    index === currentIndex ? "active" : ""
                  }`}
                >
                  {phrase}
                </li>
              ))}
            </ul>
          </div>
        </div>
                */}
<Link to="https://www.clous.app/cloush" className="rounded-3xl w-full h-[19rem] bg-light-orange p-6 group overflow-hidden relative cursor-pointer">
  <NegativeButton name="Recruiters" buttonClasses="hover:bg-transparent"></NegativeButton>
  <h2 className="text-5xl text-primary mt-24">Hire at your own pace</h2>
  <FiExternalLink className="w-12 h-12 text-primary absolute -right-10 -top-10 group-hover:right-6 group-hover:top-6 transition-hover duration-500 delay-150"/>
</Link>
<Link to="/pricing" className="rounded-3xl w-full h-[20rem] lg:h-[19rem] bg-light-orange p-6 group overflow-hidden relative cursor-pointer">
  <NegativeButton name="Hiring teams"></NegativeButton>
  <h2 className="text-5xl text-primary mt-24">Push your team further</h2>
  <FiExternalLink className="w-12 h-12 text-primary absolute -right-10 -top-10 group-hover:right-6 group-hover:top-6 transition-hover duration-500 delay-150"/>
</Link>
<Link to="/contact" className="rounded-3xl w-full h-[20rem] lg:h-[19rem] bg-light-orange p-6 group overflow-hidden relative cursor-pointer">
  <NegativeButton name="Businesses"></NegativeButton>
  <h2 className="text-5xl text-primary mt-24">Achieve your team goals</h2>
  <FiExternalLink className="w-12 h-12 text-primary absolute -right-10 -top-10 group-hover:right-6 group-hover:top-6 transition-hover duration-500 delay-150"/>
</Link>
      </section>
    </main>
  );
}

export default Who;
