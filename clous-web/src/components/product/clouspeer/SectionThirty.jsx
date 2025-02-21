
import { MdOutlineFiberSmartRecord } from "react-icons/md";
import React from "react";
import ticks from "assets/img/Ticks.png";
import { IoHeartDislikeOutline } from "react-icons/io5";

function Thirty() {
  return (
    <div className="lg:px-24 py-6 px-2 lg:py-32 mb-16 rounded-3xl relative">
      <h2 className="text-3xl max-w-5xl lg:text-6xl text-left font-semibold mb-8 relative">
        Reasons not to choose us
        <img src={ticks} className="absolute w-[3rem] lg:w-[5rem] left-[68%] lg:left-[74%] bottom-10" loading="lazy" alt="Ticks Icon"></img>
      </h2>
      <div className="flex flex-col gap-y-8">
        <section className="w-full text-left flex lg:flex-row flex-col gap-8 px-2 lg:px-0">

          <div className="bg-beige-gray pt-8 pl-8 rounded-3xl lg:w-2/5 w-full overflow-hidden flex flex-col justify-between mt-24">
            <h3 className="font-normal text-2xl pr-8">Lowest pricing in the market because you don't care about the details</h3>
            <div className="relative bottom-0 right-0 w-[35rem] overflow-hidden rounded-ss-xl rounded-br-xl">
              <div className="relative w-[50rem] pl-10">
                <img src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="Clous Peer Recruitment Assistant by Clous" className="w-full h-full relative -bottom-5 rounded-3xl drop-shadow-2xl" loading="lazy"></img>
              </div>
            </div>
          </div>

          <div className="pt-8 rounded-3xl w-full lg:w-3/5 overflow-hidden flex flex-col gap-8">

            <div className="bg-beige-gray pt-8 pl-8 rounded-3xl w-full h-4/6 overflow-hidden flex flex-col relative">
              <IoHeartDislikeOutline className="w-12 h-12 mb-4" />
              <h3 className="font-normal text-4xl pr-8 mb-4">Integrations are your passion</h3>
              <p className="font-normal text-lg">You live and breathe for integrations... well, you might find our platform super boring. We're all about simplicity and don't overwhelm ourselves with endless connections.</p>
              <div className="bottom-0 ml-auto w-[30rem] overflow-hidden rounded-xl">
                <div className="relative w-[30rem] pl-10">
                  <img src="https://clous.s3.eu-west-3.amazonaws.com/images/JobOpeningEditor.webp" alt="Hiring Teams Edit their Jobs with AI" className="w-full h-full relative -bottom-5 -right-5 rounded-3xl drop-shadow-2xl" loading="lazy"></img>
                </div>
              </div>
            </div>

            <div className="bg-beige-gray py-8 pl-8 rounded-3xl w-full h-2/6 overflow-hidden flex flex-col">
              <h3 className="font-normal text-2xl pr-8 mb-4">Job ads are your go-to hack</h3>
              <p className="font-normal text-lg">If you just rely on job ads to find talent, get yourself together! For a diversified talent pool you definitely need a diversified channel strategy.</p>
            </div> 

          </div>
        </section>
      </div>
    </div>
  );
}

export default Thirty;
