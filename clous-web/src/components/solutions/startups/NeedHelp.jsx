import FeatureCard from "../../ui/FeatureCardLink";
import mixpanel from "mixpanel-browser";


const NeedHelp = () => {
  const trackButtonClick = (Property) => {
    mixpanel.track('Program Link', {
    Name : Property,
    Property: Property, });
  };

  return (  <main className="py-16">
    <section className="md:text-left md:max-w-3xl mb-12">

  <h2 className="md:text-5xl  text-3xl pb-4">
  Need any help?
  </h2>
  <p className="font-normal text-xl">Our expert ecosystem can help you find the right solution for you, build faster hiring processes and maintaining growth.</p>
    </section>
  <section className="grid gap-8 lg:grid-cols-3 grid-cols-1">
    <FeatureCard
    imageSrc="https://clous.s3.eu-west-3.amazonaws.com/icons/icon-1.webp"
    title="Product sales"
    description="We have the Solutions Program to help you get more sales within our ecosystem. Our clients and partners might be interested in your offerings!"
    link= "/editorial"
    textBtn="Read our editorial"
    onClick={() => trackButtonClick("Solution Partners")}

    />
    <FeatureCard
    imageSrc="https://clous.s3.eu-west-3.amazonaws.com/icons/icon-2.webp"
    title="Supporting growth"
    description="Share with us what are your needs and a specialized team will help you create a recruitment roadmap to find the best talent for your organization."
    link= "/get-quote"
    textBtn="Get quote"
    />


    <FeatureCard
    imageSrc="https://clous.s3.eu-west-3.amazonaws.com/icons/icon-3.webp"
    title="Sessions to consult"
    description="We make available different consulting sessions where we will explore what your current state of recruitment is and how we can improve it together."
    
    />     

    <FeatureCard
    imageSrc="https://clous.s3.eu-west-3.amazonaws.com/icons/icon-4.webp"
    title="Hiring services"
    description="In case you don’t want to spend time resources in hiring new talent and you don’t want to try out our amazing new product ClousH."
    link= "/roi-calculator"
    textBtn="Calculate returns"
    />

    <FeatureCard
    imageSrc="https://clous.s3.eu-west-3.amazonaws.com/icons/icon-5.webp"
    title="Get early access"
    description="There’s already a pre-order list in case you want to access our product as soon as we launch it. Every piece of feedback is welcomed!"

    />          

    <FeatureCard
    imageSrc="https://clous.s3.eu-west-3.amazonaws.com/icons/icon-6.webp"
    title="Start small"
    description="Not daring to subscribe yet? We offer paid pilots so you don’t have to take a chance with us. We will better know if we can solve your needs when you’ve tried our product!"

    />          

  </section>
</main> );
}
 
export default NeedHelp;