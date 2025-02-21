import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";
import InCardButton from "../ui/InCardButton";
import { Link } from 'react-router-dom';

function Icon({ id, open }) {
  return (
    <ChevronDown className={`${open ? "rotate-180" : ""} h-8 w-8 transition-transform`} />
  );
}

const Services = () => {
  

  return (
    <main className="lg:pt-16 lg:px-24 px-4 lg:flex lg:flex-col text-center items-left">
    

       <h2 className="mb-2 text-4xl tracking-tight font-semibold mx-auto">
        Featured resources
      </h2>
      <p className="text-gray-foreground font-normal mb-8">You can view <a href="https://clous-app.notion.site/33612f28f032470798cc849a6e04ac83?v=77c0600e5e9549cda2ada4e4f8d9710f&pvs=4" target="_blank" className="text-primary font-medium cursor-pointer">all our resources</a> for more knowledge.</p>
      <section className="grid grid-cols-3 gap-6 text-left">
      <div className=" py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden">

<h3 className=" text-2xl pr-8 mb-4">
Improve your hiring with guides 
  </h3>
  <p className="font-normal text-base mb-4">
  Need help with your hiring task or topic? Our guides provide quick answers to common questions, these guides are made for you.
  </p>
  <InCardButton name="View Guides" linkUrl="https://www.clous.app/guides" target="_blank"/>
</div>
<div className=" py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden">
<h3 className=" text-2xl pr-8 mb-4">
Get started with templates
  </h3>
  <p className="font-normal text-base mb-4">
  Why not leverage the data you already have? If there was once a great candidate that you missed to follow up with them.
  </p>
  <InCardButton name="Use Templates" linkUrl="https://beta.clous.app" target="_blank"/>
</div>
{/* <div className=" py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden">

<h3 className=" text-2xl pr-8 mb-4">
For curious recruiters
  </h3>
  <p className="font-normal text-base mb-4">
  For those who love to keep up to date with hiring trends, discover what other HR teams are doing, and learn how AI can change the recruitment industry.
  </p>
  <InCardButton name="Read Threads" linkUrl="https://clous-app.notion.site/Threads-1fd9faaa3d7a4fa5b69c16b62552df9f?pvs=4" target="_blank"/>
</div> */}
<div className=" py-4 px-4 bg-beige-gray rounded-3xl w-full h-full overflow-hidden">

<h3 className=" text-2xl pr-8 mb-4">
Clous & hiring teams
  </h3>
  <p className="font-normal text-base mb-4">
  A random mix of resources about hiring and Clous. From comparing other ATS, to HR articles and updates on Clous journey. 
  </p>
  <InCardButton name="Visit Wikis" linkUrl="https://www.clous.app/clous-wiki" target="_blank"/>
</div>

      </section>
      <p className="text-gray-foreground font-normal mt-8 text-sm"> <Link className="text-primary font-medium cursor-pointer" href="https://beta.clous.app/contact" target="_blank">Let us know</Link> if there's any resource you'd like to have.</p>

     </main>
  );
}

export default Services;
