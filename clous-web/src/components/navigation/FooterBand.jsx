import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import NormalButton from "components/ui/NormalButton";
import mixpanel from "mixpanel-browser";

export default function FooterBand() {
  const trackButtonClick = (Property) => {
    mixpanel.track('Showcase Link', {
    Name : Property,
    Property: Property, });
  };
  const [formData, setFormData] = useState({
    email: "",
  });
  const {email } = formData;
  axios.defaults.withCredentials = true;

  setTimeout(() => {
    setFormData({
      email: "",
      status: undefined,
    });
  }, 5000); // Reset status after 5 seconds (adjust as needed)
  

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append("email", email);

    try {
      axios
        .post(
          `${process.env.REACT_APP_API_URL_2}/api/waitlist/`,
          newFormData
        )
        .then((response) => {
          setFormData({
            ...formData, status: "success" 
          });
        });
    } catch (error) {
      setFormData({ status: "error" });
    }
  };

  return (
    <main id="footerband" className="text-center justify-center gap-8 py-48 px-2 lg:px-24">
      <h2 className="mb-12 tracking-tight font-semibold text-4xl lg:text-8xl dark:text-white fadeIn">
            Join our waitlist, <br/> get early access
          </h2>

      <section className="text-center justify-center mx-auto w-full lg:w-[30rem]">
      {formData.status === "success" ? (
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
          className="space-y-2"
          onSubmit={onSubmit}
        >

          <Input
            className="focus:outline-none placeholder-shown:border-t-gray placeholder-shown:border-gray"
            id="email-address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            required
            label="Company Email"
            color="orange"
          />{" "}
         
          <p className="mb-3 -mt-3 text-sm text-left font-normal text-dark-blue-greenish">
          By clicking you agree to our{" "}<Link
              to="/privacy"
              className="border-b font-medium"
            >
            Privacy Policy.
            </Link>
          </p>
          <NormalButton name="Submit"  className="text-center text-lg bg bg-primary text-white w-full flex justify-center mt-2"
           />
        </form>
            )}

   {/* <iframe src="https://clouspeople.substack.com/embed" width="480" title="Clous News" className="h-40" onClick={() => trackButtonClick("Substack")}
>
      
      </iframe>*/}
      </section>
    </main>
  );
}



  
     