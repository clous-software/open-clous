import { Link } from "react-router-dom";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import mixpanel from "mixpanel-browser";
import { FiExternalLink } from "react-icons/fi";

export default function SectionTeam() {
  const trackButtonClick = (Property) => {
    mixpanel.track('Social Link', {
    Name : Property,
    Property: Property, });
  };

  return (
    <main className="py-16 flex flex-col text-left items-left px-4 lg:px-24">
      
      <section className="lg:flex justify-between">
        <ul className=" flex flex-col text-left items-left rounded-xl">
        <h2 className="mb-2 text-lg tracking-tight font-semibold max-w-4xl">
        Our team line-up
      </h2>
          <li className="cursor-pointer mt-2 flex text-3xl">
          <Link to="https://www.linkedin.com/in/alvarovillalbaperez/" className="font-semibold underAnimation" target="_blank">
          <h3 className="mr-2">Alvaro Villalba</h3>
        </Link>
            
          </li>
          
        
          <li className="cursor-pointer mt-2 flex text-3xl">
          <Link to="https://www.linkedin.com/in/pablo-roig-burgui-6204051ba/" target="_blank"  className="font-semibold underAnimation">
          <h3 className="mr-2">Pablo Roig</h3>
        </Link>
          </li>
        
          <li className="cursor-pointer mt-2 flex text-3xl">
          <Link to="https://www.linkedin.com/in/pablo-rodr%C3%ADguez-aracil-576010254/" target="_blank" className="font-semibold underAnimation">
          <h3 className="mr-2">Pablo Rodriguez</h3>
        </Link>
          </li>
          
        </ul>
        <Link to="https://clous-app.notion.site/Careers-Page-Clous-4283b0596d7b498ba955772f714a66b8?pvs=4" target="_blank" className="bg-primary rounded-3xl p-8 w-[30%] text-secondary group hidden lg:flex flex-col relative">
          <h2 className="text-2xl">
            Always looking for the best talent
          </h2>
          <p className="text-sm font-normal">
            We believe that talent is the key asset of any company. We&apos;re always looking for great talent to join our team.
          </p>
          <FiExternalLink className="w-6 h-6 text-secondary absolute -right-6 -top-6 group-hover:right-7 group-hover:top-8 transition-hover duration-500 delay-150"/>

        </Link>
        
      </section>
    </main>
  );
}
