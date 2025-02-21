import { Link } from "react-router-dom";

const Data = [
  {
    id: 1,
    question: "What service do you provide?",
    answer:
      "We provide a SaaS (Software as a Service) that helps businesses improve their hiring process, no matter what their size is. With our product, you will be able to reward your employees when they help you reduce hiring costs.",
  },
  {
    id: 2,
    question: "How much does it cost?",
    answer:
      "There is a free package which includes one hiring process for life. After this, you are able to upgrade your workspace to the standard package for unlimited features. These may vary if you have a ‘Clous Early Pass’.",
  },
  {
    id: 3,
    question: "When does my free account expire?",
    answer:(
      <p>
        It does not expire. It is free, forever. In Clous, we firmly believe that everyone in the world should be able to try products for free. You can{" "}
        <Link to="/contact" className="text-button-orange">
          contact sales
        </Link>{" "}
        if you need further help.
      </p>
    ),
  },
  {
    id: 4,
    question: "Do you have a special program for startups?",
    answer:
      "Indeed we do. You can get -50% off every product in the Clous suite. We were once a startup, now we help others.",
  },
  {
    id: 5,
    question: "Do I need to hire an HR professional for your service?",
    answer:
      "Of course not. Our objective is to empower every professional to achieve their goals. In case you need one, our HR professionals will advise and guide you through the entire process.",
  },
  {
    id: 6,
    question: "How many employees do I need?",
    answer:
      "You can start even self-employed. Managing human capital and resources must be done from day one.",
  },



];
export default Data;