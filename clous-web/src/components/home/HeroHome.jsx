import NormalButton from "../ui/NormalButton";
import { useScroll, useTransform, motion } from 'framer-motion';
import { users } from './users';
import NegativeButton from "../ui/NegativeButton";
import React, { useState, useRef } from 'react';
import line from "assets/img/Line.png";
import { Link } from "react-router-dom";
import TextButton from "components/ui/TextButton";
import mixpanel from "mixpanel-browser";
import { useTranslation } from 'react-i18next';
import { IoCard, IoClose, IoPlay } from "react-icons/io5";
import { IoVolumeMute, IoVolumeHigh } from 'react-icons/io5';

function Header({modalIsOpen, setModalIsOpen}) {
  const { t } = useTranslation('herohome'); // Specify the namespace
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
    trackButtonClick("Home Video");
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

                <NormalButton name="Try it yourself" linkUrl="https://beta.clous.app/" target="_blank" onClick={() => trackButtonClick("Demo")}/>
                <div className="flex items-center gap-2 mt-2">
                <p className="text-base text-dark-gray font-medium flex gap-2 items-center">
3-week pilot</p> <div className="w-1 h-1 rounded-full bg-dark-gray"></div>
<p className="text-base text-dark-gray font-medium flex gap-2 items-center"><IoCard className="w-4 h-4"/>
No credit card required</p>
</div>
 
      </div>
    );
  };
  const ScrollCore = () => {
    const { scrollYProgress } = useScroll();

    const sectionHeight = 0.05;
    const rotate = useTransform(scrollYProgress, [0, sectionHeight], [20, 0]);
    const rotateY = useTransform(scrollYProgress, [0, sectionHeight], [-10, 0]);
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
          <ScrollCard rotate={rotate} rotateY={rotateY} translate={translate} scale={scale} />
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
       Hiring data that<br />
           your team understands
           {/* <img src={line} className="absolute w-[40%] right-0" loading="lazy" nofollow></img> */}
        </h1>
        {renderButtons()}

      </motion.div>
    );
  };
  const ScrollCard = ({
    rotate,
    rotateY,
    scale,
    translate,
  } ) => {

    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);
  
    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    return (
      <motion.div
        style={{
          rotateX: rotate,
          rotateY: rotateY,
          translateY: translate,
          scale,
        }}
        className="flex max-w-5xl -mt-12 mx-auto lg:h-auto w-full rounded-[30px] shadow-2xl"
      >
        <div className="relative min-w-[60rem] w-full h-full bg-white rounded-3xl">
            {/* Video de Demo de ClousH */}
            <video
              ref={videoRef}
              className="lg:w-full lg:h-full rounded-3xl"
              src="https://clous.s3.eu-west-3.amazonaws.com/Clous+Demo+Video.mp4"
              title="ClousH Alpha Launch Video"
              autoPlay
              muted={isMuted}
              loop
              controls={false} // Optional: to hide video controls
            ></video>
            <button
              className="absolute bottom-4 right-4 text-white rounded-full p-2"
              onClick={toggleMute}
            >
              {isMuted ? (
                <IoVolumeMute className="text-gray-700 w-6 h-6" />
              ) : (
                <IoVolumeHigh className="text-gray-700 w-6 h-6" />
              )}
            </button>
           </div>
        {/* <div className="bg-secondary h-full w-full rounded-2xl gap-4 overflow-hidden ">
            <img className="w-full h-full rounded-2xl" src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="Hiring AI Clous Peer for Hiring Teams" loading="lazy"/>
            <motion.button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-primary p-4 rounded-full hover:bg-opacity-80 transition:bg-opacity duration-300 delay-100"
            onClick={openVideoModal}
          >
            <IoPlay className="w-8 h-8 text-secondary"/>
                     <button
            className="absolute top-4 right-4 bg-secondary text-white rounded-full p-2"
            onClick={closeVideoModal}
          >
            <IoClose className="text-[#333333] w-6 h-6"/>
          </button>
          </motion.button>
        </div> */}
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
            <video
              className="absolute top-0 left-0 lg:w-full lg:h-full rounded-3xl"
              src="https://clous.s3.eu-west-3.amazonaws.com/Clous+Demo+Video.mp4"
              title="ClousH Alpha Launch Video"
              autoPlay
              muted
              loop
              controls={false} // Optional: to hide video controls
            ></video>
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
