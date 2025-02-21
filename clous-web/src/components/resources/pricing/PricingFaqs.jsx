import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { CameraOff, Cpu, Gift, ChevronDown , ShieldOff, UserX } from "lucide-react";
import React, { useState } from "react";
import { Fragment } from "react";
import NormalButton from "../../ui/NormalButton";
import circle from "assets/img/Circle.png";

const PricingFaqs = () => {
  const [open, setOpen] = useState(0);

  function Icon({ id, open }) {
    return (
      <ChevronDown className={`${open ? "rotate-180" : ""} h-8 w-8 transition-transform`} />
    );
  }
const handleOpen = (id) => {
    setOpen(open === id ? 0 : id);
  };


  return ( 
    <main className="w-full gap-8 lg:pt-16 justify-center px-2 lg:px-24">
      <section className="px-12 py-24 rounded-3xl flex">
        <div>
        <h2 className="text-5xl lg:text-6xl mb-12 text-left relative z-10">
        Questions to ask
        <img src={circle} nofollow className="absolute -top-10 -left-10 -z-10"></img>
      </h2>
      <NormalButton name="Meet the team" linkUrl="https://beta.clous.app/waitlist" target="_blank"/>
        </div>
      
      <Fragment>
          <div className="flex flex-col">
   <ul className="grid grid-cols-1 pl-2 gap-8 lg:max-w-4xl text-left mb-8 lg:pl-16">
   <li className="flex flex-col gap-2">
          <Accordion open={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="flex justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
          Can I test Clous before subscribing to the full product?
        </h3>              <Icon open={open === 1} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">Yes, Clous offers customers a trial experience before making a purchase. Initially, we schedule a call to show you the platform's features and create your account live. During this call, we will define product ideas and functionalities that could benefit you and implement these within a week.
            <br/><br/>
You can then test Clous for a week, providing feedback for improvements. After this period, you can invite your team to collaborate and explore the platform's features for an additional two weeks. This ensures you fully experience Clous' capabilities before committing to a subscription.
</p>
             </AccordionBody>
          </Accordion> 
          
        
          </li>
          <li className="flex flex-col gap-2">
          <Accordion open={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="flex justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
          What payment methods are available?
        </h3>              <Icon open={open === 2} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">We use Stripe as our online payment provider, which facilitates card payments, link payments (links where you confirm you are paying), and Apple Pay for our users.
<br/><br/>
We also offer international bank transfers, but you need to speak to the team so we can give you our bank details.
</p>
             </AccordionBody>
          </Accordion> 
          
        
          </li>
          <li className="flex flex-col gap-2">
          <Accordion open={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="flex justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
Are there any hidden costs we should be aware of when implementing your solution?
        </h3>              <Icon open={open === 3} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">Our pricing is clear and transparent, so you won&apos;t get hit with any surprise fees. We don&apos;t charge based on how many users you have or how many job openings you post. Our pricing is simple, giving you a clear idea of what you&apos;re paying for.
            <br/><br/>

We know it&apos;s important to have predictable costs, so we set a pricing plan in an easy way to understand. Whether you&apos;re checking out our free plan or thinking about going premium, you&apos;ll get all the info you need. And if you have any questions, just hit up our team and we&apos;ll sort it out for you in no time.

</p>
             </AccordionBody>
          </Accordion> 
          
        
          </li>
          <li className="flex flex-col gap-2">
          <Accordion open={open === 4}>
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="flex justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
          Can I meet the team?
        </h3>              <Icon open={open === 4} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">For sure! You can meet Clous team. We value personal connections and are open to scheduling meetings to discuss our product and how it can fit your needs and how it can be implemented in your daily work. You can contact us by leaving <a className="text-primary" href="https://beta.clous.app/getintouch">your email address here.</a></p>
             </AccordionBody>
          </Accordion> 
          
        
          </li>
          <li className="flex flex-col gap-2">
          <Accordion open={open === 5}>
            <AccordionHeader
              onClick={() => handleOpen(5)}
              className="flex justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
          What is hiring intelligence?
        </h3>              <Icon open={open === 5} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">Hiring intelligence at Clous is the application of AI and advanced data analytics to transform the recruitment process. It improves algorithms to recommend the best-fit candidates from existing data, automates scheduling interviews, and matches candidates to suitable positions even if they don't fit the original job opening. Our platform analyzes a long amount of data to provide insights, helping recruiters make data-driven decisions quickly and efficiently. This ensures an improved, efficient, and effective hiring process while connecting businesses with the best talent available.</p>
             </AccordionBody>
          </Accordion> 
          
        
          </li>
          
          <li className="flex flex-col gap-2">
          <Accordion open={open === 6}>
            <AccordionHeader
              onClick={() => handleOpen(6)}
              className="flex justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
          How can ClousH improve your hiring processes?
        </h3>              <Icon open={open === 6} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">Our software is designed to make it easy to hire talent, it allows you to create and post job offers in just 3 clicks. Also, we use AI but without compromising candidate experience. ClousH speeds up from looking at candidate data and building a talent pipeline, to scheduling interviews. It&apos;s like having a recruitment assistant.
<br/><br/>
With Clous you get a one hub for tracking and managing all your candidate info, so you always know what's going on in your hiring process. You can easily share your data and documents with your team, making your hiring process collaborative. It&apos;s perfect for making sure you&apos;re getting the right people on your team.
</p>
             </AccordionBody>
          </Accordion> 
          
        
          </li>
          <li className="flex flex-col gap-2">
          <Accordion open={open === 7}>
            <AccordionHeader
              onClick={() => handleOpen(7)}
              className="flex justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
          Is our software compatible with existing tools you use?

        </h3>          <Icon open={open === 7} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">
            Our software is designed to work like a variety of tools you already use, like Calendly, ChatGPT, and LinkedIn. This means no more jumping between different apps, it combines these features to never mess up your workflow. We might be implementing new integrations as you demand them. But it will never be our main focus.
<br/><br/>
Clous simplifies your workflow by bringing all your favorite tools together in one place. It allows for an easy transition and lets your team use familiar functionalities without any hassle.
</p>
             </AccordionBody>
          </Accordion>
          
        
          </li>

          <li className="flex flex-col gap-2">
          <Accordion open={open === 8}>
            <AccordionHeader
              onClick={() => handleOpen(8)}
              className="flex justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
          Can I import my candidates?
        </h3>         <Icon open={open === 8} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">Yes, importing candidates is quick and efficient, taking approximately 5 minutes for every 200 candidates. Once imported, our system automatically generates insights based on the available information, like resumes and career priorities. These insights can help you make informed decisions about candidate suitability and improve your recruitment process.
</p>
             </AccordionBody>
          </Accordion>
          
        
        
          </li>
       
 
               </ul> 

               <ul className="grid grid-cols-1 gap-8 lg:max-w-5xl text-left lg:pl-16">
               <li className="flex flex-col gap-2">
               <Accordion open={open === 9}>
            <AccordionHeader
              onClick={() => handleOpen(9)}
              className="flex justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
          What is Clous Peer and why do I need it?
        </h3>      <Icon open={open === 9} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">Clous and Peer are our AI assistants for hiring teams and candidates, respectively. For talent looking for job opportunities, Peer allows them to find opportunities that match their needs. For hiring teams, Clous allows them to quickly and easily post and edit job openings based on their specific requirements. Peer is designed to improve the overall hiring experience by providing resume insights, personalized career paths and recommendations on job opportunities.


</p>
             </AccordionBody>
          </Accordion>
          
        
          </li>

          <li className="flex flex-col gap-4">
          <Accordion open={open === 10}>
            <AccordionHeader
              onClick={() => handleOpen(10)}
              className="flex w-full justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
          Do you train your AI with my data?

        </h3>       <Icon open={open === 10} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">No, we don&apos;t train our AI with your data for several reasons. First, the cost of doing so would be very high. Second, we lack the expertise to effectively train AI with external data. Third, the current design of our product wouldn&apos;t see substantial improvement from this approach. Finally, many of our users prefer not to have their data used in this way. Therefore, we have chosen not to incorporate user data into our AI training process.
              <br/><br/>
              When you leave our platform, we have a shared ownership of the data you generated thanks to Clous. You can ask the team about this if there are any concerns.
            </p>
             </AccordionBody>
          </Accordion>
          
        
         
          </li>
          <li className="flex flex-col gap-4">
          <Accordion open={open === 11}>
            <AccordionHeader
              onClick={() => handleOpen(11)}
              className="flex w-full justify-between underAnimation items-center border-0 mb-2"
            >
<h3 className="text-xl lg:text-3xl text-[#333333] max-w-[90%]">
          How does our software ensure data security and privacy?

        </h3>   <Icon open={open === 11} className="w-12 h-12" />
            </AccordionHeader>
            <AccordionBody className="font-semibold text-2xl">
            <p className="font-normal text-base lg:text-xl text-[#333333]">Keeping your data safe is our top priority. We make sure your info stays private and secure. We follow the best standards out there, with strict access control and encryption tech that keeps your data locked up tight.
            <br/><br/>
All these security measures work together to give your personal data the best protection possible. We&apos;re dedicated to data security, going beyond just following the rules. We&apos;re always on the lookout for any possible issues and fixing them before they become a problem.

</p>
             </AccordionBody>
          </Accordion>
          
        
          </li>
               </ul>
               </div>
               </Fragment>

               </section>
    </main>
   );
}
 
export default PricingFaqs;