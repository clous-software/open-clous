import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import mixpanel from "mixpanel-browser";
import TextButton from "../../ui/TextButton";
import NormalButton from "../../ui/NormalButton";
// this popup should also open on the HeroTeams.js

export default function PopUp() {
  const trackButtonClick = (Property) => {
    mixpanel.track('Program Link', {
    Name : Property,
    Property: Property, });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    message: "",
    company: "",
  });
  const { name, email, industry, message, company } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append("name", name);
    newFormData.append("email", email);
    newFormData.append("industry", industry);
    newFormData.append("message", message);
    newFormData.append("company", company);
    try {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/formularios/teams`,
          newFormData
        )
        .then((response) => {
          setFormData({
            name: "",
            email: "",
            industry: "",
            message: "",
            company: "",
            status: "success",
          });
        });
    } catch (error) {
      setFormData({ status: "error" });
    }
  };

  return (
    <main className="my-16  lg:px-0 p-12 lg:my-24 lg:flex justify-between shadow-none rounded-lg text-secondary bg-primary gap-8">
      <section className="text-center lg:text-start lg:pl-16 pb-10">
        <h2 className="text-3xl lg:text-5xl ">
          Support program for recruiters
        </h2>
        <p className="flex justify-center lg:justify-start items-center font-normal text-base xl:text-lg">
          <span className="text-4xl mr-2">•</span> 
          Must be an HR professional with proven experience in the field.
        </p>

        <p className="flex justify-center lg:justify-start items-center font-normal text-base xl:text-lg">
          <span className="text-4xl mr-2">•</span>
          Not be a subscriber of any of our plans.
        </p>

        <p className="flex justify-center lg:justify-start items-center font-normal text-base xl:text-lg">
          <span className="text-4xl mr-2">•</span>
          Should provide us product feedback at least once a month.
        </p>
        <p className="flex justify-center lg:justify-start items-center font-normal text-base xl:text-lg">
          <span className="text-4xl mr-2">•</span>
          You can apply to as many cohorts as you like!
        </p>

        <Link to="https://www.notion.so/clous-app/HR-Supporters-Program-68e07ddff8da453daa70a2ad573852e9" className="text-primary inline-flex text-lg"
          target="_blank"
          onClick={() => trackButtonClick("HR Supporters")}
              >
                <TextButton name="Check the program conditions" />
            </Link>
      </section>
      <section className="flex item-center justify-center pr-12">
        <form
          className="space-y-2 w-[27rem]"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <Input
            className="focus:outline-none placeholder-shown:border-t-white placeholder-shown:border-white"
            label="Full Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            type="name"
            required
            color="white"
          />
          <Input
            className="focus:outline-none placeholder-shown:border-t-white placeholder-shown:border-white"
            id="email-address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            required
            label="Company Email"
            color="white"
          />{" "}
          <Input
            className="focus:outline-none placeholder-shown:border-t-white placeholder-shown:border-white"
            id="company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            type="company"
            required
            label="Size Company"
            color="white"
          ></Input>
          <Input
            className="focus:outline-none placeholder-shown:border-t-white placeholder-shown:border-white"
            name="industry"
            value={industry}
            onChange={(e) => onChange(e)}
            type="industry"
            required
            label="What is your industry?"
            color="white"
          ></Input>
          <div className="relative w-full min-w-[200px]">
            <textarea
              name="message"
              type="message"
              required=""
              value={message}
              onChange={(e) => onChange(e)}
              className="peer w-full h-full bg-transparent text-blue-white font-sans font-normal outline outline-0 focus:outline-0  disabled:bg-white disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-t-white placeholder-shown:border-white border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-white focus:border-white !resize-none"
              placeholder=" "
            ></textarea>
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-white leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-white peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white">
              Message
            </label>
          </div>
          <p className="mb-3 -mt-3 text-sm font-[500] text-white">
          By clicking you agree to our{" "}<Link
              to="/privacy"
              className="border-b"
            >
            Privacy Policy.
            </Link>
          </p>
          <NormalButton name="Submit"  className="text-center text-lg bg-dark-blue-greenish w-full flex justify-center"
           />
        </form>
      </section>
    </main>
  ); 
}
