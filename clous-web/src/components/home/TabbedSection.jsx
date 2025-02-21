import { FileText, MessageCircle, UserPlus } from 'lucide-react';
import React, { useState, useEffect} from 'react';
import mixpanel from "mixpanel-browser";
import NormalButton from '../ui/NormalButton';
import FeatureCard from "../ui/FeatureCard";
import involveOne from "assets/img/involve-team.json";
import involveTwo from "assets/img/involve-team-v2.json";
import costs from "assets/img/costs.json";
import action from "assets/img/action.json";
import saveHours from "assets/img/save-hours.json";
import recurring from "assets/img/recurring.json";
import schedule from "assets/img/schedule.json";
import share from "assets/img/share.json";
import talent from "assets/img/talent.json";
import Lottie from "lottie-react";
import { RiHomeSmileLine } from "react-icons/ri";
import { LuScale3D } from "react-icons/lu";
import { GrGrow } from "react-icons/gr";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isVisible, setIsVisible] = useState([false, false, false, false, false, false, false, false, false, false, false]);
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
    <main className="mb-16 lg:flex px-2 lg:px-24 justify-between lg:gap-16"> {/* Necesite hidden lg:visible para funcionar responsive*/}
   <div className='flex justify-between items-end'>
    <div className='flex flex-col gap-4 max-w-[40%]'>
    <h3 className="text-xl text-primary">Data that leads to improved hiring processes</h3>
    <h2 className="text-3xl lg:text-6xl">Help your team <em className='line-through'>understand</em>  hiring data</h2>
    </div>
    
    <div className="flex flex-col gap-10 max-w-[50%]">
    <h3 className='flex gap-4 text-4xl items-start'>
        <RiHomeSmileLine className='text-primary'/>
        People Ops that build dashboards every week          </h3>
      <h3 className='flex gap-4 text-4xl items-start'>
        <HiMiniArrowsUpDown className='text-primary'/>
        HRBPs reporting to business on hiring needs              </h3>
      <h3 className='flex gap-4 text-4xl items-start'>
        <LuScale3D className='text-primary'/>
        Scaleups that need to scale human capital
              </h3>
      <h3 className='flex gap-4 text-4xl items-start'>
        <GrGrow className='text-primary'/>
        Recruiters tired of their traditional ATS          </h3>
    </div>
   </div>
  <div className="bg-primary rounded-3xl px-2 py-8 lg:py-16 justify-center hidden">
    <h2 className="text-3xl lg:text-6xl text-center text-secondary font-semibold mb-8">
        If you create jobs, <br/> you&apos;re in the right place
      </h2>
      <section className="grid grid-cols-3 rounded-full font-medium border max-w-xl mx-auto bg-main-white overflow-hidden p-1 mb-8">
        <button
          className={`py-2 px-4 text-xl  flex gap-1 justify-center items-center rounded-full ${activeTab === 'tab1' ? 'bg-new-gray text-dark-gray' : 'text-dark-gray'}`}
          onClick={() => setActiveTab('tab1')}
        >Recruiters
        </button>
        <button
          className={`py-2 px-4 text-xl flex gap-1 justify-center items-center rounded-full ${activeTab === 'tab2' ? 'bg-new-gray text-dark-gray' : 'text-dark-gray'}`}
          onClick={() => setActiveTab('tab2')}
        >Hiring teams
        </button>
        <button
          className={`py-2 px-4 text-xl flex gap-1 justify-center items-center rounded-full ${activeTab === 'tab3' ? 'bg-new-gray text-dark-gray' : 'text-dark-gray'}`}
          onClick={() => setActiveTab('tab3')}
        >Businesses
        </button>
        
 
      </section>

      <section className="pt-4">
        {activeTab === 'tab1' && <section className='rounded-xl lg:flex justify-between lg:px-12 overflow-hidden' >
          
          <ul className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:min-h-[19rem] text-[#333333]'>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={involveOne}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Personalized candidate experiences</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={recurring}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Turn your candidates into recurring talent</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={saveHours}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Use your data to save hours on repetitive tasks</h3>
            </li>
                     
          </ul>
        </section> }
        {activeTab === 'tab2' && <section className=' rounded-xl lg:flex justify-between lg:px-12  overflow-hidden' >
        <ul className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[19rem] text-[#333333]'>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={involveTwo}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Share personalized feedback</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={schedule}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Schedule interviews today for tomorrow</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={talent}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Build your candidate experience</h3>
            </li>
                     
          </ul>

        </section> }
        {activeTab === 'tab3' && <section className='rounded-xl lg:flex justify-between lg:px-12  overflow-hidden' >
        <ul className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[19rem] text-[#333333]'>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={costs}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Avoid using other tools with hidden costs</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={action}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Use your data to drive actions and insights</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={share}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Streamline your hiring with every job opening</h3>
            </li>
                     
          </ul>
        </section> }
        
        
        
  </section>
  </div>
  </main>
  );
};

export default TabsSection;