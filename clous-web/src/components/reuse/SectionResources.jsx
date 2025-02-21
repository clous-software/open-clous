
import React, { useState } from "react";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import NormalButton from "../ui/NormalButton";

import { FiExternalLink } from "react-icons/fi";

function SectionBeta() {

  return (
    <main className="mt-16">

    
    <Link to="https://www.clous.app/editorial" target="_blank" className="px-4 lg:px-16 pb-4 pt-4 bg-beige-gray mx-2 lg:mx-24 rounded-3xl relative hidden lg:flex group overflow-hidden cursor-pointer">
      <img src="https://clous.s3.eu-west-3.amazonaws.com/images/ResourcesImage.png" className="w-full max-w-4xl mx-auto rounded-3xl" loading="lazy"></img>
    

          <section className="mt-8">

      <h2 className="text-xl lg:text-3xl text-left font-semibold ">
        16+ resources to improve your hiring process
              </h2>
            


     
    </section>
    <FiExternalLink className="w-9 h-9 lg:flex hidden absolute -right-10 -top-10 group-hover:right-6 group-hover:top-12 transition-hover duration-500 delay-150"/>

    </Link>
    </main>

  );
}

export default SectionBeta;
