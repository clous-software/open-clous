import { Link } from "react-router-dom";
import TextButtonWhite from "../ui/TextButtonWhite";

export default function CTA() {

  return (

      <main className="overflow-hidden rounded-lg bg-primary md:px-16 px-4 py-16 mb-16 text-secondary flex justify-between">
        <section className="max-w-xl mr-4"
        >
          <h2 className="text-3xl lg:text-5xl ">
          Efficient recruitment processes
          </h2>
          <p className="font-normal lg:text-lg mb-4 mt-1">
          Connect your favorite calendar and interviewing applications to automate your hiring process from resume screening to onboarding new hires.
          </p>
          <Link to="/get-quote" className="inline-flex">
           <TextButtonWhite name="Get quote" />
          </Link>
        </section>
        <section className="hidden lg:flex">
          <img className="rounded-lg "
            src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousATS.webp"
            alt="Hiring Costs per Hiring Process by Clous"
            width={480}
          />
        </section>
      </main>
  )
}