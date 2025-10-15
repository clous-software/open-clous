import NormalButton from "../../components/ui/NormalButton";
import mixpanel from "mixpanel-browser";
import ModalCheck from "../../components/ui/Modal";
import { Link } from "react-router-dom";
import TextButton from "components/ui/TextButton";


export default function Linkedin({ modalIsOpen, setModalIsOpen }) {

  const trackButtonClick = (Property) => {
    mixpanel.track('External Link', {
      Name: Property,
      Property: Property,
    });
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
          Executive HR reviews         </h1>
        <p className="my-2 font-normal text-xl lg:text-2xl">
          Experience unparalleled insights and strategic guidance with Clous Executive HR Reviews. Elevate your decision-making process by leveraging the expertise of our seasoned HR professionals who bring a wealth of industry knowledge to the table.

          <br /><br />

          In a tailored session, our Executive HR team conducts a thorough review of your hiring strategies, processes, and overall HR framework. Benefit from personalized recommendations and actionable feedback designed to optimize your talent acquisition efforts.

          <br />
          <br />

          Our Executive HR Reviews are not just about addressing challenges but also recognizing your strengths. Gain a comprehensive understanding of industry best practices and emerging trends to stay competitive in the talent landscape. Collaborate with our experts to refine your approach and achieve your recruitment goals.

          <br />
          <br />
          At Clous, we understand the critical role HR plays in organizational success. Our Executive HR Reviews are a testament to our commitment to supporting your journey towards building strong, resilient, and high-performing teams. Let us be your strategic partner in shaping the future of your workforce.






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
