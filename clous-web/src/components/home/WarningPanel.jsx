
import React, { useState } from "react";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import NormalButton from "../ui/NormalButton";
import { IoGitNetworkOutline, IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineFiberSmartRecord } from "react-icons/md";
import { MdOutlineSmartButton } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import ticks from "assets/img/Ticks.png";

function WarningPanel() {
  return (
    <div className="lg:px-24 py-6 px-2 lg:py-12 mb-24 rounded-3xl relative">
      <div className="flex justify-center items-center mb-12">
        <p className="text-primary text-6xl mr-4">WARNING</p>

      <h2 className="text-3xl max-w-5xl lg:text-6xl font-semibold relative">
        You&apos;ll hate Clous if...
        <img src={ticks} className="absolute hidden w-[3rem] lg:w-[5rem] left-[68%] lg:left-[57%] bottom-12" loading="lazy"></img>
              </h2>
              </div>

              <div className="flex flex-col gap-y-8">
              <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-12 text-left">
              <div className=" py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col -rotate-3">

<h3 className="font-normal text-2xl pr-8 mb-4">
    You&apos;d rather let AI do your job
  </h3>
  <img src={ticks}></img>
  <p className="font-normal text-base">
  Chatbots acting as recruiters, AI avatars doing interviews, ... we live in a crazy world! We push towards connecting at a human level.
  </p>
</div>
<div className=" py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col rotate-2">

<h3 className="font-normal text-2xl pr-8 mb-4">
    You love being charged for job ads
  </h3>
  <img src={ticks}></img>
  <p className="font-normal text-base">
  Job advertisement is getting more expensive each time, and it's difficult to notice with so many complex metrics.
  </p>
</div>
<div className=" py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col -rotate-1">

<h3 className="font-normal text-2xl pr-8 mb-4">
    You&apos;d rather buy before you try
  </h3>
  <img src={ticks}></img>
  <p className="font-normal text-base">
    We offer a free tier where you can try the entire hiring experience, so there's no reason why you shouldn&apos;t take that to try us out.</p>
</div>
<div className=" py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden flex flex-col rotate-3">

<h3 className="font-normal text-2xl pr-8 mb-4">
    You don't care about candidate experience
  </h3>
  <img src={ticks}></img>
  <p className="font-normal text-base">
We understand that talent is the key asset of any team. For us, it&apos;s like providing value to the clients of our clients.</p>
</div>

</section>

              </div>
          
    
    </div>

  );
}

export default WarningPanel;
