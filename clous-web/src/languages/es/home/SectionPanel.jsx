
import React, { useState } from "react";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import { IoGitNetworkOutline, IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineFiberSmartRecord } from "react-icons/md";
import { MdOutlineSmartButton } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import ticks from "assets/img/Ticks.png";

function SectionPanel() {
  return (
    <div className="lg:px-24 py-6 px-2 lg:py-32 mb-16 rounded-3xl relative">
      <h2 className="text-3xl max-w-5xl lg:text-6xl text-left font-semibold relative">
        Selección de talento <br/>hecho fácil
        <img src={ticks} className="absolute w-[3rem] lg:w-[5rem] left-[68%] lg:left-[60%] -top-10" loading="lazy" nofollow></img>
              </h2>
              <div className="flex flex-col gap-y-8">
              <section className="w-full text-left flex lg:flex-row flex-col gap-8 px-2 lg:px-0">

<div className="bg-beige-gray pt-8 pl-8 rounded-3xl lg:w-2/5 w-full overflow-hidden flex flex-col justify-between mt-24">
<h3 className="font-normal text-2xl pr-8">
      Las herramientas de IA no están hechas para equipos de selección de talento
    </h3>
<div className="relative bottom-0 right-0 w-[35rem] overflow-hidden rounded-ss-xl rounded-br-xl">
<div className="relative w-[50rem] pl-10">
<img src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="Clous Peer Recruitment Assistant by Clous" className="w-full h-full relative -bottom-5 rounded-3xl drop-shadow-2xl" loading="lazy">
</img>
</div>
</div>
    


</div>
<div className="pt-8 rounded-3xl w-full lg:w-3/5 overflow-hidden flex flex-col gap-8">

<div className="bg-beige-gray pt-8 pl-8 rounded-3xl w-full h-4/6 overflow-hidden flex flex-col relative">
<MdOutlineFiberSmartRecord className="w-12 h-12 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
    Tus datos en un solo sitio
  </h3>
  <p className="font-normal text-lg">
  ¿Tienes los datos de candidatos en 4 herramientas distintos? ¿Son datos que nadie utiliza? Usando una sola herramienta para todo el proceso de selección, podrás ganar perspectiva sobre información que de verdad importa.
  </p>
  <div className=" bottom-0 ml-auto w-[30rem] overflow-hidden rounded-xl">
<div className="relative w-[30rem] pl-10">
<img src="https://clous.s3.eu-west-3.amazonaws.com/images/JobOpeningEditor.webp" alt="Hiring Teams Edit their Jobs with AI" className="w-full h-full relative -bottom-5 -right-5 rounded-3xl drop-shadow-2xl" loading="lazy">
</img>
</div>
</div>
</div>
<div className="bg-beige-gray py-8 pl-8 rounded-3xl w-full h-2/6 overflow-hidden flex flex-col">
<h3 className="font-normal text-2xl pr-8 mb-4">
    20+ casos de uso
  </h3>
  <p className="font-normal text-lg">
  Durante los últimos 14 meses hemos trabajado de cerca con expertos de selección para conseguir los casos de uso más útiles. Nuestra misión es hacer la IA accesible a cualquier persona decidida por crear empleo.

  </p>
</div> 


  </div>



</section>
<section className="w-full text-left flex flex-col lg:flex-row gap-8 px-2 lg:px-0">
<div className=" rounded-3xl w-full lg:w-3/5 overflow-hidden flex flex-col gap-8">
<div className=" py-8 pl-8 bg-beige-gray rounded-3xl w-full h-1/2 overflow-hidden flex flex-col">
<MdOutlineSmartButton className="w-12 h-12 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
    Conocimiento de expertos <em>en tu bolsillo</em>
  </h3>
  <p className="font-normal text-lg">
  Why not leverage the data you already have? If there was once a great candidate that you missed to follow up with them, you can rediscover it with Clous and send personalized emails in just clicks.
  </p>
</div>
<div className="bg-beige-gray py-8 pl-8 rounded-3xl w-full h-1/2 overflow-hidden flex flex-col">
<IoPlayCircleOutline className="w-11 h-11 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
Talento involucrado, nuestra misión
  </h3>
  <p className="font-normal text-lg">
  Nos rompe el corazón ver cómo los profesionales de selección tienen que perseguir a los candidatos como si fueran vendedores. Nosotros te ayudamos a atraer talento y a compartir tus oportunidades de empleo.
  </p>
</div> 
    


</div>

<div className="bg-beige-gray pt-8 pl-8 rounded-3xl w-full lg:w-2/5 overflow-hidden flex flex-col items-between justify-between">
  <div className="flex flex-col">
  <FaRegCalendarCheck className="w-10 h-10 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
    Añade a compañeros y empieza a colaborar en equipo
  </h3>
  </div>

<div className="relative bottom-0 right-0 w-[35rem] overflow-hidden rounded-xl">
<div className="relative w-[30rem] pl-10">
<img src="https://clous.s3.eu-west-3.amazonaws.com/images/CandidateSchedules.webp" alt="AI Qualified Candidates Schedule by Clous" className="w-full h-full relative -bottom-5 rounded-3xl drop-shadow-2xl" loading="lazy">
</img>
</div>
</div>
    


</div>




</section>
              </div>
          
    
    </div>

  );
}

export default SectionPanel;
