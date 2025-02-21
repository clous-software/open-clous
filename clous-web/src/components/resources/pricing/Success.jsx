import NormalButton from "../../ui/NormalButton";
import mixpanel from "mixpanel-browser";
import ModalCheck from "../../ui/Modal";
import { Link } from "react-router-dom";
import TextButton from "components/ui/TextButton";


export default function Linkedin ({modalIsOpen, setModalIsOpen}) {

  const trackButtonClick = (Property) => {
    mixpanel.track('External Link', {
    Name : Property,
    Property: Property, });
  };

  const openModal = () => {
    // ... Lógica para abrir el modal ...
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // ... Lógica para cerrar el modal ...
    setModalIsOpen(false);
  };

  return (
    <section className="py-16 lg:flex text-left gap-4 w-full justify-center">
        <div className="max-w-3xl">
            <h1 className="font-bold text-4xl md:text-8xl mb-6">
            Dedicated Success Manager         </h1>
            <p className="my-2 font-normal text-xl lg:text-2xl">
            Welcome to Clous, where your success is our top priority. Our Dedicated Customer Success Manager service is designed to provide you with a personalized, proactive, and hands-on approach to ensure you get the most out of our platform. Your dedicated manager is more than just a support contact; they're your strategic partner in leveraging Clous effectively for your unique hiring needs.

<br/><br/>

Your success journey begins with a one-on-one onboarding session, where we align our platform with your business goals. Your dedicated manager will guide you through the platform's features, tailoring the experience to suit your specific requirements. As you navigate Clous, your manager will be your go-to resource for any questions, challenges, or optimizations.

<br/>
<br/>

Beyond onboarding, your dedicated manager will proactively engage with you, offering insights, best practices, and updates on the latest platform enhancements. They're here to ensure you stay ahead of the curve in recruiting, leveraging Clous's capabilities to streamline your hiring processes.
<br/>
<br/>
Experience the Clous difference with a Dedicated Customer Success Manager – it's not just about using a tool; it's about a partnership that propels your recruitment success. Ready to elevate your hiring journey? Let your dedicated manager guide you every step of the way.

  </p>
            <div className="flex md:justify-center items-center text-xl">
  
          {/* <NormalButton name="Try Clous" linkUrl="https://demo.clous.app"
              onClick={() => trackButtonClick("Demo")}/>
       <div onClick={openModal} className="flex gap-2 items-center cursor-pointer">
        <Link
                  to="/get-quote"
                >
                  
                  <TextButton name="Get quote"/>
</Link>
        </div>*/}
            </div>
          </div>
          {/*<img  src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" className="rounded-lg w-[50%]" alt="Clous Peer – ATS with AI for Hiring Teams"/>*/}
         
          <ModalCheck
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        />
    </section>
  );
}
