
import React, { useState } from "react";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import NormalButton from "../ui/NormalButton";
import { IoGitNetworkOutline, IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineFiberSmartRecord } from "react-icons/md";
import { MdOutlineSmartButton } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import ticks from "assets/img/Ticks.png";

function SectionPanel() {
  return (
    <div className="lg:px-24 py-6 px-2 lg:py-32 mb-16 rounded-3xl relative">
      <h2 className="text-3xl max-w-5xl lg:text-6xl text-left font-semibold relative">
        Hiring made <br/>easier with Peer
        <img src={ticks} className="absolute w-[3rem] lg:w-[5rem] left-[68%] lg:left-[37%] -top-10" loading="lazy" nofollow></img>
              </h2>
              <div className="flex flex-col gap-y-8">
              <section className="w-full text-left flex lg:flex-row flex-col gap-8 px-2 lg:px-0">

<div className="bg-beige-gray pt-8 pl-8 rounded-3xl lg:w-2/5 w-full overflow-hidden flex flex-col justify-between mt-24">
<h3 className=" text-2xl pr-8">
Hiring processes need informed decisions. Complex analytics make it even harder. Understand your hiring and candidate data with insights driven by AI.
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

<h3 className=" text-4xl pr-8 mb-4">
    Measure your hiring to take action
  </h3>
  <p className="font-normal text-lg pr-8">
  Measuring Applicants per Job Ad is fine. But it hardly leads you to actionable insights. We don’t measure just to measure. We do it to make informed decisions during hiring processes, to report to different stakeholders and detect your hiring needs earlier.
  </p>
  <div className=" bottom-0 ml-auto w-[30rem] overflow-hidden rounded-xl">
<div className="relative w-[30rem] pl-10">
<img src="https://clous.s3.eu-west-3.amazonaws.com/images/JobOpeningEditor.webp" alt="Hiring Teams Edit their Jobs with AI" className="w-full h-full relative -bottom-5 -right-5 rounded-3xl drop-shadow-2xl" loading="lazy">
</img>
</div>
</div>
</div>
<div className="bg-beige-gray py-8 px-8 rounded-3xl w-full h-2/6 overflow-hidden flex flex-col">
<h3 className="text-2xl pr-8 mb-4">
Drive qualitative insights from your data  </h3>
  <p className="font-normal text-lg">
  Some candidates are hard to explain. It is easy to put a score to their career history. But it is not the right insight. Talent is now global, and their skillset and your needs change fast.
  </p>
</div> 


  </div>



</section>
<section className="w-full text-left flex flex-col lg:flex-row gap-8 px-2 lg:px-0">
<div className=" rounded-3xl w-full lg:w-3/5 overflow-hidden flex flex-col gap-8">
<div className=" py-8 px-8 bg-beige-gray rounded-3xl w-full h-1/2 overflow-hidden flex flex-col">
<MdOutlineSmartButton className="w-12 h-12 mb-4"/>

<h3 className="text-4xl pr-8 mb-4">
Hiring process and data in one place  </h3>
  <p className="font-normal text-lg">
  We understand the frustration of having to juggle multiple tools and spreadsheets to manage your hiring process. It's time-consuming, inefficient, and often leads to errors and lost data.</p>
</div>
<div className="bg-beige-gray py-8 pl-8 rounded-3xl w-full h-1/2 overflow-hidden flex flex-col">
<IoPlayCircleOutline className="w-11 h-11 mb-4"/>

<h3 className="text-4xl pr-8 mb-4">
Candidate experience: non-negotiable</h3>
  <p className="font-normal text-lg">
    It breaks our heart to see recruiters having to pursue candidates like they are salespeople. We will help you engage talent and spread the word about your best job opportunities.
  </p>
</div> 
    


</div>

<div className="bg-beige-gray pt-8 px-8 rounded-3xl w-full lg:w-2/5 overflow-hidden flex flex-col items-between justify-between">
  <div className="flex flex-col">
  <FaRegCalendarCheck className="w-10 h-10 mb-4"/>

<h3 className="text-4xl pr-8 mb-4">
Align your team on your hiring needs  </h3>
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
