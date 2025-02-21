import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import TextButton from "../../ui/TextButton";

const  SectionManifestos = () => {
  const trackButtonClick = (Property) => {
    mixpanel.track('Manifesto Link', {
    Name : Property,
    Property: Property, });
  };
  return (
    <section className="lg:flex py-16 font-semibold text-lg gap-12 text-dark-blue-greenish">
        <article className="overflow-hidden">
        <img className="rounded-lg object-cover w-full h-[24rem]" src="https://clous.s3.eu-west-3.amazonaws.com/images/ethical.webp" alt="Clous Culture values Ethical AI  – Clous Mission Manifestos"/>          <h2 className="text-2xl mt-5">
            AI must be ethical
          </h2>
          <p className="text-sm lg:text-lg font-normal my-2">
           AI is moving at an accelerated pace, and we need to keep up with it. For that, we have signed a manifesto that defines the guidelines for our AI development.
          </p>
          <Link to="https://pitch.com/public/da511b0f-d3ae-4f8d-88df-8ce95342c0c1" className="text-button-orange inline-flex mt-2"
            target="_blank"
            onClick={() => trackButtonClick("AI")}
            >
           <TextButton name="AI ethics manifesto"/>
          </Link>
        </article>
        <article className="overflow-hidden " >
        <img className="rounded-lg object-cover w-full h-[24rem]" src="https://clous.s3.eu-west-3.amazonaws.com/images/tecnology.webp" alt="Clous Culture values Unbiased technology  – Clous Mission Manifestos"/>          <h2 className="text-2xl mt-5">
            Commitment to our planet
          </h2>
          <p className="text-sm lg:text-lg font-normal my-2">
            Our clients need to achieve their sustainability goals. We weren’t going to be the ones 
            who stopped it. We encourage our services providers to do the same.
          </p>
          <Link to="https://pitch.com/public/5018d92f-2e42-4c55-8bef-571816f82d70" 
          className="text-button-orange inline-flex mt-2"
          target="_blank"
            onClick={() => trackButtonClick("Sustainability")}
            >
            <TextButton name="Sustainability manifesto"/>
          </Link>
        </article>
    </section>
  )
}
 
export default  SectionManifestos;
