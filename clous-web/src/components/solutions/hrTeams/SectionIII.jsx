import TextButton from "../../ui/TextButton";
import mixpanel from "mixpanel-browser";
import { Link } from "react-router-dom";

function SectionIII() {

  const trackButtonClick = (Property) => {
    mixpanel.track('External Link', {
    Name : Property,
    Property: Property, });
  };
  return (
    <section className="text-left py-16 space-y-12">
        <article className="lg:pl-8 grid lg:grid-cols-2 gap-8 items-start justify-between">
          <div>
          <h2 className="text-3xl lg:text-5xl">
          Tell us what are your needs
          </h2>
          <p className="my-4 lg:text-lg font-normal">
            
              Whether you need a data engineer in Madrid with a maximum salary of $60,000 per year, or you just want to explore new job offers. Tell our Clous Peer what you need and we’ll get you the best results to attract new talent and keep pushing your organization towards success.
                </p>           
                <div className="text-primary inline-flex">
                  <Link to="/cloush">
            <TextButton name="Learn how we tailor your job opening"/>
            </Link>
          </div>
            </div>
            <img src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" className="rounded-lg" alt="Clous Peer – ATS with AI for Hiring Teams"/>        </article>
      <article className="lg:pl-8 grid lg:grid-cols-2 gap-8 items-start justify-start">
      <img className="rounded-lg " src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousJO.webp" alt="ClousH Alpha Job Opening Page – ATS with AI for Recruiters" />        <div className="">
          <h2 className="text-3xl lg:text-5xl">
          Share your job opening
          </h2>
          <p className="my-4 lg:text-lg font-normal">
              Not getting enough candidates? No worries. We make it easy for you to start receiving as many applications as you want. Share your job openings easily or connect your favorite online job boards and source talent from anywhere in the world.
         
          </p>
          <div className="text-primary inline-flex"
                      >
  <Link to="https://demo.clous.app" target="_blank"
onClick={() => trackButtonClick("Demo")}
>
<TextButton name="Start attracting talent to your job openings" />
</Link>
          </div>
          </div>
      </article>
        <article className="lg:pl-8 grid lg:grid-cols-2 gap-8 items-start justify-start">
          <div>
          <h2 className="text-3xl lg:text-5xl">
          Interview qualified candidates
          </h2>
          <p className="my-4 lg:text-lg font-normal">
          Too many candidates and most don’t fit your job offer. Is that you? Then, we’re here for you. Candidates that you interview are already qualified thanks to our AI model. We make sure everyday to ensure that it makes a fair assessment for your candidates.  
          </p>
          <div className="text-primary inline-flex"
                      >
 <Link to="/cloush#features"
        >
          <TextButton name="Engage candidates during hiring processes" />
        </Link>
          </div>
            </div>
            <img src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousATS.webp" alt="ClousH Alpha ATS – AI for Recruiters"/>        </article>
      </section>
  );
}

export default SectionIII;
