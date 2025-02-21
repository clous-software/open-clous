import NormalButton from "../../ui/NormalButton";
import mixpanel from "mixpanel-browser";
import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useState } from 'react';
import ticks from "assets/img/Ticks.png";
import { MdOutlineSmartButton } from "react-icons/md";
import { TbChevronRightPipe } from "react-icons/tb";
import action from "assets/img/action.json";
import recurring from "assets/img/recurring.json";
import schedule from "assets/img/schedule.json";
import share from "assets/img/share.json";
import Lottie from "lottie-react";

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
  const [activeTab, setActiveTab] = useState('tab1');


  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const ScrollCore = () => {
    const { scrollYProgress } = useScroll();

    const sectionHeight = 0.05;
    const rotate = useTransform(scrollYProgress, [0, sectionHeight], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, sectionHeight], [1.05, 1]);
    const translate = useTransform(scrollYProgress, [0, sectionHeight], [0, -100]);
  
    return (
      <div className="pt-32 transform flex items-center justify-center relative ">
        <div
          className=" w-full relative"
          style={{
            perspective: '1000px',
          }}
        >
          <ScrollHeader translate={translate} />
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
        <h1 className="text-3xl lg:text-7xl fadeOut mb-8 z-10 relative" loading="lazy">
          AI assistant <br />{' '}
            for hiring teams
            <img src={ticks} className="absolute w-[3rem] lg:w-[5rem] lg:right-[22%] right-2 -top-4 lg:-top-10 -z-10"></img>
        </h1>
        <div className="flex justify-center items-center text-xl gap-4 fadeOut">

                <NormalButton name="Try Peer" linkUrl="https://beta.clous.app" target="_blank" onClick={() => trackButtonClick("Demo")}/>
 
      </div>
      </motion.div>
    );
  };
  

  return ( 
    <section className=" mb-12 text-center w-[100vw] lg:w-full justify-center ">
        <div className=" fadeOut">
            
            {ScrollCore()}

            
          </div>
         
      <div className="flex flex-col">
      <section className="grid grid-cols-4 gap-6 font-medium border-b max-w-xl  mx-auto bg-main-white overflow-hidden px-6 pb-0 mb-8">
      <button
          className={`py-2 px-4 text-base flex flex-col gap-1 justify-center items-center ${activeTab === 'tab1' ? 'border-dark-gray border-b border-b-2' : ''}`}
          onClick={() => setActiveTab('tab1')}
        >            <Lottie className='w-12 h-12' animationData={schedule}/>
        Planning
        </button>
        <button
          className={`py-2 px-4 text-base flex flex-col gap-1 justify-center items-center ${activeTab === 'tab2' ? 'border-primary border-b border-b-2' : ''}`}
          onClick={() => setActiveTab('tab2')}
        >            <Lottie className='w-12 h-12' animationData={share}/>
        Sharing
        </button>
        <button
          className={`py-2 px-4 text-base flex flex-col gap-1 justify-center items-center ${activeTab === 'tab3' ? 'border-[#F9A31A] border-b border-b-2' : ''}`}
          onClick={() => setActiveTab('tab3')}
        >            <Lottie className='w-12 h-12' animationData={action}/>
        Interviewing
        </button>
        <button
          className={`py-2 px-4 text-base flex flex-col gap-1 justify-center items-center ${activeTab === 'tab4' ? 'border-primary border-b border-b-2' : ''}`}
          onClick={() => setActiveTab('tab4')}
        >            <Lottie className='w-12 h-12' animationData={recurring}/>
        Retaining
        </button>
      
        
        
 
      </section>

      <section className="pt-4">
      {activeTab === 'tab1' && 
        <section className='text-left rounded-3xl lg:flex flex-col items-center bg-beige-gray lg:py-12 lg:px-12 overflow-hidden'>
          <h2 className='text-2xl'>Industry Knowledge for Better Outcomes</h2>
          <img src="https://clous.s3.eu-west-3.amazonaws.com/images/Clous-Peer-Retaining.webp" className="w-[70%] h-auto object-cover"></img>
          <ul className='grid grid-cols-3 gap-6 text-[#333333] mt-0'>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Create a Unified Hiring Plan</h3>
              <p className='text-sm'>With our industry insights, craft a comprehensive hiring strategy tailored to your needs.</p>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Streamline Recruitment Processes</h3>
              <p className='text-sm'>Leverage our knowledge to optimize your recruitment workflows, enhancing efficiency and effectiveness.</p>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Enhance Candidate Engagement</h3>
              <p className='text-sm'>By implementing best practices, create a positive experience for candidates throughout the hiring journey.</p>
            </li>
          </ul>
        </section>}

        {activeTab === 'tab2' && 
        <section className='text-left rounded-3xl lg:flex flex-col items-center bg-beige-gray lg:py-12 lg:px-12 overflow-hidden'>
          <h2 className='text-2xl'>Eliminate Expensive Job Ads</h2>
          <img src="https://clous.s3.eu-west-3.amazonaws.com/images/Clous-Peer-Retaining.webp" className="w-[70%] h-auto object-cover"></img>
          <ul className='grid grid-cols-3 gap-6 text-[#333333] mt-0'>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Effortless Job Sharing</h3>
              <p className='text-sm'>Share job openings across multiple platforms with a single click, expanding your reach without breaking the bank.</p>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Maximize Social Media Exposure</h3>
              <p className='text-sm'>Our integrated tools simplify social media sharing, ensuring your job postings reach a broader audience effortlessly.</p>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Discover Clous Jobs</h3>
              <p className='text-sm'>Explore our exclusive job board tailored to connect top talent with forward-thinking companies like yours.</p>
            </li>
          </ul>
        </section>}

        {activeTab === 'tab3' && 
        <section className='text-left rounded-3xl lg:flex flex-col items-center bg-beige-gray lg:py-12 lg:px-12 overflow-hidden'>
          <h2 className='text-2xl'>Unlock Insights from Interviews</h2>
          <img src="https://clous.s3.eu-west-3.amazonaws.com/images/Clous-Peer-Retaining.webp" className="w-[70%] h-auto object-cover"></img>
          <ul className='grid grid-cols-3 gap-6 text-[#333333] mt-0'>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Craft Tailored Interview Questions</h3>
              <p className='text-sm'>Utilize our interview question templates to uncover valuable insights and assess candidate suitability effectively.</p>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Automate Meeting Transcriptions</h3>
              <p className='text-sm'>Our transcription feature simplifies the documentation process, ensuring no valuable information is lost during interviews.</p>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Extract Actionable Insights</h3>
              <p className='text-sm'>Gain actionable insights from interview notes, enabling data-driven decision-making throughout the hiring process.</p>
            </li>
          </ul>
        </section>}

        {activeTab === 'tab4' && 
        <section className='text-left rounded-3xl lg:flex flex-col items-center bg-beige-gray lg:py-12 lg:px-12 overflow-hidden'>
          <h2 className='text-2xl'>Foster Recurring Talent Engagement</h2>
          <img src="https://clous.s3.eu-west-3.amazonaws.com/images/Clous-Peer-Retaining.webp" className="w-[70%] h-auto object-cover"></img>
          <ul className='grid grid-cols-3 gap-6 text-[#333333] mt-0'>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Keep Candidates Engaged</h3>
              <p className='text-sm'>Nurture ongoing relationships with candidates to build a talent pipeline that meets your organization's evolving needs.</p>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Deliver Exceptional Experiences</h3>
              <p className='text-sm'>Provide personalized experiences to candidates at every touchpoint, fostering loyalty and advocacy.</p>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start h-full'>
              <h3 className='gap-2 leading-none text-base'>Tailor Talent Outreach</h3>
              <p className='text-sm'>Leverage data-driven insights to personalize outreach efforts and attract top talent effectively.</p>
            </li>
          </ul>
        </section>}

        </section>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mt-12 mb-32 text-left">
        <div className="py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col">
          <MdOutlineSmartButton className="w-12 h-12 mb-4"/>
          <h3 className="font-normal text-2xl pr-8 mb-4">
            Average Application to Interview
          </h3>
          <p className="font-normal text-base">
            Track how long it takes for applicants to progress to interviews, ensuring efficiency in your hiring process.
          </p>
        </div>
        <div className="py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col">
          <MdOutlineSmartButton className="w-12 h-12 mb-4"/>
          <h3 className="font-normal text-2xl pr-8 mb-4">
            Candidate Experience
          </h3>
          <p className="font-normal text-base">
            Monitor and enhance the experience of candidates interacting with your hiring process.
          </p>
        </div>
        <div className="py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col">
          <MdOutlineSmartButton className="w-12 h-12 mb-4"/>
          <h3 className="font-normal text-2xl pr-8 mb-4">
            Job Applications per Candidate
          </h3>
          <p className="font-normal text-base">
            Gain insights into the number of applications each candidate submits, optimizing your recruitment strategy.
          </p>
        </div>
        <div className="py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col">
          <TbChevronRightPipe className="w-12 h-12 mb-4"/>
          <h3 className="font-normal text-2xl pr-8 mb-4">
            Quality of Talent Pipeline
          </h3>
          <p className="font-normal text-base">
            Assess the strength and relevance of your talent pipeline to ensure you're attracting top-notch candidates.
          </p>
        </div>
      </div>

         
          
    </section>
  );
}

