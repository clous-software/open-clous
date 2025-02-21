import NormalButton from "../../../components/ui/NormalButton";
import { useScroll, useTransform, motion } from 'framer-motion';
import { users } from './users';
import React, { useState } from 'react';
import line from "assets/img/Line.png";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import { useTranslation } from 'react-i18next';
import { IoCard, IoClose, IoPlay } from "react-icons/io5";

function Header({modalIsOpen, setModalIsOpen}) {
  const { t } = useTranslation('herohome'); // Specify the namespace
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const trackButtonClick = (Property) => {
    mixpanel.track('Conversion Value', {
    Name : Property,
    Property: Property, });
  };

  const renderButtons = () => {
    return (
      <div className="flex flex-col justify-center items-center text-xl gap-2 fadeOut">

                <NormalButton name="Try Clous" linkUrl="https://beta.clous.app" target="_blank" onClick={() => trackButtonClick("Demo")}/>
                <div className="flex items-center gap-2 mt-2">
                <p className="text-base text-dark-gray font-medium flex gap-2 items-center">
Prueba gratis</p> <div className="w-1 h-1 rounded-full bg-dark-gray"></div>
<p className="text-base text-dark-gray font-medium flex gap-2 items-center"><IoCard className="w-4 h-4"/>
No requiere tarjeta de crédito</p>
</div>
 
      </div>
    );
  };
  const ScrollCore = () => {
    const { scrollYProgress } = useScroll();

    const sectionHeight = 0.05;
    const rotate = useTransform(scrollYProgress, [0, sectionHeight], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, sectionHeight], [1.05, 1]);
    const translate = useTransform(scrollYProgress, [0, sectionHeight], [0, -100]);
  
    return (
      <div className="h-[150vh] transform flex items-center justify-center relative ">
        <div
          className="lg:py-24 w-full relative"
          style={{
            perspective: '1000px',
          }}
        >
          <ScrollHeader translate={translate} />
          <ScrollCard rotate={rotate} translate={translate} scale={scale} />
        </div>
      </div>
    );
  };
  const ScrollHeader = ({ translate }) => {
    return (
      <motion.div
        style={{
          translateY: translate,
        }}
        className="div max-w-7xl mx-auto text-center mb-16"
      > 
        <h1 className="text-3xl lg:text-7xl fadeOut mb-8 relative" loading="lazy">
       Experiencias de selección<br />
           que atraen al talento
           <img src={line} className="absolute w-[40%] right-0" loading="lazy" nofollow></img>
        </h1>
        {renderButtons()}

      </motion.div>
    );
  };
  const ScrollCard = ({
    rotate,
    scale,
    translate,
  } ) => {
    return (
      <motion.div
        style={{
          rotateX: rotate, // rotate in X-axis
          translateY: translate,
          scale,
          boxShadow:
            '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        }}
        className="flex max-w-5xl -mt-12 mx-auto lg:h-[40rem] w-full border-2 lg:border-4 border-[#6C6C6C] p-3 lg:p-6 bg-[#222222] rounded-[30px] shadow-xl"
      >
        <div className="bg-secondary h-full w-full rounded-2xl gap-4 overflow-hidden ">
            <img className="w-full h-full rounded-2xl" src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="Hiring AI Clous Peer for Hiring Teams" loading="lazy"/>
            <motion.button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-primary p-4 rounded-full hover:bg-opacity-80 transition:bg-opacity duration-300 delay-100"
            onClick={openVideoModal}
          >
            <IoPlay className="w-8 h-8 text-secondary"/>
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <main className="py-32 mb-64 flex justify-center items-center text-center">
      <section className="flex flex-col h-screen">
                {ScrollCore()}         
         

      </section>

{/* Video de Demo de Clous Peer */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50"
        >
          
          
          <div className="relative lg:w-9/12 lg:h-3/4 w-full h-full bg-white rounded-3xl">
            {/* Video de Demo de ClousH */}
            <iframe
              className="absolute top-0 left-0 lg:w-full lg:h-full rounded-3xl"
              src="https://www.youtube.com/embed/oMme6m0dPzc?si=DNiUaTCocyWsxzJ6"
              title="ClousH Alpha Launch Video"
              allowFullScreen
            ></iframe>
            <button
              className="absolute top-4 right-4 bg-secondary text-white rounded-full p-2"
              onClick={closeVideoModal}
            >
              <IoClose className="text-[#333333] w-6 h-6"/>
            </button>
          </div>
        </motion.div>
      )}

      
    </main>
  );
}

export default Header;
