import { Input } from "@material-tailwind/react";
import { useState } from "react";
import React from "react";
import NormalButton from "../../ui/NormalButton";
import { Link } from "react-router-dom";
import axios from "axios";
import mixpanel from "mixpanel-browser";
import ModalCheck from "components/ui/Modal";
import TextButton from "components/ui/TextButton";

const Qoute = ({modalIsOpen, setModalIsOpen}) => {
  const [formStatus, setFormStatus] = useState("idle"); // "idle", "success", "error"

  const trackButtonClick = (Property) => {
    mixpanel.track('External Link', {
    Name : Property,
    Property: Property, });
  };

  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    tool: "", // Añade el campo subject en el estado del formulario
    phone: "",
    hires: "",
    members: "",
  });
  const { first, last, email, hires, members, tool, phone } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL_2}/api/get-quote`, formData);

      // Update the form status to "success"
      setFormStatus("success");


      // You can perform other actions based on the response if needed
    } catch (error) {
      // Handle errors here

      // Update the form status to "error"
      setFormStatus("error");

      console.error("Error sending data:", error.response.data.email);
    }
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
      <main className="lg:flex item-center justify-between py-16">
        <section className="lg:max-w-3xl h-full mb-12 lg:mx-auto items-center">
        <h1 className="font-semibold text-4xl lg:text-7xl">
        Collaborative ATS with AI for hiring teams 
        </h1>
        <div className="flex mt-4 items-center gap-4 text-lg">

          <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app"
              onClick={() => trackButtonClick("Demo")}/>
        <div onClick={openModal} className="flex gap-2 items-center cursor-pointer">
        <Link
                  to="/contact"
                >
                  
                  <TextButton name="Contact sales"/>
                </Link>
        </div>
      </div>
        </section>
    
    {formStatus === "success" ? (
        <div>
        <h3 className="text-xl lg:text-2xl">Thanks for reaching out!</h3>
        <p className="text-sm lg:text-lg">
          We're already working super hard to get back to you as soon as possible. In the meantime, you can{" "}
          <a href="https://www.clous.app/blog" className="text-primary border-b border-primary">
            check our blog articles.
          </a>
        </p>
      </div>
      ) : (
          <form
            className="flex flex-col gap-4 md:w-[27rem]"
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
       {/* <h1 className="font-semibold text-2xl text-right">
        Tailor your quote
        </h1>
        <p className="font-normal text-lg leading-5 mb-4">
        With this information we can better understand you and make a better assessment of what your current talent needs are.
          </p>*/}
            <div className="flex gap-4">

            <Input
              className="focus:outline-0 focus:border "
              id="first"
              name="first"
              value={first}
              onChange={(e) => onChange(e)}
              type="text"
              required
              label="First name"
              color="orange"
              />{" "}
            <Input
              className="focus:outline-0 focus:border "
              id="last"
              name="last"
              value={last}
              onChange={(e) => onChange(e)}
              type="text"
              required
              label="Last name"
              color="orange"
              />{" "}
              </div>
              <Input
              className="focus:outline-0 focus:border "
              id="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              type="email"
              required
              label="Company email address"
              color="orange"
              />{" "}
              <Input
              className="focus:outline-0 focus:border "
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
              type="tel"
              required
              label="Phone number"
              color="orange"
              />{" "}
              <Input
              className="focus:outline-0 focus:border "
              id="tool"
              name="tool"
              value={tool}
              onChange={(e) => onChange(e)}
              required
              label="Do you use any recruitment tool?"
              color="orange"
              />{" "}
              <Input
              className="focus:outline-0 focus:border "
              id="hires"
              name="hires"
              value={hires}
              onChange={(e) => onChange(e)}
              required
              label="How many new hires do you onboard each year?"
              color="orange"
              />{" "}
              <Input
              className="focus:outline-0 focus:border "
              id="members"
              name="members"
              value={members}
              onChange={(e) => onChange(e)}
              required
              label="How many team members use recruitment tools?"
              color="orange"
              />{" "}
            
   
            <div
                className="max-w-screen-sm text-sm text-left font-normal newsletter-form-footer
           dark:text-gray-300"
              >
                By clicking you agree to our{" "} 
                <Link
                  to="/privacy"
                  className="text-primary"
                >
                Privacy Policy.
                </Link>
                <NormalButton name="Submit" type="submit" className="flex mr-auto text-secondary bg-primary mt-2"  />
              </div>
  

          </form>

)}
<ModalCheck
isOpen={modalIsOpen}
onRequestClose={closeModal}
/>
      </main>
    
   );
}
 
export default Qoute;