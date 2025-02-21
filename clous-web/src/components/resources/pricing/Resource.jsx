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
            On-demand resources       </h1>
            <p className="my-2 font-normal text-xl lg:text-2xl">
            Empower your hiring process with Clous On-Demand Resources. Unlock a wealth of tools and materials designed to enhance your recruitment strategy. From insightful webinars and comprehensive guides to interactive tutorials, our curated resources cater to all your hiring needs.

<br/><br/>

Dive into our extensive library of on-demand content, carefully crafted to provide actionable insights and practical tips. Whether you're a seasoned HR professional or just starting your recruitment journey, our resources are tailored to support your growth and success.

<br/>
<br/>

Explore in-depth tutorials that guide you through every aspect of the Clous platform, ensuring you maximize its potential. Our on-demand webinars cover industry trends, best practices, and innovative approaches to talent acquisition. Stay ahead of the curve with thought leadership pieces authored by industry experts.

<br/>
<br/>
At Clous, we believe that knowledge is power. Our On-Demand Resources empower you to make informed decisions, optimize your workflow, and elevate your recruitment game. The tools you need, when you need them – Clous is your partner in building exceptional teams.






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
