import { Fragment, useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import logo_icon from "assets/img/logo.png";
import {
  Bars3Icon,
  XMarkIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  UsersIcon,
  FlagIcon,
  Square3Stack3DIcon,
  ScaleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import NormalButton from "../ui/NormalButton";
import TextButton from "../ui/TextButton";

const solutions = [
  {
    name: "Hiring Teams",
    description: "Hiring is more difficult every day",
    to: "/hiring-teams",
    icon: UsersIcon,
  },
  {
    name: "Enterprise",
    description: "People analytics with AI for your business",
    to: "/enterprise",
    icon: UserGroupIcon,
  },
  {
    name: "Startups",
    description: " Hiring is more difficult for startups",
    to: "/startup",
    icon: RocketLaunchIcon,
  },
];

const products = [
  {
    name: "ClousH",
    description: "People-first technology to hire at scale",
    to: "/cloush",
    icon: LightBulbIcon,
  },
 /*  {
    name: "Clous Peer",
    description: "Create, publish, and share",
    to: "",
    icon: BsRobot,
}, */
];

const about = [
  {
    name: "About",
    description: "Customer-centric and product-driven culture",
    to: "/company",
    icon: ScaleIcon,
  },
  {
    name: "Partners",
    description: "Driving innovation together",
    to: "/partners",
    icon: Square3Stack3DIcon,
  },
  {
    name: "Mission",
    description: "Our commitment with humanity",
    to: "/mission",
    icon: FlagIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
      className="flex mt-2 mx-0 justify-end transition-opacity fadeOut"
      aria-label="Global"
    >
      
      <div className="flex items-center pr-4 py-2 rounded-full bg-[#FAFAFA] shadow-sm pl-6">

       {/* <div className="flex xl:flex xl:mr-4 2xl:mr-6">
          <Link to="/">
            <img src={logo_icon} className="h-10" alt="Clous Logo" />
          </Link>
  </div>
        <div className="flex xl:hidden ml-auto">
          <button
            type="button"
            className="-m-4.5 inline-flex items-center justify-center rounded-xl p-2.5 text-dark-blue-greenish "
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
  </div>*/}
        <Popover.Group className="flex gap-x-6">
     
        {/*<Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="flex items-center gap-x-1 text-lg font-semibold text-dark-blue-greenish  hover:text-dark-gray">
                  Solutions
                  <ChevronDownIcon
                    className={classNames(
                      open ? "rotate-180" : "",
                      "h-7 w-7 flex-none"
                    )}
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute top-2 z-40 mt-12  w-screen max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl border">
                    <div className="p-4 grid grid-cols-2 gap-4 w-full">
                      <section className="w-full">
                        <p className="text-lg ml-4 text-shade-gray font-normal">
                          By product
                        </p>
                        {products.map((item) => (
                          <div
                            key={item.name}
                            className="group relative flex items-center gap-x-6 rounded-xl p-4 text-lg leading-6 hover:bg-gray-50 "
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gray-50 group-hover:bg-white ">
                              <item.icon
                                className="h-6 w-6 group-hover:text-gray-600 text-button-orange"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex-auto">
                              <Link
                                to={item.to}
                                className="block font-semibold text-dark-blue-greenish"
                              >
                                {item.name}
                                <span className="absolute inset-0" />
                              </Link>
                              <p className="mt-1 font-normal">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </section>
                      <section className="w-full">
                        <p className="text-lg ml-4 text-shade-gray font-normal">By size</p>
                        {solutions.map((item) => (
                          <div
                            key={item.name}
                            className="group relative flex items-center gap-x-6 rounded-xl p-4 text-lg leading-6 hover:bg-gray-50 "
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gray-50 group-hover:bg-white ">
                              <item.icon
                                className="h-6 w-6 text-button-orange"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex-auto">
                              <Link
                                to={item.to}
                                className="block font-semibold text-dark-blue-greenish"
                              >
                                {item.name}
                                <span className="absolute inset-0" />
                              </Link>
                              <p className="mt-1 font-normal">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </section>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover> 

          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="flex items-center gap-x-1 text-lg font-semibold text-dark-blue-greenish  hover:text-dark-gray">
                  About us
                  <ChevronDownIcon
                    className={classNames(
                      open ? "rotate-180" : "",
                      "h-7 w-7 flex-none"
                    )}
                    aria-hidden="true"
                  />{" "}
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute top-2 z-40 mt-12 w-screen max-w-md overflow-hidden rounded-xl bg-white shadow-xl border">
                    <div className="p-4">
                      {about.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-xl p-4 text-lg leading-6 hover:bg-gray-50 "
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gray-50 group-hover:bg-white ">
                            <item.icon
                              className="h-6 w-6 group-hover:text-gray-600 text-button-orange"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-auto">
                            <Link
                              to={item.to}
                              className="block font-semibold text-dark-blue-greenish"
                            >
                              {item.name}
                              <span className="absolute inset-0" />
                            </Link>
                            <p className="mt-1 font-normal">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
                      </Popover>*/}
                 
          
          <div className="flex items-center gap-x-1 text-dark-blue-greenish  hover:text-dark-gray">
            
            <Link
              id="cloush"
              to="/cloush"
              className="block text-dark-blue-greenish"
            >
              Product
            </Link>
          </div> 
          <div className="flex items-center gap-x-1 text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              id="company"
              to="/company"
              className="block text-dark-blue-greenish"
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-x-1 text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              id="pricing"
              to="/pricing"
              className="block text-dark-blue-greenish"
            >
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-x-1 ">
            <Link
              id="editorial"
              to="/editorial"
              className="block text-dark-blue-greenish"
            >
              Editorial
            </Link>
          </div>
        </Popover.Group>
        <div className="ml-3 flex gap-6 items-center font-medium">
                <NormalButton className="shadow-none hidden lg:flex items-center h-8 font-semibold bg-primary text-secondary text-sm" name="Try it yourself" linkUrl="https://beta.clous.app" target="_blank"/>
      </div>
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
                

                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-xl py-2 pl-3 pr-3.5 text-lg font-semibold leading-7 hover:text-dark-gray">
                        About us
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-7 w-7 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...about].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.to}
                            className="block rounded-xl py-2 pl-6 pr-3 text-lg font-semibold leading-7 text-dark-blue-greenish hover:text-dark-gray"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-xl py-2 pl-3 pr-3.5 text-lg font-semibold leading-7 hover:text-dark-gray">
                        Solutions
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-7 w-7 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...solutions].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.to}
                            className="block rounded-xl py-2 pl-6 pr-3 text-lg font-semibold leading-7 text-dark-blue-greenish hover:text-dark-gray"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.to}
                            className="block rounded-xl py-2 pl-6 pr-3 text-lg font-semibold leading-7 text-dark-blue-greenish hover:text-dark-gray"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <div className="flex items-center gap-x-1 text-lg font-semibold    text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              to="/editorial" target="_blank"
              className="block font-semibold text-dark-blue-greenish hover:text-dark-gray"
            >
              Editorial
            </Link>
          </div>
                <div className="flex items-center gap-x-1 text-lg font-semibold    text-dark-blue-greenish  hover:text-dark-gray">
            <Link
              to="/pricing"
              className="block font-semibold text-dark-blue-greenish hover:text-dark-gray"
            >
              Pricing
            </Link>
          </div>
              </div>
              <div className="pt-6 items-start flex flex-col gap-2 font-semibold">
                <Link
                  to="/contact"
                >
                  
                  <TextButton name="Contact sales"/>
                </Link>
 
                <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app/" target="_blank"/>
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
