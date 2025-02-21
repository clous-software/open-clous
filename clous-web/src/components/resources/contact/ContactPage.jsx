import { Card, Input, Select, Textarea, Option } from "@material-tailwind/react";
import { useState } from "react";
import NormalButton from "../../ui/NormalButton";
import { Link } from "react-router-dom";
import ModalCheck from "../../ui/Modal";
import { IoLogoLinkedin, IoPlayCircle, IoLogoSlack, IoLogoYoutube, IoLogoTwitter } from "react-icons/io5";
import axios from "axios";
import mixpanel from "mixpanel-browser";
import BigButton from "../../ui/BigButton";
import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoCard, IoClose, IoPlay } from "react-icons/io5";

  export default function ContactPage({modalIsOpen, setModalIsOpen}) {
    const trackButtonClick = (Property) => {
      mixpanel.track('External Link', {
      Name : Property,
      Property: Property, });
    };
    const [errors, setErrors] = useState({}); // Nuevo estado para mensajes de error

    const [formData, setFormData] = useState({
      first: "",
      last: "",
      email: "",
      reason: "", 
      message: "",
      status: "",
      // Añade el campo reason en el estado del formulario
    });
    const { first, last, email, reason } = formData;
    const reasonOptions = [
      { value: "Most of my work is recruitment", label: "Most of my work is recruitment" },
      { value: "I lead recruitment teams", label: "I lead recruitment teams" },
      { value: "I'm a business leader", label: "I'm a business leader" },
      { value: "I'm just super curious", label: "I'm just super curious" },
    ];
    const handleSelect = (selectedValue) => {
      setFormData({ ...formData, reason: selectedValue });
    };
    const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [isModalOpen, setIsModalOpen] = useState(false); // State variable to track modal open/close
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL_2}/api/contact/`, formData);
  
        // Actualiza el estado 'status' según la respuesta del servidor
        setFormData({ ...formData, status: "success" });
  
  
        // Puedes realizar otras acciones según la respuesta, como mostrar un mensaje de éxito
      } catch (error) {
        // Maneja los errores aquí
        console.error("Error sending data:", error.response.data.email);
  
        // Muestra mensajes de error específicos si la respuesta indica un error
        if (error.response) {
          setErrors(error.response.data.errors); // Suponiendo que el servidor devuelve un objeto 'errors'
        } else {
          setErrors({ general: "An unexpected error occurred." }); // Error no relacionado con la respuesta del servidor
        }
  
        // Actualiza el estado 'status' según la respuesta del servidor
        setFormData({ ...formData, status: "error" });
      }
    };
  
    const emailAddress = 'hello@clous.app';
  const subject = 'Getting to know Clous';
  const message = 'I want a 1:1 to meet the team because...';

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;


    
    
  
    return (
      <main className="bg-[#fafafa] gap-4 flex">
        <section className="max-w-2xl text-xl lg:py-16 lg:pl-16 pr-4 bg-primary text-secondary flex flex-col rounded-r-3xl w-full justify-between
        ">

                    <div className="flex flex-col h-full justify-between">

<div className=" flex flex-col items-start gap-4 mb-8">

<Link to={mailtoLink} className="text-4xl font-medium cursor-pointer">
hello@clous.app
</Link>

<p className="text-4xl font-medium">
  28003 Madrid, Spain
</p>
</div>
         <div className=" flex gap-8 bottom-0 mt-6">
            <Link to="https://www.linkedin.com/company/cloushq/" target="_blank" className="w-20 h-20 rounded-full border-4 border-secondary flex justify-center items-center">
<IoLogoLinkedin className="w-12 h-12"/>


            </Link>
            <Link to="https://beta.clous.app/community" target="_blank" className="w-20 h-20 rounded-full border-4 border-secondary flex justify-center items-center">
            <IoLogoSlack className="w-12 h-12"/>


            </Link>
            <Link to="https://www.youtube.com/@cloushq" target="_blank" className="w-20 h-20 rounded-full border-4 border-secondary flex justify-center items-center">
            <IoLogoYoutube className="w-12 h-12"/>


            </Link>
            <Link to="https://www.youtube.com/@cloushq" target="_blank" className="w-20 h-20 rounded-full border-4 border-secondary flex justify-center items-center">
            <IoLogoTwitter className="w-12 h-12"/>


            </Link>

          </div>
          </div>


         
         {/* <div className="grid md:flex mt-4 items-center font-semibold gap-4 text-lg">

          <NormalButton name="Try our Beta" linkUrl="https://demo.clous.app"
              onClick={() => trackButtonClick("Demo")}/>
        <div onClick={openModal} className="flex gap-2 items-center cursor-pointer">
          <IoPlayCircle className="w-5 h-5"/> Watch our demo
  </div>
  </div>*/}
     
        </section>
        <section className="pl-16 pr-32 lg:py-16 w-full text-center">
        <div
        style={{
          boxShadow:
            '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        }}
        className="flex max-w-5xl -mt-12 mx-auto lg:h-[20rem] w-full max-w-xl border-1 lg:border-2 border-[#6C6C6C] p-1.5 lg:p-3 bg-[#222222] rounded-[30px] shadow-xl"
      >
        <div className="relative w-full h-full">
            <img className="w-full h-full rounded-2xl" src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="Clous Peer Launch on ProductHunt" loading="lazy"/>
            <button onClick={handleOpenModal} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg">
            <IoPlay className="w-5 h-5 text-secondary"/>
            </button>
          </div>
      </div>
          

          {/* Debería de abrirse vídeo del lanzamiento */}
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 px-24 py-24 z-50">
              <div className="w-full h-full p-4 rounded-3xl relative">
              
                <button onClick={handleCloseModal} className="absolute top-10 right-10 text-gray-600 z-20 bg-primary rounded-full p-3">
                <IoClose className="text-secondary w-6 h-6"/>
                </button>
                {/* YouTube video */}
                <iframe src="https://www.youtube.com/embed/I-L0WrMaVsg?si=4XrnNCsvGNw6wgRu" title="ClousH Alpha Launch on 21st February" frameBorder="0" autoPlay loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="w-full h-full rounded-3xl" allowFullScreen></iframe>
              </div>
            </div>
          )}
        
          <div className="flex flex-col font-semibold gap-6 text-xl justify-center items-center mt-8">
            <Link to="https://zcal.co/alvarovillalbaa/meet-clous" target="_blank" className="w-[20rem] cursor-pointer py-3 rounded-full bg-primary text-secondary px-4 hover:bg-opacity-85 transition:bg-opacity duration-500 delay-200">
              Meet the team

            </Link>
            {/*<Link to="https://beta.clous.app/job/demo/7c7f7475-7f7e-44bf-ad8d-7df0cf9b0894" target="_blank" className="w-[20rem] cursor-pointer py-3 rounded-full bg-dark-gray/5 text-dark-gray border px-4 hover:bg-dark-gray/10 transition:bg-color duration-500 delay-200">
            Join our waitlist
</Link>*/}
            
          </div>
          {/*<Card
            color="transparent"
            className="lg:mx-auto max-w-xl "
            shadow={false}
            >
            {formData.status === "success" ? (
              <div>
                <h3 className="text-xl lg:text-2xl text-dark-blue-greenish">Thanks for reaching out!</h3>
                <p className="text-sm lg:text-lg text-dark-blue-greenish">
                  We're already working super hard to get back to you as soon as possible. In the meantime, you can{" "}
                  <a href="https://www.clous.app/blog" className="text-primary border-b border-primary">
                    check our blog articles.
                  </a>
                </p>
              </div>
            ) : (
           
          
            <form className="mb-2">
              <div className="mb-2 flex flex-col gap-6">
                <div className="flex gap-4">
                  <Input
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
                  value={email}
                  onChange={(e) => onChange(e)}
                  name="email"
                  type="email"
                  required
                  label="Company Email"
                  color="orange"
                />
                
                <Select
  name="reason"
  value={reason}
  onChange={handleSelect} // Usa la función handleSelect
  label="What do you do?"
  color="orange"
>
  {reasonOptions.map((option) => (
    <Option key={option.value} value={option.value}>
      {option.label}
    </Option>
  ))}
</Select>
                <Textarea
                  id="message"
                  name="message"
                  value={message}
                  required
                  onChange={(e) => onChange(e)}
                  label="Why are you contacting us?"
                  color="orange"
  ></Textarea>
              </div>
              <div
                className="max-w-screen-sm text-sm text-left newsletter-form-footer
           dark:text-gray-300"
              >
                By clicking you agree to our{" "} 
                <Link
                  to="/privacy"
                  className="text-primary"
                >
                Privacy Policy.
                </Link>
              <BigButton name="Submit" type="submit" className="flex mr-auto text-secondary bg-primary mt-2"  />
              </div>
  

            </form>
        )}
  </Card>*/}
        </section>
        <div className="absolute bottom-32 right-32 w-[35rem]">

        <h3 className="text-xl font-normal text-center text-shade-gray">Backed us</h3>
      <section className="flex gap-6 md:justify-center items-center mt-4">
        <img width={130} src="https://clous.s3.eu-west-3.amazonaws.com/icons/Lanzadera.png" alt="Lanzadera partners with Clous" />
        <img width={50} className="rounded-full" src="https://clous.s3.eu-west-3.amazonaws.com/icons/IAT.webp" alt="IAT partners with Clous" />
        <img width={70} src="https://clous.s3.eu-west-3.amazonaws.com/icons/MIT.webp" alt="MIT partners with Clous" />
        <img width={110} src="https://clous.s3.eu-west-3.amazonaws.com/icons/Accenture.webp" alt="Accenture partners with Clous" />
      </section>
      </div>
 
      </main>
    );
  }
  