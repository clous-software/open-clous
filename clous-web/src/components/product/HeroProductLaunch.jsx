import NormalButton from "components/ui/NormalButton";
import mixpanel from "mixpanel-browser";

export default function HeroProductLaunch () {

  const trackButtonClick = (Property) => {
    mixpanel.track('External Link', {
    Name : Property,
    Property: Property, });
  };

  return (
    <section className="py-16 w-full">
        <div className="max-w-3xl mx-auto items-center justify-center text-center">
            <a href="https://www.producthunt.com/posts/cloush-alpha?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-cloush&#0045;alpha" target="_blank" rel="noreferrer" className="inline-flex"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=434541&theme=light" alt="ClousH&#0032;Alpha - Next&#0045;gen&#0032;recruitment&#0032;tool&#0032;for&#0032;hiring&#0032;teams | Product Hunt" width="250" height="54" /></a>
            <h1 className="text-5xl lg:text-8xl mt-8 font-bold">
            Save hours weekly hiring with AI
            </h1>
            {/*<p className="my-2 font-normal text-lg lg:text-xl">
            Kind of a next-gen ATS combined with Linkedin, ChatGPT and Calendly. Recruiters write their talent needs and in just 3 clicks, they start interviewing qualified candidates.            </p>*/}
            <div className="my-5 sm:flex flex-1 justify-center text-lg gap-x-2 ">
          <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app"
              onClick={() => trackButtonClick("Demo")}/>
        
            </div>
          </div>         
    </section>
  );
}

