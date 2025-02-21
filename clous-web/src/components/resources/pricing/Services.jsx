import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import SectionTable from "./SectionTable";
import { CameraOff, Cpu, Gift, ChevronDown , ShieldOff, UserX } from "lucide-react";
import { Link } from "react-router-dom";
import TextButtonWhite from "components/ui/TextButtonWhite";
import { FiExternalLink } from "react-icons/fi";

function Icon({ id, open }) {
  return (
    <ChevronDown className={`${open ? "rotate-180" : ""} h-8 w-8 transition-transform`} />
  );
}

const Services = () => {
  

  return (
    <main className="lg:py-24 lg:px-24 px-4 lg:flex justify-between text-left items-left">

       
      <section className="flex flex-col gap-1">
      <h2 className="mb-2 text-lg tracking-tight font-semibold max-w-4xl">
        We like Vlogging
      </h2>
        <ul className=" flex flex-col text-left items-left rounded-xl">
          <li className="cursor-pointer mt-2 flex text-xl lg:text-3xl">
          <Link to="https://beta.clous.app/disclosures/f0818132-9131-4579-bfda-c86371993ee5" target="_blank" className="font-semibold underAnimation">
          <h3 className="mr-2">Ensuring AI Safety to Enterprises</h3>
        </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-2 text-left items-left rounded-xl ">
          <li className="cursor-pointer mt-2 flex text-xl lg:text-3xl">
          <Link to="https://beta.clous.app/disclosures/89dfb359-0e34-4f2f-a700-a0d5a7f85c95" target="_blank" className="font-semibold underAnimation">
          <h3 className="mr-2">ClousH Beta Underway</h3>
        </Link>
          </li>
        
        </ul>
        <ul className="flex flex-col gap-2 text-left items-left rounded-xl">
          <li className="cursor-pointer mt-2 flex text-xl lg:text-3xl">
          <Link to="https://beta.clous.app/disclosures/c63c8529-c1e8-4e9b-bc9b-fb9b729a0b33" target="_blank" className="font-semibold underAnimation">
          <h3 className="mr-2">Demo is Now Accessible</h3>
        </Link>
          </li>
    
        </ul>
        <ul className="flex flex-col gap-2 text-left items-left rounded-xl ">
          <li className="cursor-pointer mt-2 flex text-xl lg:text-3xl">
          <Link to="https://beta.clous.app/disclosures/f2e21fe4-7026-40b5-a1e6-b58ff29e0e01" target="_blank" className="font-semibold underAnimation">
          <h3 className="mr-2">ClousH Prototype is Ready</h3>
        </Link>
          </li>
    
        </ul>
      </section>
      <Link to="https://beta.clous.app/roi" target="_blank" className="bg-primary rounded-3xl p-8 w-[30%] text-secondary group relative">
          <h2 className="text-2xl">
            Calculate how much<br/> you actually save
          </h2>
          <p className="text-sm font-normal">
          Time is valuable. We know that, right? Don't waste in tasks that don't add any value. Focus on what&apos;s really important. 
          </p>
          <FiExternalLink className="w-6 h-6 text-secondary absolute -right-6 -top-6 group-hover:right-7 group-hover:top-8 transition-hover duration-500 delay-150"/>

        </Link>

     </main>
  );
}

export default Services;
