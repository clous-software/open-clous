
import React, { useState } from "react";
import ticks from "assets/img/Ticks.png";
import USflag from "assets/img/USFlag.png";
import EUflag from "assets/img/EUFlag.png";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { CgDatabase } from "react-icons/cg";
import { FiDatabase } from "react-icons/fi";
import { IoMdCodeWorking } from "react-icons/io";

function SecurityPanel() {
  return (
    <main className="lg:px-48 py-6 px-2 py-24 mt-32 lg:mt-12 rounded-3xl relative">
      <h2 className="text-3xl max-w-5xl lg:text-6xl text-center mx-auto font-semibold mb-8 relative">
        Mantén el control de <br/> tus datos de talento
        <img src={ticks} className="absolute hidden w-[3rem] lg:w-[5rem] left-[68%] lg:left-[57%] bottom-12" loading="lazy" nofollow></img>
              </h2>
              <section className="w-full text-left grid lg:grid-cols-2 grid-cols-1 flex-col gap-4 lg:gap-8 px-2 lg:px-0">

              <div className="flex pt-8 pl-8 rounded-3xl w-full gap-4">
<MdOutlinePrivacyTip className="w-12 h-12 mb-4 text-primary"/>

<div className=" rounded-3xl w-full flex flex-col relative">

<h3 className="font-normal text-2xl pr-8 text-primary">
    Controles de privacidad
  </h3>
  <p className="font-normal text-base">
  Rastrea las acciones de los usuarios, anonimiza a los candidatos, gestiona los controles administrativos  </p>
  
</div>


  </div>
  <div className="flex pt-8 pl-8 rounded-3xl w-full gap-4">
<CgDatabase className="w-12 h-12 mb-4 text-primary"/>

<div className=" rounded-3xl w-full flex flex-col relative">

<h3 className="font-normal text-2xl pr-8 text-primary">
    Elige tu ubicación de &apos;hosting&apos;
  </h3>
  <p className="font-normal text-base">
  Almacena los datos en la UE o en EEUU en función de tus necesidades
  </p>
  
</div>


  </div>
  <div className="flex pt-8 pl-8 rounded-3xl w-full gap-4">
<FiDatabase className="w-12 h-12 mb-4 text-primary"/>

<div className=" rounded-3xl w-full flex flex-col relative">

<h3 className="font-normal text-2xl pr-8 text-primary">
    Acceso completo a datos de empleo
  </h3>
  <p className="font-normal text-base">
  Estamos desarrollando una API para que puedas acceder fácilmente a tus datos
  </p>
  
</div>


  </div>
  <div className="flex pt-8 pl-8 rounded-3xl w-full gap-4">
<IoMdCodeWorking className="w-12 h-12 mb-4 text-primary"/>

<div className=" rounded-3xl w-full flex flex-col relative">

<h3 className="font-normal text-2xl pr-8 text-primary">
Consulta el código fuente
  </h3>
  <p className="font-normal text-base">
  Revisa todo el código de Clous para garantizar el cumplimiento de la normativa o simplemente para tu tranquilidad
  </p>
  
</div>


  </div>
  
  



</section>
<ul className="flex flex-col lg:flex-row gap-12 mt-16 justify-center">
        <div className="flex gap-4 items-center justify-center">
        <img src={USflag} width="50" className="object-fit" loading="lazy" nofollow></img>
        <div>
        <h4 className=" text-base">
              US Cloud
              </h4>
              <p className=" text-sm font-normal">
              Hosted in Virginia
              </p>
        </div>
        
          </div>
          <div className="flex gap-2 items-center justify-center">
          <img src={EUflag} width="45" className="object-cover" loading="lazy" nofollow></img>
          <div>
          <h4 className=" text-base">
              EU Cloud
              </h4>
              <p className=" text-sm font-normal">
              Hosted in Paris
              </p>
        </div>
          
          </div>

        </ul>
          
    
    </main>

  );
}

export default SecurityPanel;
