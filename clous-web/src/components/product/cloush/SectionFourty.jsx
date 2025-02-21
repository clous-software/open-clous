
import React, { useState } from "react";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { FaArrowUp } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import FeatureCard from "../../ui/FeatureCard";
import trust from "assets/img/TrustAI.png";
import candidateUX from "assets/img/CandidateUX.png";

function SectionFourty() {

  return (
    <main className="lg:py-16 lg:mt-32 py-8 px-8 lg:px-24">
      <section className="grid grid-cols-1 gap-24">
      <div className={`lg:flex lg:gap-12 transition-opacity duration-500 section-transition`}>
          <FeatureCard
            title="Hiring data that aligns your team"
            description={
              <>
We know all know that manager who demands three engineers for next week. Data is important to make informed decisions, collaboration is key to align your team on those decisions. When you detect your hiring needs early, you rise the bar of your hiring process.
</>}
          />
          <div className="relative w-full h-full">
            <img src="https://clous.s3.eu-west-3.amazonaws.com/images/Collaborative-Hiring-with-Clous-Peer.webp" className="w-full h-[22rem] object-cover rounded-2xl" alt="Collaborative AI for Hiring Teams"></img>            
          </div>
        </div>
      <div className={`lg:flex lg:gap-16 transition-opacity duration-500 section-transition`}>
      <div className="relative w-full h-auto mb-6 lg:mb-0">
            <img className="w-full h-auto max-w-2xl rounded-2xl" src="https://clous.s3.eu-west-3.amazonaws.com/images/Trust-Safety-Hiring-AI.webp" alt="Clous Peer Trust and Safety in AI Ethics" />
          </div>
          <FeatureCard
            title="Building AI applications with safety as top of mind"
            description={
              <>
                Concerned about the integrity and safety of AI applications? Our approach to Trust & Safety ensures that every part of our AI development prioritizes security and trust. We carefully design and refine our algorithms to uphold the highest standards of ethical AI for users. <br/> <br/>

With our strong commitment to Trust & Safety, rest assured that your interactions with our AI applications are safeguarded at every step of your hiring journey.
            </>}
          />
         

        </div>
        
        

        
      </section>

      
    </main>

  );
}

export default SectionFourty;
