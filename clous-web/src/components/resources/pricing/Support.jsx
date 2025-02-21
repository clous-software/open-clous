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
            Live technical support         </h1>
            <p className="my-2 font-normal text-xl lg:text-2xl">
            At Clous, we understand the importance of seamless operations, and that's why our Live Technical Support is here for you 24/7. We believe that technical challenges shouldn't hinder your hiring success. With our expert support team always ready, you can tackle any issue, big or small, in real-time.

<br/><br/>

Our live chat support ensures that you have instant access to a team of knowledgeable professionals. Whether you're troubleshooting a technical glitch, seeking guidance on a specific feature, or just need advice on optimizing your workflow, our technical support team is just a message away.

<br/>
<br/>

No more waiting for resolutions or navigating through complex support portals. Our commitment is to provide you with immediate assistance, so you can stay focused on what matters – building your dream team. Experience the peace of mind that comes with knowing that dedicated technical support is at your fingertips whenever you need it.
<br/>
<br/>

We're not just a software provider; we're your reliable partner in the hiring journey. Elevate your experience with Live Technical Support – because your success deserves real-time solutions.

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
