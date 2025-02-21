
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
        Your recruitment <br/>augmented with AI
              </h2>
              <div className="flex flex-col gap-y-8">
              <section className="w-full text-left flex lg:flex-row flex-col gap-8 px-2 lg:px-0">

<div className="bg-beige-gray pt-8 pl-8 rounded-3xl lg:w-2/5 w-full overflow-hidden flex flex-col justify-between mt-24">
<h3 className="font-normal text-2xl pr-8">
      ChatGPT and other AI tools are not built for recruiters
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
    Recruit smarter, not harder
  </h3>
  <p className="font-normal text-lg">
  Create job descriptions and publish a job opening in just 4 clicks. Without the hassle of asking ChatGPT and spend 20 minutes editing it. Instead of using 4+ tools to manage your jobs, use Clous.

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
    +100 languages supported
  </h3>
  <p className="font-normal text-lg">
  You write in your language and our platform replies back in that same language. Talent is global. Does it mean you have to learn every language in the world? If you use Clous, you don't.

  </p>
</div> 


  </div>



</section>
<section className="w-full text-left flex flex-col lg:flex-row gap-8 px-2 lg:px-0">
<div className=" rounded-3xl w-full lg:w-3/5 overflow-hidden flex flex-col gap-8">
<div className=" py-8 pl-8 bg-beige-gray rounded-3xl w-full h-1/2 overflow-hidden flex flex-col">
<MdOutlineSmartButton className="w-12 h-12 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
    Talent pipeline on <em>auto</em> mode
  </h3>
  <p className="font-normal text-lg">
  Why not leverage the data you already have? If there was once a great candidate that you missed to follow up with them, you can rediscover it with Clous and send personalized emails in just clicks.
  </p>
</div>
<div className="bg-beige-gray py-8 pl-8 rounded-3xl w-full h-1/2 overflow-hidden flex flex-col">
<IoPlayCircleOutline className="w-11 h-11 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
    Engaged talent, our goal
  </h3>
  <p className="font-normal text-lg">
    It breaks our heart to see recruiters having to pursue candidates like they are salespeople. We will help you engage talent and spread the word of your fantastic job opportunities.
  </p>
</div> 
    


</div>

<div className="bg-beige-gray pt-8 pl-8 rounded-3xl w-full lg:w-2/5 overflow-hidden flex flex-col items-between justify-between">
  <div className="flex flex-col">
  <FaRegCalendarCheck className="w-10 h-10 mb-4"/>

<h3 className="font-normal text-4xl pr-8 mb-4">
    Let candidates schedule and interview qualified talent
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
