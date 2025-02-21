import { Link } from "react-router-dom";
import TextButton from "../ui/TextButton";

import React from "react"
function Usp() {

  return (
    <section className="text-left py-16 space-y-24">
        <article className="grid mx-auto lg:grid lg:grid-cols-2 gap-8 my-6 items-start justify-start ">
          <div>
          <h2 className="text-3xl lg:text-5xl font-semibold mx-auto">
          Our technology enables zero-friction
          </h2>
          <ul className="my-4 lg:text-lg font-normal">
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5"> {/*Creo que aquí el text-4xl sobra*/}
              Start interviewing candidates as soon as they apply to your job opening. Reduce your time-to-interview until the first human contact and humanize your hiring process. 
                </span>           
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              Stop reviewing thousands of resumes by avoiding unqualified candidates. Release the most repetitive workload to focus on what matters most, people.
                </span>           
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              Collaborative reporting allows you to share your results with other stakeholders and build the trust you need.
                </span>           
            </li>          
          </ul>
          <Link to="/cloush" className="text-primary inline-flex"
              >
                <TextButton name="Better recruitment processes with ClousH" />
            </Link>
       
            </div>
            <React.Fragment>
            
            <img src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" width={640} height={540} className="rounded-lg" alt="Clous Peer – ATS with AI for Hiring Teams"/>
            </React.Fragment>
        </article>
      <article className="grid mx-auto lg:grid lg:grid-cols-2 gap-8 my-6 items-start">
        <React.Fragment >
        <img className="rounded-lg" width={640} height={540} src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousJO.webp" alt="ClousH Alpha Job Opening Page – ATS with AI for Recruiters" />
        </React.Fragment>
        <div className="lg:text-lg">
          <h2 className="text-3xl lg:text-5xl font-semibold mx-auto">
          Connect with talent that fits your values
          </h2>
          <ul className="my-4 font-normal">
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              Give feedback to candidates so they can improve in their future interviews. Everyone has the chance to improve themselves through our platform.
                </span>           
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              Create a transparent job opening and build trust with your candidates. There are 3 key decisions to take a job: salary, responsibilities and flexibility. 
                </span>           
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              We will help you along the way to improve your hiring process, not only for your candidates but also for the entire HR team. 
                </span>           
            </li>          
          </ul>

          <Link to="/startup#startupform" className="lg:text-lg my-5 text-primary inline-flex"
              >
              <TextButton name="Learn more about Startup Programs" />
            </Link>
          </div>
          <React.Fragment >
        <img className="rounded-lg hidden" width={640} height={540} src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousJO.webp" alt="ClousH Alpha Job Opening Page – ATS with AI for Recruiters" />
        </React.Fragment>

      
      </article>
      </section>
  );
}

export default Usp;
