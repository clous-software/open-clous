import React, { useState } from "react";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { FaArrowUp } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";


function SectionManifestos() {
  const [cursorPosition1, setCursorPosition1] = useState({ x: -1000, y: -1000 });
  const [cursorPosition2, setCursorPosition2] = useState({ x: -1000, y: -1000 });
  const [cursorPosition3, setCursorPosition3] = useState({ x: -1000, y: -1000 });
  const [cursorPosition4, setCursorPosition4] = useState({ x: -1000, y: -1000 });
  const [cursorPosition5, setCursorPosition5] = useState({ x: -1000, y: -1000 });
  const [cursorPosition6, setCursorPosition6] = useState({ x: -1000, y: -1000 });

  const trackButtonClick = (property) => {
    mixpanel.track('Manifiesto Link', {
      Name: property,
      Property: property,
    });
  };

  const handleHover1 = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xOffset = 20;
    const yOffset = 20;
    const image = e.currentTarget.querySelector('.overlay');

    setCursorPosition1({
      x: e.clientX - rect.left - xOffset,
      y: e.clientY - rect.top - yOffset,
    });
  };

  const handleMouseOut1 = () => {
    setCursorPosition1({ x: -1000, y: -1000 });
  };
  const handleHover2 = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xOffset = 20;
    const yOffset = 20;
    const image = e.currentTarget.querySelector('.overlay');

    setCursorPosition2({
      x: e.clientX - rect.left - xOffset,
      y: e.clientY - rect.top - yOffset,
    });
  };

  const handleMouseOut2 = () => {
    setCursorPosition2({ x: -1000, y: -1000 });
  };
  const handleHover3 = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xOffset = 20;
    const yOffset = 20;
    const image = e.currentTarget.querySelector('.overlay');


    setCursorPosition3({
      x: e.clientX - rect.left - xOffset,
      y: e.clientY - rect.top - yOffset,
    });
  };

  const handleMouseOut3 = () => {
    setCursorPosition3({ x: -1000, y: -1000 });
  };
  const handleHover4 = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xOffset = 20;
    const yOffset = 20;
    const image = e.currentTarget.querySelector('.overlay');


    setCursorPosition4({
      x: e.clientX - rect.left - xOffset,
      y: e.clientY - rect.top - yOffset,
    });
  };

  const handleMouseOut4 = () => {
    setCursorPosition4({ x: -1000, y: -1000 });
  };
  const handleHover5 = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xOffset = 20;
    const yOffset = 20;
    const image = e.currentTarget.querySelector('.overlay');

    setCursorPosition5({
      x: e.clientX - rect.left - xOffset,
      y: e.clientY - rect.top - yOffset,
    });
  };
  const handleMouseOut5 = () => {
    setCursorPosition5({ x: -1000, y: -1000 });
  };
  
  const handleHover6 = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xOffset = 20;
    const yOffset = 20;
    const image = e.currentTarget.querySelector('.overlay');

    setCursorPosition6({
      x: e.clientX - rect.left - xOffset,
      y: e.clientY - rect.top - yOffset,
    });
  };

  const handleMouseOut6 = () => {
    setCursorPosition6({ x: -1000, y: -1000 });
  };


  return (
    <div className=" py-32 rounded-3xl relative hidden lg:flex lg:flex-col">
      <h2 className="text-base lg:text-lg text-right pr-24 font-semibold mb-4">
        Join our partnership programs
              </h2>

    <section className="grid grid-col-1 text-right">

<Link
        to="https://clous-app.notion.site/Hiring-Co-creators-68e07ddff8da453daa70a2ad573852e9?pvs=4"
        target="_blank"
        className="relative transition duration-500 group group-hover:shadow-xl py-8 border-b-2 hover:border-primary hover:bg-beige-gray"
        onClick={() => trackButtonClick("Sustainability")}
        onMouseMove={handleHover1}
        onMouseOut={handleMouseOut1}
      >
        <div className=" relative">
          <div
            className="overlay rounded-xl absolute w-[25rem] h-[25rem] z-3"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${cursorPosition1.x}px, ${cursorPosition1.y}px)`,
              display: cursorPosition1.x !== -1000 && cursorPosition1.y !== -1000 ? "block" : "none",
            }}
          >
            <img
              className="rounded-2xl z-5 w-full h-full object-cover"
              src="https://clous.s3.eu-west-3.amazonaws.com/images/partners/Co-create.jpeg"
              alt="Hiring Co-creators Partners – Clous Hiring Partners"
              loading="lazy"
            />
          </div>
          <div className="justify-between w-full items-center relative z-14 flex px-24 pr-24 pl-24 group-hover:pl-4">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-14 h-14 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-4 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Experts
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2023
            </p>
            </div>
            
            </div>
            <h3 className="text-5xl ">Build with Clous</h3>
          </div>
        </div>
      </Link>

      <Link
        to="https://clous-app.notion.site/Solution-Partners-2b31b5b9fc544bcaa0d9ff986434d7d1?pvs=4"
        target="_blank"
        className="relative transition duration-500 group group-hover:shadow-xl py-8 hover:border-b-2 hover:border-primary hover:bg-beige-gray"
        onClick={() => trackButtonClick("Tech Development")}
        onMouseMove={handleHover2}
        onMouseOut={handleMouseOut2}
      >
        <div className="  relative">
          <div
            className="overlay rounded-xl absolute w-[25rem] h-[25rem] z-3"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${cursorPosition2.x}px, ${cursorPosition2.y}px)`,
              display: cursorPosition2.x !== -1000 && cursorPosition2.y !== -1000 ? "block" : "none",
            }}
          >
            <img
              className="rounded-2xl z-5 w-full h-full object-cover"
              src="https://clous.s3.eu-west-3.amazonaws.com/images/partners/Solutions.jpeg"
              alt="Solution Partners  – Clous Solutions Partners"
              loading="lazy"
            />
          </div>
          <div className="justify-between items-center relative z-14 px-24 flex pr-24 pl-24 group-hover:pl-4">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-14 h-14 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-4 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Delivery
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2024
            </p>
            </div>
            
            </div>
            <h3 className="text-5xl ">Solutions partners</h3>
          </div>
        </div>
      </Link>     
      {/* <Link
        to="https://clous-app.notion.site/Ambassador-Program-9e0136b30d8d481e9828fff847641ba6?pvs=4"
        target="_blank"
        className="relative transition duration-500 group group-hover:shadow-xl py-8 hover:border-b-2 hover:border-primary hover:bg-beige-gray"
        onClick={() => trackButtonClick("Tech Development")}
        onMouseMove={handleHover3}
        onMouseOut={handleMouseOut3}
      >
        <div className=" relative">
          <div
            className="overlay rounded-xl absolute w-[25rem] h-[25rem] z-3"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${cursorPosition3.x}px, ${cursorPosition3.y}px)`,
              display: cursorPosition3.x !== -1000 && cursorPosition3.y !== -1000 ? "block" : "none",
            }}
          >
            <img
              className="rounded-2xl z-5 w-full h-full object-cover"
              src="https://clous.s3.eu-west-3.amazonaws.com/images/partners/Ambassador.jpeg"
              alt="Ambassador Program for ClousH Referrals  – Clous Ambassador Partners"
              loading="lazy"
            />
          </div>
          <div className="justify-between w-full items-start flex pr-24 pl-24 group-hover:pl-4 relative z-14 px-24">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-14 h-14 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-4 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Referral
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2022
            </p>
            </div>
            
            </div>
              <h3 className="text-5xl ">
                {" "}
                Ambassador program
              </h3>
          </div>
        </div>
      </Link> */}
      <Link
        to="https://clous-app.notion.site/Startups-Program-7d3e305c56b8420983adb24b13ca2eac?pvs=4"
        target="_blank"
        className="relative transition duration-500 group  group-hover:shadow-xl py-8 hover:border-b-2 hover:border-primary hover:bg-beige-gray"
        onClick={() => trackButtonClick("Tech Development")}
        onMouseMove={handleHover4}
        onMouseOut={handleMouseOut4}
      >
        <div className=" relative">
          <div
            className="overlay rounded-xl absolute w-[25rem] h-[25rem] z-3"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${cursorPosition4.x}px, ${cursorPosition4.y}px)`,
              display: cursorPosition4.x !== -1000 && cursorPosition4.y !== -1000 ? "block" : "none",
            }}
          >
            <img
              className="rounded-2xl z-5 w-full h-full object-cover"
              src="https://clous.s3.eu-west-3.amazonaws.com/images/partners/Startups.jpeg"
              alt="Startup Programs for Hiring Technology  – Clous Startup Partners"
              loading="lazy"
            />
          </div>
          <div className="justify-between flex pr-24 pl-24 group-hover:pl-4 items-center relative z-14 px-24">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-14 h-14 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-4 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Joint ventures
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2023
            </p>
            </div>
            
            </div>
              <h3 className="text-5xl ">
                {" "}
                Startup program
              </h3>
          </div>
        </div>
      </Link>
      {/* <Link
        to="https://clous-app.notion.site/Tech-Partners-21c7564466a84b039b13e09848aef76d?pvs=4"
        target="_blank"
        className="relative transition duration-500 group group-hover:shadow-xl py-8 hover:border-b-2 hover:border-primary hover:bg-beige-gray"
        onClick={() => trackButtonClick("Tech Development")}
        onMouseMove={handleHover5}
        onMouseOut={handleMouseOut5}
      >
        <div className=" relative">
          <div
            className="overlay rounded-xl absolute w-[25rem] h-[25rem] z-3"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${cursorPosition5.x}px, ${cursorPosition5.y}px)`,
              display: cursorPosition5.x !== -1000 && cursorPosition5.y !== -1000 ? "block" : "none",
            }}
          >
            <img
              className="rounded-2xl z-5 w-full h-full object-cover"
              src="https://clous.s3.eu-west-3.amazonaws.com/images/partners/Tech.jpeg"
              alt="Technological Development Partners  – Clous Tech Partners"
              loading="lazy"
              />
          </div>
          <div className="justify-between flex pr-24 pl-24 group-hover:pl-4 items-center relative z-14 px-24">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-14 h-14 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-4 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Development
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2024
            </p>
            </div>
            
            </div>
              <h3 className="text-2xl lg:text-5xl ">
                {" "}
                Build tech with us
              </h3>
          </div>
        </div>
      </Link> */}
      <Link
        to="https://clous-app.notion.site/Data-Partners-a17ed8f0609d45d5884c78b75738436e?pvs=4"
        target="_blank"
        className="relative transition group duration-500 group-hover:shadow-xl py-8 hover:border-b-2 hover:border-primary hover:bg-beige-gray"
        onClick={() => trackButtonClick("Tech Development")}
        onMouseMove={handleHover6}
        onMouseOut={handleMouseOut6}
      >
        <div className="  relative">
          <div
            className="overlay rounded-xl absolute w-[25rem] h-[25rem] z-3"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${cursorPosition6.x}px, ${cursorPosition6.y}px)`,
              display: cursorPosition6.x !== -1000 && cursorPosition6.y !== -1000 ? "block" : "none",
            }}
          >
            <img
              className="rounded-2xl z-5 w-full h-full object-cover"
              src="https://clous.s3.eu-west-3.amazonaws.com/images/partners/RecruitmentAgencies.jpeg"
                alt="Recruitment Agencies  – Clous Data Partners"
              />
          </div>
          <div className="justify-between flex pr-24 pl-24 group-hover:pl-4 items-center relative z-14 px-24">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-14 h-14 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-4 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Marketplace
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2024
            </p>
            </div>
            
            </div>
              <h3 className="text-2xl lg:text-5xl">
                {" "}
                Recruitment and HR agencies
              </h3>
          </div>
        </div>
      </Link>
    </section>
  
    </div>

  );
}

export default SectionManifestos;
