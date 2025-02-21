import { Link } from "react-router-dom";
import TextButtonWhite from "../../ui/TextButtonWhite";

export default function ContactBand() {

  return (

      <main className="overflow-hidden rounded-lg bg-primary md:pl-16 pl-4 py-16 my-16 text-secondary flex">
        <section className="max-w-2xl"
        >
          <h2 className="text-3xl lg:text-5xl ">
          Efficient hiring operations
          </h2>
          <p className="font-normal lg:text-lg my-2">
          Connect your favorite applications to automate your hiring processes. From hiring to taking decisions in the HR team.
          </p>
          <Link to="/cloush" className="inline-flex"
            >
           <TextButtonWhite name="Get quote"/>          </Link>
        </section>
        <section className="hidden lg:flex  ml-auto">
          <img className="rounded-l-lg "
            src='https://clous.s3.eu-west-3.amazonaws.com/images/deiFunnel.webp'
            alt="Hiring Costs per Hiring Process by Clous"
            width={480}
          />
        </section>
      </main>
  )
}