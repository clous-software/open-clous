import NormalButton from "../../ui/NormalButton";
import mixpanel from "mixpanel-browser";
import ModalCheck from "../../ui/Modal";
import { Link } from "react-router-dom";
import NegativeButton from "../../ui/NegativeButton";
import { useScroll, useTransform, motion } from 'framer-motion';
import TextButton from "components/ui/TextButton";
import { IoCard, IoClose, IoPlay } from "react-icons/io5";
import React, { useState } from 'react';
import longCircle from "assets/img/LongCircle.png";
import { MdOutlineSmartButton } from "react-icons/md";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BsPersonVideo2 } from "react-icons/bs";
import { IoPeopleCircleOutline } from "react-icons/io5";

export default function HeroClous ({modalIsOpen, setModalIsOpen}) {

  const trackButtonClick = (Property) => {
    mixpanel.track('Conversion Value', {
    Name : Property,
    Property: Property, });
  };

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const ScrollCore = () => {
    const { scrollYProgress } = useScroll();

    const sectionHeight = 0.05;
    const rotate = useTransform(scrollYProgress, [0, sectionHeight], [20, 0]);
    const rotateY = useTransform(scrollYProgress, [0, sectionHeight], [-10, 0]);
    const scale = useTransform(scrollYProgress, [0, sectionHeight], [1.05, 1]);
    const translate = useTransform(scrollYProgress, [0, sectionHeight], [0, -100]);
  
    return (
      <div className="h-[120vh] lg:h-[150vh] transform flex items-center justify-center relative ">
        <div
          className=" w-full relative"
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
        className="div max-w-6xl mx-auto text-center mb-16"
      > 
        <h1 className="text-3xl lg:text-7xl fadeOut mb-8 z-10" loading="lazy">
          Candidate insights that <br />{' '}
            improve hiring processes
            {/* <img src={longCircle} className="absolute w-[50%] lg:w-[40%] lg:left-[20%] -left-1 -top-4 lg:-top-10 -z-10" nofollow></img> */}
        </h1>
        <div className="flex justify-center items-center text-xl gap-4 fadeOut">

                <NormalButton name="Try it yourself" linkUrl="https://beta.clous.app/" target="_blank" onClick={() => trackButtonClick("Demo")}/>
 
      </div>
      </motion.div>
    );
  };
  const ScrollCard = ({
    rotate,
    rotateY,
    scale,
    translate,
  } ) => {
    return (
      <motion.div
        style={{
          rotateX: rotate, // rotate in X-axis
          rotateY: rotateY, // rotate in X-axis
          translateY: translate,
          scale,
        }}
        className="flex max-w-5xl -mt-12 mx-auto lg:h-[40rem] w-full rounded-[30px] shadow-2xl"
      >
        <div className="bg-secondary h-full w-full rounded-2xl gap-4 overflow-hidden">
        
            <img className="w-full h-full rounded-2xl" src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="Collaborative Hiring AI for Hiring Teams"/>
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
    <section className=" mb-12 text-center w-[100vw] lg:w-full justify-center">
        <div className=" fadeOut">
            
            {ScrollCore()}

            
          </div>
          {/* Modal for YouTube Video */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50"
        >
          <div className="relative lg:w-8/12 lg:h-3/4 w-full h-full bg-white rounded-3xl overflow-hidden">
          <div className="relative pb-[62.5%] h-0"><iframe src="https://www.loom.com/embed/041d616bfdf64e7c88e0468cf768112e?sid=575ce3fe-a91e-4913-a916-4f3ec39a9ee0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen className="absolute top-0 left-0 w-[100%] h-[100%]" loading="lazy"></iframe></div>
            <button
              className="absolute top-4 right-4 bg-primary text-white rounded-full p-2"
              onClick={closeVideoModal}
            >
              <IoClose className="text-secondary w-6 h-6"/>
            </button>
          </div>
        </motion.div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 -mt-32 text-left">
  <div className="py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col">
    <MdOutlineQuestionAnswer className="w-8 h-8 mb-4"/>
    <h2 className="text-2xl pr-8 mb-4">
    Get insights from candidates</h2>
    <p className="font-normal text-base">
      Make informed decisions with data you can actually understand.
    </p>
  </div>
  <div className="py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col">
    <BsPersonVideo2 className="w-8 h-8 mb-4"/>
    <h2 className="text-2xl pr-8 mb-4">
    Avoid text-heavy tasks    </h2>
    <p className="font-normal text-base">
      Hiring reports and job descriptions. Why do we keep doing that manually?
    </p>
  </div>
  <div className="py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col">
    <IoPeopleCircleOutline className="w-8 h-8 mb-4"/>
    <h2 className="text-2xl pr-8 mb-4">
    Align your hiring needs    </h2>
    <p className="font-normal text-base">
      Collaborate with your teams and get on the same page about your hiring needs.
          </p>
  </div>
  <div className="py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col">
    <MdOutlineSmartButton className="w-8 h-8 mb-4"/>
    <h2 className=" text-2xl pr-8 mb-4">
    Easy-to-understand hiring data    </h2>
    <p className="font-normal text-base">
      Building dashboards is a thing from the past. We make it easy to understand data.
    </p>
  </div>
</div>

         
          
    </section>
  );
}

