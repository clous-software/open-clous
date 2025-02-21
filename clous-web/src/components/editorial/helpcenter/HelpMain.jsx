import { Link } from "react-router-dom";

const AccountContent = () => {

    return ( 
      <main className="w-full py-16 justify-center font-semibold">
        <h1 className="font-bold text-8xl text-center">
          Help Desk
        </h1>
        <section className="py-16 grid grid-cols-2 gap-y-24 px-24 gap-x-12">
        <Link to="/help-center/getting-started" className=" relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
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
                Getting started
              </p>

              <h3 className="text-lg lg:text-4xl ">
                Caring for our A planet
              </h3>
              
              
            </div>
          </div>
        </Link>
        <Link to="/help-center/subscriptions" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
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
                Subscriptions
              </p>
              <h3 className="text-xl lg:text-4xl">
                {" "}
                Secure tech development
              </h3>
           
             
            </div>

        </Link>
        <Link to="/help-center/account" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
        >
          <img
                className=" w-full h-[25rem] rounded-xl object-cover"
                src="https://clous.s3.eu-west-3.amazonaws.com/images/tecnology.webp"
                alt="Clous Culture values Unbiased technology  – Clous Mission Manifestos"
              />
          
            <div className="justify-center items-center">
            <p className="text-primary inline-flex text-center text-lg
             rounded-lg mt-6
            "
              >
                Account
              </p>
              <h3 className="text-xl lg:text-4xl">
                {" "}
                Unbiased people analytics
              </h3>
            
             
            </div>

            
        </Link>
        <Link to="/help-center/team" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
        >
          <img
                className=" w-full h-[25rem] rounded-xl object-cover"
                src="https://clous.s3.eu-west-3.amazonaws.com/images/diversity.webp"
                alt="Clous Culture values Diversity – Clous Mission Manifestos"
              />
           
            <div className="justify-center items-center">
            <p className="text-primary inline-flex text-center text-lg
             rounded-lg mt-6
            "
              >
                Team
              </p>
              <h3 className="text-xl lg:text-4xl">
                {" "}
                Be proud of your culture
              </h3>
            
            </div>

           
        </Link>
        <Link to="/help-center/product" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
        >
              <img
                className=" w-full h-[25rem] rounded-xl object-cover"
                src="https://clous.s3.eu-west-3.amazonaws.com/images/equality.webp"
                alt="Clous Culture values Equality – Clous Mission Manifesto"
              />
            <div className="justify-center items-center">
            <p className="text-primary inline-flex text-center text-lg
             rounded-lg mt-6
            "
              >
                Product
              </p>
              <h3 className="text-xl lg:text-4xl">
                {" "}
                We are all humans
              </h3>
              
            </div>

            
        </Link>
        <Link to="/help-center/integrations" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
        >
              <img
                className=" w-full h-[25rem] rounded-xl object-cover"
                src="https://clous.s3.eu-west-3.amazonaws.com/images/equality.webp"
                alt="Clous Culture values Equality – Clous Mission Manifesto"
              />
            <div className="justify-center items-center">
            <p className="text-primary inline-flex text-center text-lg
             rounded-lg mt-6
            "
              >
                Integrations
              </p>
              <h3 className="text-xl lg:text-4xl">
                {" "}
                We are all humans
              </h3>
              
            </div>

            
        </Link>
        <Link to="/help-center/security" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
        >
              <img
                className=" w-full h-[25rem] rounded-xl object-cover"
                src="https://clous.s3.eu-west-3.amazonaws.com/images/equality.webp"
                alt="Clous Culture values Equality – Clous Mission Manifesto"
              />
            <div className="justify-center items-center">
            <p className="text-primary inline-flex text-center text-lg
             rounded-lg mt-6
            "
              >
                Security
              </p>
              <h3 className="text-xl lg:text-4xl">
                {" "}
                We are all humans
              </h3>
              
            </div>

            
        </Link>
       
    
    </section>
      </main>
     );
  }
   
  export default AccountContent;