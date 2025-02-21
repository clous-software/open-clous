import mixpanel from "mixpanel-browser";
import { IoPlayCircle } from "react-icons/io5";
import ModalCheck from '../../ui/Modal';
import NormalButton from "../../ui/NormalButton";

const HeroGuides = ({modalIsOpen, setModalIsOpen}) => {
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
    <main className="py-16 text-center justify-content-center lg:max-w-3xl mx-auto">
      <h1 className="font-bold text-3xl lg:text-7xl">
      Guides about HR and recruitment
      </h1>
      <p className="my-2 text-lg lg:text-xl font-normal">
      Curated list of resources for recruiters and hiring teams. We welcome any ideas to create resources that might be helpful to you! Reach out to us with a helpful proposal.
      </p>
      <div className="grid md:flex md:justify-center items-center gap-4 text-lg">
          <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app"
              onClick={() => trackButtonClick("Demo")}/>
        <div onClick={openModal} className="flex gap-2 items-center cursor-pointer">
          <IoPlayCircle className="w-5 h-5"/> Watch our demo
        </div>
      </div>
      <ModalCheck
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        />
    </main>
  );
}
 
export default HeroGuides;