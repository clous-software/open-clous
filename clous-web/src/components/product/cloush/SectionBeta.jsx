
import React, { useState } from "react";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import NormalButton from "../../ui/NormalButton";

function SectionBeta() {
 

  const trackButtonClick = (property) => {
    mixpanel.track('Manifiesto Link', {
      Name: property,
      Property: property,
    });
  };




  return (
    <div className="px-4 lg:px-16 pt-16 lg:py-16 bg-beige-gray overflow-hidden mx-2 lg:mx-24 lg:my-16 rounded-3xl relative">
          <section className="text-center flex flex-col justify-center">

      <h2 className="text-3xl lg:text-5xl text-center font-semibold mb-4">
        18+ months of research
              </h2>
              <p className="font-normal text-base lg:text-xl mb-4">
                Our team didn&apos;t know anything about recruitment or hiring teams at the beginning. And Generative AI was just new. That&apos;s why our team worked super hard to better understand them. Now it&apos;s time for us to share that knowledge.
              </p>
<NormalButton className="inline-flex mx-auto text-lg cursor-pointer bg-primary text-secondary hover:bg-opacity-80 transition:bg-opacity delay-100 duration-300" linkUrl="https://beta.clous.app/library" target="_blank" name="Read our library"/>

<p className="text-xl font-semibold text-gray-500 mt-16 hidden lg:flex justify-center text-center">Backed us</p>
      <section className="hidden lg:flex gap-6 md:justify-center items-center mt-4">
        <img width={130} src="https://clous.s3.eu-west-3.amazonaws.com/icons/Lanzadera.png" alt="Lanzadera partners with Clous" />
        <img width={50} className="rounded-full" src="https://clous.s3.eu-west-3.amazonaws.com/icons/IAT.webp" alt="IAT partners with Clous" />
        <img width={70} src="https://clous.s3.eu-west-3.amazonaws.com/icons/MIT.webp" alt="MIT partners with Clous" />
        <img width={110} src="https://clous.s3.eu-west-3.amazonaws.com/icons/Accenture.webp" alt="Accenture partners with Clous" />
        <img width={80} className="rounded-xl" src="https://clous.s3.eu-west-3.amazonaws.com/icons/logo_babson.png" alt="Babson College partners with Clous " />

      </section>



     
    </section>
    <div className="relative lg:absolute bottom-0 right-0 w-[35rem] overflow-hidden rounded-ss-3xl rounded-br-3xl">
      <div className="relative w-[50rem]">
      <img src="https://clous.s3.eu-west-3.amazonaws.com/images/Hiring+AI+Dashboard+-+ClousH+Home.png" className="w-full h-full relative -bottom-10 rounded-3xl">
    </img>
      </div>
    

    </div>
    </div>

  );
}

export default SectionBeta;
