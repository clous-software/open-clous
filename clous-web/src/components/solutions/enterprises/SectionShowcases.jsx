import { Link } from "react-router-dom";
import React from "react";
import mixpanel from "mixpanel-browser";
import TextButton from "../../ui/TextButton";



function SectionShowcases() {
  const trackButtonClick = (Property) => {
    mixpanel.track('Showcase Link', {
    Name : Property,
    Property: Property, });
  };

  return (
    <section className="text-left space-y-12 p-16">
      <article className="grid mx-auto md:grid md:grid-cols-2 gap-10 my-6 items-start justify-start ">
        <div>
          <h2 className="text-3xl lg:text-5xl mt-20">
            Custom follow-up and evaluation
          </h2>
          <ul className="my-4 lg:text-lg font-normal">
            <li className="flex">
              <p className="text-4xl mr-2">•</p>
              <span className="pt-1.5">
                Keep an eye out for your ROI. Being honest, we are here to
                deliver you a return on your subscription to our product.
              </span>
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p>
              <span className="pt-1.5">
                Check out how we have solved your issues. Our commitment to
                transparency helps us achieve a continuous iteration. We learn
                from our mistakes.
              </span>
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p>
              <span className="pt-1.5">
                Give us feedback on our product and services to improve and help
                us deliver the best solutions you can find out there.
              </span>
            </li>
          </ul>

          <Link className="text-primary inline-flex"
            to="https://clous-app.notion.site/Clous-Technology-7ef1a4c6395f441e87b019d5d3c204b0?pvs=4"
            target="_blank"
            onClick={() => trackButtonClick('Notion')}
          >
            <TextButton name=" Check our collaborative space in Notion" />
          </Link>
        </div>
        <React.Fragment >
          <img
            src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousNotion.webp"
            width={640}
            height={540}
            alt="Clous Client Desk in Notion –  Customer Success and Feedback"          />
        </React.Fragment>
      </article>
      <article className="grid mx-auto md:grid md:grid-cols-2 gap-6 xl:gap-10 my-6 items-start">
        <React.Fragment >
          <img
            src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousSlack.webp"
            width={640}
            height={540}
            alt="Clous Slack Community – Customer Success and Feedback"          />
        </React.Fragment>
        <div className="">
          <h2 className="text-3xl lg:text-5xl mt-16">
            Reach out to us 24/7
          </h2>
          <ul className="my-4 lg:text-lg font-normal">
            <li className="flex">
              <p className="text-4xl mr-2">•</p>
              <span className="pt-1.5">
                Get help from the community who has already used our product.
                Give away help and build strong relationships with other
                collaborators.
              </span>
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p>
              <span className="pt-1.5">
                Share your insights on how the hiring market is and how you
                tackled the problems successfully. Support your insights with
                reports!
              </span>
            </li>
            <li className="flex">
              <p className="text-4xl mr-2">•</p>
              <span className="pt-1.5">
                Find the resources you need to unlock your HR teams’ full
                potential and efficiency. Share your resources to help others in
                need!
              </span>
            </li>
          </ul>
          <Link className="text-primary inline-flex"
            to="https://join.slack.com/t/clouscommunity/shared_invite/zt-26gbzzapg-0_VcYKvMJ~CXFZ3sG9rIcA"
            target="_blank"
            onClick={() => trackButtonClick('Slack')}
          >
            <TextButton name="Join our community channel in Slack" />
          </Link>
        </div>
      </article>
    </section>
  );
}

export default SectionShowcases;
