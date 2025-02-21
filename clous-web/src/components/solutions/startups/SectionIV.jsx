import { Link } from "react-router-dom";
import TextButton from "../../ui/TextButton";

function SectionIV() {

  return (
    <section id="uvp" className="grid gap-10 py-16">
      <div className="grid mx-auto lg:grid lg:grid-cols-2 gap-4 my-6 items-start justify-start ">
        <div>
          <h2 className="text-3xl lg:text-5xl mx-auto mb-3">
          Join our Startup Program
          </h2>
          <ul className="my-4 lg:text-lg font-normal">
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              We will organise monthly and weekly sessions of advice. Entirely Q&A where we act as your HR consultants.
                </span>           
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              As part of our network, you’ll be intrinsic to our organization to provide feedback, suggestions and issues reports.
                </span>           
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              
          We offer discounts to try out our software and help you with recruit qualified talent.
                </span>           
            </li>          
          </ul>

          <Link to="/startup#startupform" className="text-primary inline-flex text-lg"
              >
                <TextButton name="Apply to our Startup Program" />
            </Link>
          
        </div>
        <img className="rounded-lg" src="https://clous.s3.eu-west-3.amazonaws.com/images/openings.webp" alt="Job Openings and ATS for Hiring Teams"/>      </div>
      <div className="grid mx-auto lg:grid lg:grid-cols-2 gap-4 my-6 items-start">
      <img width={640} height={540} src="https://clous.s3.eu-west-3.amazonaws.com/images/pay-gap.webp" alt="Measure Pay Gap with your ATS – ClousH Features" />        <div className="lg:pr-12">
          <h2 className="text-3xl lg:text-5xl md:mx-auto mb-3 dark:text-white">
            Build a better employer brand
          </h2>
          <ul className="my-4 lg:text-lg font-normal">
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              Get back to candidates and easily send them alerts of new job openings that fit their professional career.
                </span>           
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              Recommend other job openings to candidates that don’t fit with the requirements.
                </span>
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p><span className="pt-1.5">
              Our AI helps you create job openings so that you can focus on getting to know and find the right talent.
                </span>           
            </li>          
          </ul>
            <Link to="/blog" className="mt-6 text-button-orange lg:text-lg inline-flex"
              >
              <TextButton name="Learn to build your Employer Value Proposition" />
            </Link>
        </div>
      </div>
    </section>
  );
}

export default SectionIV;
