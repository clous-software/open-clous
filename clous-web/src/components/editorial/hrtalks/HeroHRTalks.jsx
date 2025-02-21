import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import NormalButton from "../../ui/NormalButton";

const HeroNews = () => {
  const trackButtonClick = (Property) => {
    mixpanel.track("External Link", {
      Name: Property,
      Property: Property,
    });
  };
  return (
    <section className="py-16 text-center justify-content-center lg:max-w-3xl mx-auto">
      <h1 className="font-bold text-3xl lg:text-7xl">
      HR experts write opinionated articles
      </h1>
      <p className="my-2 text-lg lg:text-xl font-normal">
      If you want to be a guest contributor, don’t hesitate to ask us any questions and send us your article proposal below.

      </p>
      <div className="grid md:flex md:justify-center items-center gap-4 text-lg">
          <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app"
              onClick={() => trackButtonClick("Demo")}/>
        <div onClick={openModal} className="flex gap-2 items-center cursor-pointer">
          <IoPlayCircle className="w-5 h-5"/> Watch our demo
        </div>
      </div>
    </section>
  );
}
 
export default HeroNews;