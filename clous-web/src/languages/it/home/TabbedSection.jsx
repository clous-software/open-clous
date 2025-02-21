import { FileText, MessageCircle, UserPlus } from 'lucide-react';
import React, { useState, useEffect} from 'react';
import mixpanel from "mixpanel-browser";
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

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const trackButtonClick = (Property) => {
    mixpanel.track('External Link', {
    Name : Property,
    Property: Property, });
  };
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
   
  <div className="bg-primary rounded-3xl px-2 py-8 lg:py-16 justify-center">
    <h2 className="text-3xl lg:text-6xl text-center text-secondary font-semibold mb-8">
    Collega le persone a
 <br/> un percorso di carriera soddisfacente

      </h2>
      <section className="grid grid-cols-3 rounded-full font-medium border max-w-xl mx-auto bg-main-white overflow-hidden p-1 mb-8">
        <button
          className={`py-2 px-4 text-xl  flex gap-1 justify-center items-center rounded-full ${activeTab === 'tab1' ? 'bg-new-gray text-dark-gray' : 'text-dark-gray'}`}
          onClick={() => setActiveTab('tab1')}
        >Reclutatori
        </button>
        <button
          className={`py-2 px-4 text-xl flex gap-1 justify-center items-center rounded-full ${activeTab === 'tab2' ? 'bg-new-gray text-dark-gray' : 'text-dark-gray'}`}
          onClick={() => setActiveTab('tab2')}
        >Team di assunzione
        </button>
        <button
          className={`py-2 px-4 text-xl flex gap-1 justify-center items-center rounded-full ${activeTab === 'tab3' ? 'bg-new-gray text-dark-gray' : 'text-dark-gray'}`}
          onClick={() => setActiveTab('tab3')}
        >Aziende
        </button>
        
 
      </section>

      <section className="pt-4">
        {activeTab === 'tab1' && <section className='rounded-xl lg:flex justify-between lg:px-12 overflow-hidden' >
          
          <ul className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[19rem] text-[#333333]'>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={involveOne}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Crea esperienze personali per i candidati</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={recurring}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Trasforma i tuoi candidati in talenti ricorrenti</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={saveHours}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Utilizza i tuoi dati per risparmiare ore su compiti ripetitivi</h3>
            </li>
                     
          </ul>
        </section> }
        {activeTab === 'tab2' && <section className='rounded-xl lg:flex justify-between lg:px-12 overflow-hidden'>
        <ul className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[19rem] text-[#333333]'>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={involveTwo}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Condividere feedback personalizzati</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={schedule}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Pianificare colloqui per domani già oggi</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={talent}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Creare la tua esperienza candidato</h3>
            </li>
                     
          </ul>

        </section> }
        {activeTab === 'tab3' && <section className='rounded-xl lg:flex justify-between lg:px-12 overflow-hidden'>
        <ul className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[19rem] text-[#333333]'>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={costs}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Evitare di utilizzare altri strumenti con costi nascosti</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={action}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Utilizzare i tuoi dati per generare azioni e insight</h3>
            </li>
            <li className='text-lg font-medium p-4 rounded-3xl justify-start bg-main-white h-full'>
            <Lottie className='w-20 h-20' animationData={share}/>
                <h3 className='gap-2 leading-none mt-20 text-4xl'>Semplifica le tue assunzioni con ogni posizione aperta</h3>
            </li>
                     
          </ul>
        </section> }

        
        
        
  </section>
  </div>
  </main>
  );
};

export default TabsSection;