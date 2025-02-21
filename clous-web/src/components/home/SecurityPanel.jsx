
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
    <main className="lg:px-48 py-6 px-2 lg:py-32 rounded-3xl relative">
      <h2 className="text-3xl max-w-5xl lg:text-6xl text-center mx-auto font-semibold mb-8 relative">
        Keep control of <br/>your talent data
        <img src={ticks} className="absolute hidden w-[3rem] lg:w-[5rem] left-[68%] lg:left-[57%] bottom-12" loading="lazy" nofollow></img>
              </h2>
              <section className="w-full text-left grid lg:grid-cols-2 grid-cols-1 flex-col gap-4 lg:gap-8 px-2 lg:px-0">

              <div className="flex pt-8 pl-8 rounded-3xl w-full gap-4">
<MdOutlinePrivacyTip className="w-12 h-12 mb-4 text-primary"/>

<div className=" rounded-3xl w-full flex flex-col relative">

<h3 className=" text-2xl pr-8 text-primary">
    Privacy controls
  </h3>
  <p className="font-normal text-base">
    Track users' actions, anonymize candidates, manage admin controls
  </p>
  
</div>


  </div>
  <div className="flex pt-8 pl-8 rounded-3xl w-full gap-4">
<CgDatabase className="w-12 h-12 mb-4 text-primary"/>

<div className=" rounded-3xl w-full flex flex-col relative">

<h3 className="text-2xl pr-8 text-primary">
    Choose your hosting location
  </h3>
  <p className="font-normal text-base">
Store data in the EU or the US depending on your needs
  </p>
  
</div>


  </div>
  <div className="flex pt-8 pl-8 rounded-3xl w-full gap-4">
<FiDatabase className="w-12 h-12 mb-4 text-primary"/>

<div className=" rounded-3xl w-full flex flex-col relative">

<h3 className="text-2xl pr-8 text-primary">
    Full access to job data
  </h3>
  <p className="font-normal text-base">
    We're developing an API so you can access your data easily
  </p>
  
</div>


  </div>
  <div className="flex pt-8 pl-8 rounded-3xl w-full gap-4">
<IoMdCodeWorking className="w-12 h-12 mb-4 text-primary"/>

<div className=" rounded-3xl w-full flex flex-col relative">

<h3 className="text-2xl pr-8 text-primary">
    Check out the source code
  </h3>
  <p className="font-normal text-base">
Audit the entire Clous codebase for compliance or just peace of mind
  </p>
  
</div>


  </div>
  
  



</section>
<ul className="flex flex-col lg:flex-row gap-12 mt-16 justify-center">
        <div className="flex gap-4 items-center justify-center">
        <img src={USflag} width="50" className="object-fit" loading="lazy" nofollow></img>
        <div>
        <p className=" text-base">
              US Cloud
              </p>
              <p className=" text-sm font-normal">
              Hosted in Virginia
              </p>
        </div>
        
          </div>
          <div className="flex gap-2 items-center justify-center">
          <img src={EUflag} width="45" className="object-cover" loading="lazy" nofollow></img>
          <div>
          <p className=" text-base">
              EU Cloud
              </p>
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
