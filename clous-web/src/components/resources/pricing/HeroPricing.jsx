import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import { useState } from "react";
import { IoGift } from "react-icons/io5";
import line from "assets/img/Line.png";
import SectionTable from "./SectionTable";
import { Fragment } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";

export default function HeroPricing() {
  const [tooggle, setToggle] = useState('yearly');
  function Icon({ id, open }) {
    return (
      <ChevronDown className={`${open ? "rotate-180" : ""} h-8 w-8 transition-transform`} />
    );
  }
 

  const [open, setOpen] = useState(0);

  const handleOpen = (id) => {
    setOpen(open === id ? 0 : id);
  };

  const trackButtonClick = (Property) => {
    mixpanel.track('External Link', {
    Name : Property,
    Property: Property, });
  };

  const emailAddress = 'hello@clous.app';
  const subject = 'Scheduling a 1:1 demo';
  const message = 'I want to schedule a 1:1 demo, because I believe...';

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;


  return (
    <main className="pt-16 shadow-none text-center">
      <h1 className="font-semibold text-3xl lg:text-7xl mb-8 fadeOut">
        Hiring the best isn&apos;t easy,<br/> we make it easier
        <img src={line} className="absolute w-[20%] right-[30%]" loading="lazy" nofollow></img>
      </h1>
      
      <section className="mt-8 fadeIn">
        {/* <ul className={`border mx-auto p-1 rounded-full grid grid-cols-2 text-lg w-60 bg-secondary text-dark-blue-greenish font-medium  ${tooggle === 'monthly' ? 'bg-secondary text-dark-blue-greenish' : 'bg-secondary text-dark-blue-greenish'}`}>
        <li className={`py-1 cursor-pointer rounded-full  ${tooggle === 'monthly' ? 'border rounded-full bg-new-gray text-dark-gray' : 'bg-secondary text-dark-gray'}`} onClick={() => setToggle('monthly')}>

            <p className="text-xl">
             Monthly
            </p>
          </li>
          <li className={`py-1 cursor-pointer rounded-full  ${tooggle === 'yearly' ? 'border rounded-full bg-new-gray text-dark-gray' : 'bg-secondary text-dark-gray'}`} onClick={() => setToggle('yearly')}>

            <p className="text-xl">
              Yearly
            </p>
          </li>
        </ul> */}
        
      </section>
      <div className="mt-16 mb-4 flex justify-center">
          {tooggle === 'monthly' && 
            <>
       
            </>
}
{tooggle === 'yearly' && 
            <>
                      <IoGift className="w-6 h-6 text-primary" />

        <p className="text-xl ml-1 text-primary font-bold">2 months off in yearly plans</p>
       
            </>
            }
        </div>
      <section className="flex flex-col lg:flex-row gap-4 text-start">
        
        <div className="border-2 bg-primary border-primary text-white p-4 gap-2 rounded-3xl justify-start lg:w-1/3">
          <div className="flex flex-col px-3 font-normal">
            <h2 className="text-2xl font-semibold mb-4">3 Week Pilot</h2>
            {tooggle === 'monthly' && 
            <>
            <h3 className="mt-2 text-5xl font-semibold"> 89€ </h3>     
            <div className="flex text-lg font-semibold">
            <p >per month</p>
            </div>
            
       
            </>
            }
            {tooggle === 'yearly' && <>
            <h3 className="mt-2 text-5xl font-semibold"> Contact us </h3>     
            <div className="flex text-lg font-semibold">
            <p>We&apos;ll onboard you personally</p>
            </div>
            
            
            </>
            }
            <p className="text-base font-normal mt-4">
              {" "}
              <strong>Pilot</strong> includes the following:{" "}
            </p>

            <div className="grid grid-cols-5 pt-2 gap-y-2 text-base font-normal">
              <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">Up to 1 live job opening</span>
              </div>
              <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">
                  Invite unlimited team members{" "}
                </span>
              </div>
              <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">
                  24/7 customer support by Pablo{" "}
                </span>
              </div>
              <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">
                Dedicated Success Engineer{" "}
                </span>
              </div>
              
            </div>
            <Link
              to="https://beta.clous.app/" target="_blank"
              onClick={() => trackButtonClick("Demo")}
              className="mt-4 w-full rounded-full text-center my-2 text-lg font-semibold py-2.5 px-3.5 bg-secondary text-primary hover:bg-opacity-90
        "
            >
              Get started
            </Link>
          </div>
        </div>
        {/* <div className="border-2 p-4 gap-2 rounded-b-3xl justify-start relative mt-8 lg:mt-0 lg:w-1/3 bg-primary text-white">
          <p className="absolute border-2 border-b-0 py-1.5 px-8 bg-primary text-white rounded-t-3xl -top-9 -left-0.5 -right-0.5 text-dark-blue-greenish">
            Most popular
          </p>
          <div className="flex flex-col">

          <div className="flex flex-col px-3 font-normal align-between pr-12">
            <div className="flex flex-col">
            <h2 className="text-4xl font-semibold mb-4">Teams</h2>
            {tooggle === 'monthly' && 
            <>
            <h3 className="mt-2 text-5xl font-semibold"> 170€ </h3>     
            <div className="flex text-lg font-semibold">
            <p >per month</p>
            </div>
            
       
            </>
            }
            {tooggle === 'yearly' && <>
            <h3 className="mt-2 text-5xl font-semibold"> 136€ </h3>     
            <div className="flex text-lg font-semibold">
            <p>per month</p>
            </div>
            
            
            </>
            }
            </div>
            <div className="flex flex-col">
            <p className="text-base font-normal mt-4">
              {" "}
              Includes everything in <strong>Starter, plus:</strong>{" "}
            </p>

            <div className="grid grid-cols-5 text-base mt-2 gap-y-2 font-normal">
              <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1"> Up to 3 live job opening</span>
              </div>
              <div className="col-span-8  flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">Unlimited data imports</span>
              </div>

              <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">Unlimited chat threads</span>
              </div>
              <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">Consulting services included</span>
              </div>
            </div>
            </div>
            </div>
            <Link
            to="https://beta.clous.app/waitlist"
              className="mt-4 my-2 rounded-full text-center text-lg font-semibold py-2.5 px-3.5 bg-secondary text-primary hover:bg-gray-100
       "
            >
              Talk with us
            </Link>
          </div>
        </div> */}
        <div className="border-2 p-4 gap-2 rounded-3xl justify-start relative lg:w-2/3">
          
          <div className="flex flex-col">

          <div className="flex flex-col px-3 font-normal justify-between pr-12">
            <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Full Plan</h2>
            
            <h3 className="mt-2 text-5xl font-semibold"> Custom quote</h3>     
            <div className="flex text-lg font-semibold">
            <p className=" mt-[-2] mr-1">Test with the pilot, improve with yearly plans </p>      
            </div>
          
            </div>
            <div className="flex flex-col">
            <p className="text-base font-normal mt-4">
              {" "}
              Includes everything in <strong>Pilot, plus:</strong>{" "}
            </p>

            <div className="grid grid-cols-5 text-base mt-2 gap-y-2 font-normal">
            <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">Unlimited live job openings</span>
              </div>
              <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">Unlimited data history</span>
              </div>

              <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">Advanced security</span>
              </div>
              <div className="col-span-8 flex leading-6 items-start">
                <p>
                  <Check className="w-6 h-6" />
                </p>
                <span className="pl-1">Audit logs</span>
              </div>
            </div>
            </div>
            </div>
            <Link
            to="https://beta.clous.app/waitlist"
              className="mt-4 my-2 rounded-full text-center text-lg font-semibold py-2.5 px-3.5 bg-button-orange text-secondary hover:bg-orange-700
       hover:text-gray-50 "
            >
              Get in touch
            </Link>
          </div>
        
        </div>
        
      </section>
      <ul className="flex flex-col lg:flex-row gap-12 mt-8 justify-center">
        <div className="flex gap-4 items-center justify-center">
            <p className=" text-lg">
              Secure data with
            </p>
            <img src="https://clous.s3.eu-west-3.amazonaws.com/icons/AWS+Logo.png" width="40" className="object-fit" nofollow loading="lazy"></img>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-lg">
              Secure payments with
            </p>
            <img src="https://clous.s3.eu-west-3.amazonaws.com/icons/Stripe+Logo.png" width="70" className="object-cover" nofollow loading="lazy"></img>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-lg">
              Safe intelligence with
            </p>
            <img src="https://clous.s3.eu-west-3.amazonaws.com/icons/openai-lockup.svg" width="80" className="object-cover" nofollow loading="lazy"></img>
            <img src="https://clous.s3.eu-west-3.amazonaws.com/icons/Anthropic_Logo.webp" width="80" className="object-cover" nofollow loading="lazy"></img>
            <img src="https://clous.s3.eu-west-3.amazonaws.com/icons/Groq_Logo.webp" width="60" className="object-cover" nofollow loading="lazy"></img>
          </div>
          {/* <div className="flex gap-2 items-center justify-center">
            <p className="text-lg">
              Reliable stack with
            </p>
            <img src="https://clous.s3.eu-west-3.amazonaws.com/icons/Stripe+Logo.png" width="70" className="object-cover" nofollow loading="lazy"></img>
          </div> */}

        </ul>
        <Fragment>
          <Accordion open={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="flex text-xl justify-center items-center pt-8 border-0 hidden text-dark-blue-greenish mb-2"
            >
              Compare plans & features
              <Icon open={open === 1} />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
              <SectionTable />
            </AccordionBody>
          </Accordion>
        </Fragment>

    </main>
  );
}
