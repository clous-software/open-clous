import { useState } from "react";
import { ChevronRightIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { FiExternalLink } from "react-icons/fi";


export default function HeroPress() {
  const [open, setOpen] = React.useState(false);
  const [isOver, setIsOver] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };


  return (
    <main className="py-16 relative overflow-hidden lg:mx-auto text-left justify-center px-2 lg:px-0">
      <Link to="https://pitch.com/v/press-kit-en-69wb3u" target="_blank" className="group flex flex-col lg:flex-row item-center justify-between bg-primary lg:w-[60rem] lg:h-[30rem] rounded-xl mx-auto w-full text-secondary overflow-hidden"> 
      <div className="lg:w-1/2 p-6 flex flex-col justify-between h-full relative">
        <h2 className="text-5xl mb-3">
          Press Kit
        </h2>
        <p className="text-xl font-normal">
        We love media, so we created a Press Kit – a comprehensive resource for media inquiries. Access high-quality visuals, brand assets, and key information to showcase the essence of our organization. Download now for a deeper insight into our journey.
        </p>
        <FiExternalLink className="w-12 h-12 text-secondary absolute -right-12 -top-12 group-hover:right-6 group-hover:top-6 transition-hover duration-500 delay-150"/>
      </div>
      <div className="w-full lg:w-1/2 h-full relative">
      <img src="https://clous.s3.eu-west-3.amazonaws.com/images/Press+Kit+by+Clous.png" className="object-fill h-full"></img>
      </div>
    </Link>
    
    </main>
  );
}
