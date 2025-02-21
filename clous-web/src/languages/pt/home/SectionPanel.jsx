
import React, { useState } from "react";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import { IoGitNetworkOutline, IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineFiberSmartRecord } from "react-icons/md";
import { MdOutlineSmartButton } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";

function SectionBeta() {
 

  const trackButtonClick = (property) => {
    mixpanel.track('Manifiesto Link', {
      Name: property,
      Property: property,
    });
  };




  return (
    <div className="lg:px-24 lg:py-32 mb-16 rounded-3xl relative">
      <h2 className="text-3xl max-w-5xl lg:text-6xl text-left font-semibold mb-8">
      Seu recrutamento
 <br/>aprimorado com IA
              </h2>
              <div className="flex flex-col gap-y-8">
              <section className="w-full text-left flex lg:flex-row flex-col gap-8 px-2 lg:px-0">

<div className="bg-beige-gray pt-8 pl-8 rounded-3xl lg:w-2/5 w-full overflow-hidden flex flex-col justify-between mt-24">
<h3 className="font-normal text-2xl pr-8">
O ChatGPT e outras ferramentas de IA não são feitos para recrutadores
    </h3>
<div className="relative bottom-0 right-0 w-[35rem] overflow-hidden rounded-ss-xl rounded-br-xl">
<div className="relative w-[50rem]">
<img src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="Clous Peer Recruitment Assistant by Clous" className="w-full h-full relative -bottom-10 rounded-3xl">
</img>
</div>
</div>
    


</div>
<div className="pt-8 rounded-3xl w-full lg:w-3/5 overflow-hidden flex flex-col gap-8">
 {/* <h3 className="font-normal text-2xl pr-8 mb-6">
    Draft and send personalized emails to candidates in just 2 clicks, using your day to day language
  </h3>
  <div className="relative overflow-hidden rounded-ss-3xl justify-end flex rounded-br-3xl h-full">
    <div className="relative flex h-full w-full">
      <img src="https://clous.s3.eu-west-3.amazonaws.com/images/JobOpeningEditor.webp" alt="ClousH Job Editor with AI by Clous" className="h-[28rem] w-[50rem] relative top-0 -right-10 object-cover rounded-xl" />
    </div>
    </div>*/}

<div className="bg-beige-gray pt-8 pl-8 rounded-3xl w-full h-4/6 overflow-hidden flex flex-col relative">
<MdOutlineFiberSmartRecord className="w-12 h-12 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
Recrute de forma mais inteligente, não mais difícil
  </h3>
  <p className="font-normal text-lg">
  Crie descrições de emprego e publique uma vaga em apenas 4 cliques. Sem a complicação de perguntar ao ChatGPT e gastar 20 minutos editando. Em vez de usar 4+ ferramentas para gerenciar seus empregos, use o Clous.

  </p>
  <div className=" bottom-0 ml-auto w-[30rem] overflow-hidden rounded-xl">
<div className="relative w-[30rem]">
<img src="https://clous.s3.eu-west-3.amazonaws.com/images/JobOpeningEditor.webp" alt="AI Qualified Candidates Schedule by Clous" className="w-full h-full relative -bottom-10 -right-10 rounded-3xl">
</img>
</div>
</div>
</div>
<div className="bg-beige-gray py-8 pl-8 rounded-3xl w-full h-2/6 overflow-hidden flex flex-col">
<h3 className="font-normal text-2xl pr-8 mb-4">
+100 idiomas suportados
  </h3>
  <p className="font-normal text-lg">
  Você escreve no seu idioma e nossa plataforma responde na mesma língua. O talento é global. Isso significa que você precisa aprender todos os idiomas do mundo? Se você usar o Clous, não precisa.

  </p>
</div> 


  </div>



</section>
<section className="w-full text-left flex flex-col lg:flex-row gap-8 px-2 lg:px-0">
<div className=" rounded-3xl w-full lg:w-3/5 overflow-hidden flex flex-col gap-8">
<div className=" py-8 pl-8 bg-beige-gray rounded-3xl w-full h-1/2 overflow-hidden flex flex-col">
<MdOutlineSmartButton className="w-12 h-12 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
Pipeline de talentos no modo automático
  </h3>
  <p className="font-normal text-lg">
  Por que não aproveitar os dados que você já tem? Se houve um ótimo candidato que você perdeu de acompanhar, você pode redescobri-lo com o Clous e enviar e-mails personalizados em apenas alguns cliques.
  </p>
</div>
<div className="bg-beige-gray py-8 pl-8 rounded-3xl w-full h-1/2 overflow-hidden flex flex-col">
<IoPlayCircleOutline className="w-11 h-11 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
Talento engajado, nosso objetivo
  </h3>
  <p className="font-normal text-lg">
  É de partir o coração ver recrutadores tendo que perseguir candidatos como se fossem vendedores. Vamos ajudá-lo a engajar talentos e espalhar a palavra sobre suas oportunidades de emprego fantásticas.
  </p>
</div> 
    


</div>

<div className="bg-beige-gray pt-8 pl-8 rounded-3xl w-full lg:w-2/5 overflow-hidden flex flex-col items-between justify-between">
  <div className="flex flex-col">
  <FaRegCalendarCheck className="w-10 h-10 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
Permita que os candidatos agendem e entrevistem talentos qualificados
  </h3>
  </div>

<div className="relative bottom-0 right-0 w-[35rem] overflow-hidden rounded-xl">
<div className="relative w-[30rem]">
<img src="https://clous.s3.eu-west-3.amazonaws.com/images/CandidateSchedules.webp" alt="AI Qualified Candidates Schedule by Clous" className="w-full h-full relative -bottom-10 rounded-3xl">
</img>
</div>
</div>
    


</div>




</section>
              </div>
          
    
    </div>

  );
}

export default SectionBeta;
