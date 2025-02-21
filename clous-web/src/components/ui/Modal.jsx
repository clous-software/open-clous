import Modal from 'react-modal';
import { X } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import NormalButton from "components/ui/NormalButton";
import mixpanel from "mixpanel-browser";
Modal.setAppElement('#root');

const ModalCheck = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const {email } = formData;
  axios.defaults.withCredentials = true;


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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      className="
       w-full h-full relative flex justify-center items-center border-0 focus:border-0"
       >
       <button onClick={onRequestClose} className='absolute top-4 right-4 rounded-lg border p-2'><X className='w-7 h-7'/></button>
      <div className="bg-secondary shadow-xl p-8 rounded-2xl">
      <h2 className="mb-8 tracking-tight font-semibold text-2xl lg:text-5xl dark:text-white fadeIn">
            Join our waitlist, <br/> get early access
          </h2>
         
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
          className="space-y-2 w-[27rem]"
          onSubmit={(e) => {
            onSubmit(e);
          }}
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
         
          <p className="mb-3 -mt-3 text-sm font-medium text-dark-blue-greenish">
          By clicking you agree to our{" "}<Link
              to="/privacy"
              className="border-b"
            >
            Privacy Policy.
            </Link>
          </p>
          <NormalButton name="Submit"  className="text-center text-lg bg bg-primary text-white w-full flex justify-center"
           />
        </form>
            )}
      </div>
    </Modal>
  );
}

export default ModalCheck;
