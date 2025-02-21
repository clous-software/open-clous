import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo_icon from "assets/img/logo.png";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog} from "@headlessui/react";

import NormalButton from "../ui/NormalButton";

function Navbar() {

  useEffect(() => {
    const scrollFunction = () => {
      const navbar = document.getElementById("navbar");

      if (navbar) {
        // Verificar si el elemento existe
        if (
          document.body.scrollTop > 50 ||
          document.documentElement.scrollTop > 50
        ) {
          navbar.classList.add("shadow-navbar");
          navbar.classList.add("border-b");
          navbar.classList.add("bg-[#fafafa]");
        } else {
          navbar.classList.remove("shadow-navbar");
          navbar.classList.remove("border-b");
          navbar.classList.remove("bg-[#fafafa]");
        }
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (

    <nav
      className="flex p-4 mt-4 rounded-lg bg-[#FAFAFA] mx-0 justify-between transition-opacity"
      aria-label="Global"
    >
      <div className="flex items-center lg:w-auto w-full" >
      <div className="flex  items-center mr-5">
          <Link to="/">
            <img src={logo_icon} className="h-10" alt="Clous Logo" />
          </Link>
        </div>
        <div className="flex lg:hidden ml-auto">
          <button
            type="button"
            className="-m-4.5 inline-flex items-center justify-center rounded-xl p-2.5 text-dark-blue-greenish "
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
   {/* <Popover.Group className="hidden lg:flex lg:gap-x-2 xl:gap-x-6">
     <div className="flex items-center gap-x-1 text-lg font-semibold  text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              to="/roi-calculator"
              className="block font-semibold text-dark-blue-greenish hover:text-dark-gray"
            >
              Savings
            </Link>
          </div>
          <div className="flex items-center gap-x-1 text-lg font-semibold  text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              to=""
              className="block font-semibold text-dark-blue-greenish"
            >
              Help
            </Link>
          </div>
          <div className="flex items-center gap-x-1 text-lg font-semibold  text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              to=""
              className="block font-semibold text-dark-blue-greenish"
            >
              Community
            </Link>
          </div>
          <div className="flex items-center gap-x-1 text-lg font-semibold  text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              to=""
              className="block font-semibold text-dark-blue-greenish"
            >
              Connections
            </Link>
          </div>
          <div className="flex items-center gap-x-1 text-lg font-semibold  text-dark-blue-greenish">
            <Link
              to=""
              className="block font-semibold text-dark-blue-greenish"
            >
              Compare
            </Link>
          </div>
  </Popover.Group>*/}
      
      </div>
      <div className="hidden lg:flex gap-6 items-center">
       
        
                <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app"/>
      </div>
      <Dialog
        as="div"
        className=""
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div id="navbar" className="fixed inset-0 z-40" />
        <Dialog.Panel className="fixed inset-y-0 -mt-2 right-0 z-40 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-full sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 .5">
              <img className="h-10 me-6" src={logo_icon} alt="Clous Logo" />
            </Link>
            <button
              type="button"
              className="-m-4.5 rounded-xl p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 " aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                

              <div className="flex items-center gap-x-1 text-lg font-semibold  text-dark-blue-greenish  hover:text-dark-gray">
              <Link
              to="/roi-calculator"
              className="block font-semibold text-dark-blue-greenish hover:text-dark-gray"
            >
              Savings
            </Link>
          </div>
          <div className="flex items-center gap-x-1 text-lg font-semibold  text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              to=""
              className="block font-semibold text-dark-blue-greenish hover:text-dark-gray"
            >Help          </Link>
          </div>
          <div className="flex items-center gap-x-1 text-lg font-semibold  text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              to=""
              className="block font-semibold text-dark-blue-greenish hover:text-dark-gray"
            >
              Community
            </Link>
          </div>
          <div className="flex items-center gap-x-1 text-lg font-semibold  text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              to=""
              className="block font-semibold text-dark-blue-greenish hover:text-dark-gray"
            >
              Connections
            </Link>
          </div>
          <div className="flex items-center gap-x-1 text-lg font-semibold  text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              to=""
              className="block font-semibold text-dark-blue-greenish hover:text-dark-gray"
            >
              Compare
            </Link>
          </div>
                
              </div>
              <div className="pt-6 items-start flex flex-col gap-2 font-semibold">
          
       
        
                <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app"/>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </nav>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Navbar);
