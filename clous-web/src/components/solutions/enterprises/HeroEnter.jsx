import { IoPlayCircle } from "react-icons/io5";
import ModalCheck from "../../ui/Modal";
import NormalButton from "../../ui/NormalButton";
import mixpanel from "mixpanel-browser";

function Header({modalIsOpen, setModalIsOpen}) {
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
    <section className="bg-[#fafafa] text-dark-blue-greenish font-semibold py-16">
      <div className="overflow-hidden lg:flex justify-between">
        <div className="mx-auto lg:flex-auto text-left">
            <h1 className="font-bold dark:text-white text-4xl lg:text-7xl">
            Built for enterprise that hire at scale
            </h1>
            <p className="my-5 text-lg lg:text-xl font-normal">
            Create, publish and share your job opening in 3 clicks. Start interviewing candidates in 24 hours. Hire the right talent when you find it.
            </p>
            <div className="mt-6 flex text-lg gap-x-2">
          <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app"
              onClick={() => trackButtonClick("Demo")}/>
        <div onClick={openModal} className="flex gap-2 items-center cursor-pointer">
          <IoPlayCircle className="w-5 h-5"/> Watch our demo
        </div>
            </div>
        </div>
        <img className="my-auto rounded-lg" width={640} src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousHome.webp" alt="ClousH Alpha Homepage – ATS with AI for Recruiters"/>      </div>
      
      <ModalCheck
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        />
    </section>
  );
}

export default Header;
