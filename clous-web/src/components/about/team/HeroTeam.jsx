import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import TextButton from "../../ui/TextButton";
import NormalButton from "../../ui/NormalButton";
import ticks from "assets/img/Ticks.png";

function HeroTeam() {
  const trackButtonClick = (Property) => {
    mixpanel.track('Conversion Value', {
    Name : Property,
    Property: Property, });
  };
  
  return (
    <section className="pt-16 lg:flex text-center gap-4 w-full justify-center">
        <div className="max-w-6xl fadeOut">
            <h1 className="font-semibold text-3xl lg:text-7xl mb-12 relative">
            Adding value to <br/> hiring teams         
            <img src={ticks} className="absolute w-[5rem] -right-12 -top-12" loading="lazy"></img>
            </h1>
            {/*<p className="my-2 font-normal text-lg lg:text-xl">
            We have both candidates and HR professionals as top of mind when we develop our product. We believe in efficiency leading to human connections.
  </p>*/}
            <div className="flex justify-center items-center text-xl">
  
          <NormalButton name="Meet the team" linkUrl="https://beta.clous.app/waitlist" target="_blank"
              onClick={() => trackButtonClick("Demo")}/>
        {/*<div onClick={openModal} className="flex gap-2 items-center cursor-pointer">
        <Link
                  to="/get-quote"
                >
                  
                  <TextButton name="Get quote"/>
</Link>
        </div>*/}
            </div>
          </div>
          {/*<img  src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" className="rounded-lg w-[50%]" alt="Clous Peer – ATS with AI for Hiring Teams"/>*/}
         
  
    </section>
  );
}

export default HeroTeam;
