import { Link } from "react-router-dom";
import TextButton from "../../ui/TextButton";
import mixpanel from "mixpanel-browser";
import NormalButton from "../../ui/NormalButton";

const HeroHRTalks = () => {
  const trackButtonClick = (Property) => {
    mixpanel.track("External Link", {
      Name: Property,
      Property: Property,
    });
  };
  return (
    <section className="py-16 text-center justify-content-center lg:max-w-3xl mx-auto">
      <h1 className="font-bold text-3xl lg:text-7xl">
      We are good news for recruitment teams
      </h1>
      <p className="my-2 text-lg lg:text-xl font-normal">
      If you want to be top of mind for the Clous Press team, don’t hesitate to reach out to us or download our Press Kit below.

      </p>
      <div className="grid md:flex md:justify-center items-center gap-4 text-lg">
          <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app"
              onClick={() => trackButtonClick("Demo")}/>
        <Link
                  to="https://pitch.com/v/Press-Kit-EN-69wb3u"
                >
                  
                  <TextButton name="Read our Press Kit"/>
                </Link>
      </div>
    </section>
  );
}
 
export default HeroHRTalks;