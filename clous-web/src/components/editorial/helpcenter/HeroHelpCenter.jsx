import { Link } from "react-router-dom";
import NormalButton from "../ui/NormalButton";
import mixpanel from "mixpanel-browser";
import { IoPlayCircle } from "react-icons/io5";
import ModalCheck from '../ui/Modal';

function HeroHelpCenter({modalIsOpen, setModalIsOpen}) {

  const trackButtonClick = (buttonName) => {
    mixpanel.track(`Link ${buttonName}`);
  };

  const openModal = () => {
    // ... Lógica para abrir el modal ...
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // ... Lógica para cerrar el modal ...
    setModalIsOpen(false);
  };
  const renderButtons = () => {
    return (
      <div className="grid md:flex md:justify-center items-center gap-4 text-lg">
        <Link to="https://join.slack.com/t/clouscommunity/shared_invite/zt-28u17uh75-C9liHbX~Q72D0YXHUfJRYA"
              onClick={() => trackButtonClick(" - ClousH Demo")}
        >
          <NormalButton name="Join community" />
        </Link>
        <div onClick={openModal} className="flex gap-2 items-center cursor-pointer">
          <IoPlayCircle className="w-5 h-5"/> Watch our demo
        </div>
      </div>
    );
  };

  return (
    <main className="py-16 md:flex justify-center mt-20 items-center md:text-center">
      <section className="lg:px-32 h-full">
        <h1 className="font-bold text-4xl md:text-7xl">
          Helping people improve people
        </h1>
        <p className="font-normal text-lg md:text-xl mt-2 mb-4 mx-auto">
          Our Help Center is where you find everything Clous-related. Check our articles to solve any questions or join our Slack community to ask directly.
        </p>
        {renderButtons()}
      </section>


      <ModalCheck
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        />
    </main>
  );
}

export default HeroHelpCenter;
