
import React, { useState } from "react";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { FaArrowUp } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import NormalButton from "../../ui/NormalButton";

function SectionManifestos() {
  const [cursorPosition1, setCursorPosition1] = useState({ x: -1000, y: -1000 });
  const [cursorPosition2, setCursorPosition2] = useState({ x: -1000, y: -1000 });
  const [cursorPosition3, setCursorPosition3] = useState({ x: -1000, y: -1000 });
  const [cursorPosition4, setCursorPosition4] = useState({ x: -1000, y: -1000 });
  const [cursorPosition5, setCursorPosition5] = useState({ x: -1000, y: -1000 });

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


  return (
    <div className="hidden lg:flex lg:flex-col py-32 rounded-3xl relative bg-beige-gray mx-24 px-12">
      {/* <h2 className="text-base lg:text-lg text-right pr-24 font-semibold mb-4">
        The Clous Manifestos
              </h2> */}

<section className="text-center flex flex-col justify-center">

<h2 className="text-3xl lg:text-5xl text-center font-semibold mb-4">
  18+ months of research
        </h2>
        <p className="font-normal text-base lg:text-xl mb-4">
          Our team didn&apos;t know anything about recruitment or hiring teams at the beginning. And Generative AI was just new. That&apos;s why our team worked super hard to better understand them. Now it&apos;s time for us to share that knowledge.
        </p>
<NormalButton className="inline-flex mx-auto bg-primary text-secondary hover:bg-opacity-80 transition:bg-opacity delay-100 duration-300" linkUrl="https://join.slack.com/t/clouscommunity/shared_invite/zt-2g0jfas4z-wWJdlfVF_1wGAz85~sQWfw" target="_blank" name="Join our community"/>

<p className="text-xl font-medium text-dark-gray mt-16 hidden lg:flex justify-center text-center">Backed us</p>
<section className="hidden lg:flex gap-6 md:justify-center items-center mt-4">
  <img width={130} src="https://clous.s3.eu-west-3.amazonaws.com/icons/Lanzadera.png" alt="Lanzadera partners with Clous" />
  <img width={50} className="rounded-full" src="https://clous.s3.eu-west-3.amazonaws.com/icons/IAT.webp" alt="IAT partners with Clous" />
  <img width={70} src="https://clous.s3.eu-west-3.amazonaws.com/icons/MIT.webp" alt="MIT partners with Clous" />
  <img width={110} src="https://clous.s3.eu-west-3.amazonaws.com/icons/Accenture.webp" alt="Accenture partners with Clous" />
  <img width={80} className="rounded-xl" src="https://clous.s3.eu-west-3.amazonaws.com/icons/logo_babson.png" alt="Babson College partners with Clous " />

</section>




</section>
              

    <section className="grid grid-col-1 text-right hidden">

<Link
        to="https://clous-app.notion.site/Environmental-responsibility-72dc7ca14fed41f084fd6577dca5b74b?pvs=4"
        target="_blank"
        className="relative group transition duration-300 delay-200 group-hover:shadow-xl py-8 hover:border-b-2 hover:border-primary hover:bg-beige-gray"
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
              src="https://clous.s3.eu-west-3.amazonaws.com/images/manifestos/Image+Sustainability.jpg"
              alt="Clous Culture values Sustainability – Clous Mission Manifestos"
            />
          </div>
          <div className="justify-between w-full items-center relative z-14 flex pr-24 pl-24 group-hover:pl-4">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-12 h-12 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-4 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Sustainability
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2022
            </p>
            </div>
            
            </div>
            
            <h3 className="text-5xl ">Environmental responsibility</h3>
          </div>
        </div>
      </Link>

      <Link
        to="https://clous-app.notion.site/Secure-tech-development-155c6db2ff514b1e8d0a8a164c785594?pvs=4"
        target="_blank"
        className="relative group transition duration-500 group-hover:shadow-xl py-8 hover:border-b-2 hover:border-primary hover:bg-beige-gray"
        onClick={() => trackButtonClick("Tech Development")}
        onMouseMove={handleHover2}
        onMouseOut={handleMouseOut2}
      >
        <div className=" relative">
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
              src="https://clous.s3.eu-west-3.amazonaws.com/images/manifestos/Image+Ethical+AI+.jpg"
              alt="Clous Culture values Ethical AI  – Clous Mission Manifestos"
            />
          </div>
          <div className="justify-between items-center relative z-14 px-24 flex pr-24 pl-24 group-hover:pl-4">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-12 h-12 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-2 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Artificial intelligence
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2023
            </p>
            </div>
            
            </div>
            <h3 className="text-5xl ">Secure tech development</h3>
          </div>
        </div>
      </Link>     
      <Link
        to="https://clous-app.notion.site/Unbiased-technology-0ba2a15a19e3415baac042fdcdb0e403?pvs=4"
        target="_blank"
        className="relative group transition duration-500 group-hover:shadow-xl py-8 hover:border-b-2 hover:border-primary hover:bg-beige-gray"
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
              src="https://clous.s3.eu-west-3.amazonaws.com/images/manifestos/Image+Tech+Assesment.jpg"
                alt="Clous Culture values Unbiased technology  – Clous Mission Manifestos"
            />
          </div>
          <div className="justify-between w-full items-start flex relative z-14 px-24 pr-24 pl-24 group-hover:pl-4">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-12 h-12 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-2 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Technology
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2024
            </p>
            </div>
            
            </div>
              <h3 className="text-5xl ">
                {" "}
                Unbiased technology
              </h3>
          </div>
        </div>
      </Link>
      <Link
        to="https://clous-app.notion.site/Cultural-welcome-660e7553ad064a65a6c63f8e3eb3a809?pvs=4"
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
              src="https://clous.s3.eu-west-3.amazonaws.com/images/manifestos/Image+Diversity.jpg"
              alt="Clous Culture values Diversity – Clous Mission Manifestos"
            />
          </div>
          <div className="justify-between flex items-center relative z-14 px-24 pr-24 pl-24 group-hover:pl-4">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-12 h-12 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-2 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Diversity
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2022
            </p>
            </div>
            
            </div>
              <h3 className="text-5xl ">
                {" "}
                Cultural welcome
              </h3>
          </div>
        </div>
      </Link>
      <Link
        to="https://clous-app.notion.site/People-centric-687aaa8cff1b4aa6838e69bef2adb2cd?pvs=4"
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
              src="https://clous.s3.eu-west-3.amazonaws.com/images/manifestos/Image+Equality.jpeg"
              alt="Clous Culture values Equality – Clous Mission Manifesto"
              />
          </div>
          <div className="justify-between flex items-center relative z-14 px-24 pr-24 pl-24 group-hover:pl-4">
          <div className="inline-flex">
            <IoIosArrowDropleftCircle className=" w-12 h-12 text-[#ABABAB] group-hover:flex hidden"/>
            <div className="ml-2 group-hover:ml-8">
            <p className="text-left text-2xl font-medium">
              Equality
            </p>
            <p className="font-normal text-dark-gray text-left text-xl">
              2023
            </p>
            </div>
            
            </div>
              <h3 className="text-5xl ">
                {" "}
                People centric
              </h3>
          </div>
        </div>
      </Link>
    </section>
  
    </div>

  );
}

export default SectionManifestos;
