import mixpanel from "mixpanel-browser";
import { IoPlayCircle } from "react-icons/io5";
import ModalCheck from "../../ui/Modal";
import NormalButton from '../../ui/NormalButton';


export default function HeroTeams({modalIsOpen, setModalIsOpen}) {
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
    <section className="py-16 text-center ">
            <h1 className="font-bold text-4xl lg:text-7xl lg:max-w-2xl mx-auto">
            Say goodbye to reviewing resumes
            </h1>
            <p className="my-2 text-lg lg:text-xl font-normal lg:max-w-2xl mx-auto">
            Why reviewing thousands of resumes to schedule interviews? 
            <br/>Only review them when you need to.
            </p>
            <div className="my-5 flex xl:w-full text-lg gap-x-2 justify-center ">
          <NormalButton name="Try Clous free " linkUrl="https://demo.clous.app"
              onClick={() => trackButtonClick("Demo")}/>
        <div onClick={openModal} className="flex gap-2 items-center cursor-pointer">
          <IoPlayCircle className="w-5 h-5"/> Watch our demo
        </div>
            </div>
     
            <ModalCheck
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        />
    </section>
  );
}


