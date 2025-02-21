import { ArrowDown } from "lucide-react";
import FeatureCard from "../../../components/ui/FeatureCard";
import { useState, useEffect } from "react";
import { IoCard, IoClose, IoPlay } from "react-icons/io5";

function Uvp() {
  const [userMessage, setUserMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // State variable to track modal open/close

  const handleClick = (cardTitle) => {
    setUserMessage(cardTitle);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOneOpen, setIsModalOneOpen] = useState(false); // State variable to track modal open/close

  const handleOpenModalOne = () => {
    setIsModalOneOpen(true);
  };

  const handleCloseModalOne = () => {
    setIsModalOneOpen(false);
  };

  const [isVisible, setIsVisible] = useState([false, false, false]);
  useEffect(() => {
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
    };
  }, []);

  return (
    <main className="lg:py-16 lg:mt-32 py-8 px-8 lg:px-24">
      <section className="grid grid-cols-1 gap-48">
      <div className={`lg:flex lg:gap-16 transition-opacity duration-500 ${isVisible[0] ? "opacity-100" : "opacity-0"} section-transition`}>
      <div className="relative w-full h-full">
            <img className="w-full h-full rounded-2xl" src="https://clous.s3.eu-west-3.amazonaws.com/images/JobOpeningEditor.webp" alt="Clous Peer Home" />
            <button onClick={handleOpenModalOne} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#333333] text-white p-3 rounded-full shadow-lg">
            <IoPlay className="w-5 h-5 text-secondary"/>
            </button>
          </div>
          <FeatureCard
            title="Kandidaten einmal interviewen, für immer behalten"
            description="Hatten Sie schon einmal viele großartige Kandidaten, aber nur eine offene Stelle? Bestehende Tools sind nicht darauf ausgelegt, mit Talenten für zukünftige Jobmöglichkeiten zu interagieren. Unser Ziel ist es, transaktionale Kandidaten in wiederkehrende Talente umzuwandeln."
          />
         {/*  <img
            className="max-w-2xl ml-12"
            src="https://clous.s3.eu-west-3.amazonaws.com/images/deiFunnel.webp"
          ></img> */}

        </div>
        <div className={`lg:flex h-[20rem] lg:gap-16 transition-opacity duration-500 ${isVisible[1] ? "opacity-100" : "opacity-0"} section-transition`}>

          <FeatureCard
            title="Hören Sie auf, mehr als 4 Abonnements für die Einstellung zu bezahlen"
            description="Sie verwenden LinkedIn, um eine Stellenausschreibung zu bewerben und Kandidaten zu kontaktieren, ein ATS-Tool, um Kandidaten zu verwalten, Calendly, um Vorstellungsgespräche zu planen, und ChatGPT, um Stellenbeschreibungen zu entwerfen."
          />
          {/* Debería abrirse vídeo de Demo de ClousH */}
          <div className="relative w-full h-full">
            <img className="w-full h-full rounded-2xl" src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="Clous Peer Home" />
            <button onClick={handleOpenModal} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#333333] text-white p-3 rounded-full shadow-lg">
            <IoPlay className="w-5 h-5 text-secondary"/>
            </button>
          </div>

          {/* Debería de abrirse vídeo del lanzamiento */}
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 px-24 py-24 z-50">
              <div className="w-full h-full p-4 rounded-3xl relative">
              
                <button onClick={handleCloseModal} className="absolute top-10 right-10 text-gray-600 z-20 bg-primary rounded-full p-3">
                <IoClose className="text-secondary w-6 h-6"/>
                </button>
                {/* YouTube video */}
                <iframe src="https://www.youtube.com/embed/uH128x7js00?si=yG8ZDu-ANFNnvOHv" title="Clous Build in Public Video Series" frameBorder="0" autoPlay loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="w-full h-full rounded-3xl" allowFullScreen></iframe>
              </div>
            </div>
          )}
          {isModalOneOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 px-24 py-24 z-50">
              <div className="w-full h-full p-4 rounded-3xl relative">
              
                <button onClick={handleCloseModalOne} className="absolute top-10 right-10 text-gray-600 z-20 bg-primary rounded-full p-3">
                <IoClose className="text-secondary w-6 h-6"/>
                </button>
                {/* YouTube video */}
                <iframe src="https://www.youtube.com/embed/m9bO_fpieOY?si=GzEEarWrR7D14Pj5" title="ClousH Alpha Launch on 21st February" frameBorder="0" autoPlay loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="w-full h-full rounded-3xl" allowFullScreen></iframe>
              </div>
            </div>
          )}
        
       {/* <Board />*/}

        </div>
        

        
      </section>

      
    </main>
  );
}

export default Uvp;
