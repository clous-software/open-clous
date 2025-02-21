import { ArrowDown } from "lucide-react";
import FeatureCard from "../../../components/ui/FeatureCard";
import { useState, useEffect } from "react";
import { IoCard, IoClose, IoPlay } from "react-icons/io5";
import teams from "assets/img/HiringTeamUX.png";

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
      <div className="relative w-full h-auto mb-8 lg:mb-0">
            <img className="w-full h-auto max-w-[35rem] rounded-2xl" src={teams} alt="Clous Recruitment User Experience" loading="lazy"/>
            
          </div>
          <FeatureCard
            title="Entrevista a los candidatos una vez, reténlos para siempre"
            description={
              <>
                ¿Alguna vez ha tenido muchos candidatos prometedores pero sólo una vacante? Las herramientas existentes no están diseñadas para atraer talento para futuras oportunidades de trabajo. Nuestro objetivo es convertir a los candidatos transaccionales en talento recurrente.
<br/><br/>
Después de que los candidatos se entrevisten con los equipos de contratación, nuestra herramienta medirá y recopilará automáticamente los comentarios. Para que después, puedan actuar en base a los datos y así mejorar los procesos de contratación de su organización.
            </>}
          />
         

        </div>
        <div className={`lg:flex h-[20rem] lg:gap-16 transition-opacity duration-500 ${isVisible[1] ? "opacity-100" : "opacity-0"} section-transition`}>

          <FeatureCard
            title="Deja de pagar más de 4 suscripciones para encontrar talento"
            description="Si utilizas Linkedin para anunciar un puesto de trabajo y enviar mensajes a los candidatos, una herramienta ATS para gestionar a los candidatos, Calendly para programar entrevistas y ChatGPT para redactar las descripciones de los puestos de trabajo, Clous es tu herramienta."
          />
          {/* Debería abrirse vídeo de Demo de ClousH */}
          <div
        style={{
          boxShadow:
            '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        }}
        className="flex max-w-5xl -mt-12 mx-auto lg:h-[20rem] w-full max-w-xl border-1 lg:border-2 border-[#6C6C6C] p-1.5 lg:p-3 bg-[#222222] rounded-[30px] shadow-xl"
      >
        <div className="relative w-full h-full">
            <img className="w-full h-full rounded-2xl" src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="Clous Peer Launch on ProductHunt" loading="lazy"/>
            <button onClick={handleOpenModal} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg">
            <IoPlay className="w-5 h-5 text-secondary"/>
            </button>
          </div>
      </div>
          

          {/* Debería de abrirse vídeo del lanzamiento */}
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 px-24 py-24 z-50">
              <div className="w-full h-full p-4 rounded-3xl relative">
              
                <button onClick={handleCloseModal} className="absolute top-10 right-10 text-gray-600 z-20 bg-primary rounded-full p-3">
                <IoClose className="text-secondary w-6 h-6"/>
                </button>
                {/* YouTube video */}
                <iframe src="https://www.youtube.com/embed/I-L0WrMaVsg?si=0IQtnE5qvcDws91e" title="ClousH Alpha Launch on 21st February" frameBorder="0" autoPlay loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="w-full h-full rounded-3xl" allowFullScreen></iframe>
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
