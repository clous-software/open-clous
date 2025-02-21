import mixpanel from "mixpanel-browser";
import { IoPlayCircle } from "react-icons/io5";
import ModalCheck from "../../ui/Modal";
import NormalButton from "../../ui/NormalButton";

function HeroStars({modalIsOpen, setModalIsOpen}) {

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
    <section className="py-16 text-center" >
      <section className="md:max-w-3xl h-full mx-auto">
          <h1 className="font-bold text-4xl lg:text-7xl  dark:text-white my-2">
          We believe in startups backing startups
          </h1>
          <p className="my-5 text-lg lg:text-xl font-normal ">
            High-growth startups need to define their hiring processes from the first day to build top quality teams.
          </p>
          </section>
          <div className="my-5 flex xl:w-full text-lg gap-x-2 justify-center mx-auto">
          <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app"
              onClick={() => trackButtonClick("Demo")}/>
            <div onClick={openModal} className="flex gap-2 items-center cursor-pointer">
          <IoPlayCircle className="w-5 h-5"/> Watch our demo
        </div>
          </div>

          <img className="object-cover mt-10 lg:flex rounded-lg" src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="Clous Peer – ATS with AI for Hiring Teams"/>      
        <ModalCheck
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        />
    </section>
  );
}

export default HeroStars;
