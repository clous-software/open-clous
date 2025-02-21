import FeatureCard from "../ui/FeatureCard";
import { useState, useEffect } from "react";
import { IoCard, IoClose, IoPlay } from "react-icons/io5";
import teams from "assets/img/HiringTeamUX.png";
import mixpanel from "mixpanel-browser";

function Uvp() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable to track modal open/close

  const trackButtonClick = (Property) => {
    mixpanel.track('Conversion Value', {
    Name : Property,
    Property: Property, });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    trackButtonClick("Home Scroll Video");
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
            <img className="w-full h-[22rem] max-w-[45rem] rounded-2xl object-cover" src="https://clous.s3.eu-west-3.amazonaws.com/images/Action-From-Hiring-Data-with-AI.webp" alt="Take Action from Hiring Data with AI at Clous" loading="lazy"/>
            
          </div>
          <FeatureCard
            title="Drive useful insights from every candidate"
            description={
              <>
                Talent is the new key asset. And data is super valuable with AI. But you still have lots of hiring and candidate data scattered, unused or unreported.<br/><br/>
                We bring to life that Google Sheets with more than 2K candidates that you never use. That hiring report that no stakeholder read.
                </>}
          />
         

        </div>
        <div className={`lg:flex h-auto lg:gap-16 transition-opacity duration-500 ${isVisible[1] ? "opacity-100" : "opacity-0"} section-transition`}>

          <FeatureCard
            title="Collaborative hiring to align your team"
            description={
              <>
                The Engineering Manager asks you for 2 software developers for next week. Mission impossible. You try to do it anyways. It takes you one month, candidate experience &apos;could be better&apos;, and the new hires leave in 3 months.<br/><br/>
                If you could only align all the stakeholders for your hiring needs, get rid of the paperwork, and provide a thoughtful hiring experience, right? Involve your entire organization with Clous.
                </>
            }
          />
          {/* Debería abrirse vídeo de Demo de ClousH */}
          <div
        className="flex max-w-5xl -mt-12 mx-auto lg:h-[20rem] w-full max-w-xl rounded-[30px]"
      >
        <div className="relative w-full h-full">
            <img className="w-full h-full rounded-2xl" src="https://clous.s3.eu-west-3.amazonaws.com/images/Hiring-AI-for-Collaborative-Recruitment-Teams.webp" alt="Hiring AI for Collaborative Recruitment Teams" loading="lazy"/>
            {/* <button onClick={handleOpenModal} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg">
            <IoPlay className="w-5 h-5 text-secondary"/>
            </button> */}
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
