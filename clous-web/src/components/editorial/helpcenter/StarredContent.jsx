import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";

function StarredContent() {
 

  return (
    <section className="py-48 grid grid-cols-2 gap-y-24 px-24 gap-x-12">
        <Link to="https://pitch.com/public/5018d92f-2e42-4c55-8bef-571816f82d70" target="_blank" className=" relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
        >
          <div className="rounded-lg">
         <img
                className="rounded-xl h-[25rem] w-[100%] object-cover"
                src="https://clous.s3.eu-west-3.amazonaws.com/images/people.webp"
                alt="Clous Culture values Sustainability – Clous Mission Manifestos"
              />
          
            <div className="justify-start items-center">
            <p className="text-primary inline-flex text-center text-lg
             rounded-lg mt-6
            "
              >
                Sustainability
              </p>

              <h3 className="text-lg lg:text-4xl ">
                Caring for our A planet
              </h3>
              
              
            </div>
          </div>
        </Link>
        <Link to="https://pitch.com/public/da511b0f-d3ae-4f8d-88df-8ce95342c0c1" target="_blank" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
         >
          <img
                className="w-full h-[25rem] rounded-xl object-cover"
                src="https://clous.s3.eu-west-3.amazonaws.com/images/ethical.webp"
                alt="Clous Culture values Ethical AI  – Clous Mission Manifestos"
              />
           
            <div className="justify-center items-center">
            <p className="text-primary inline-flex text-center text-lg
             rounded-lg mt-6
            "
              >
                AI
              </p>
              <h3 className="text-xl lg:text-4xl">
                {" "}
                Secure tech development
              </h3>
           
             
            </div>

        </Link>
    
    </section>
  );
}

export default StarredContent;