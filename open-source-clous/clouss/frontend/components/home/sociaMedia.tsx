import { FaLinkedinIn, FaProductHunt, FaXTwitter, FaYoutube } from "react-icons/fa6";
import mixpanel from "mixpanel-browser";
import Link from "next/link";

const SocialMedia = () => {
  const trackButtonClick = (buttonName: string) => {
    mixpanel.track(`Link ${buttonName}`);
  };
  return ( 
    <section className="gap-4 grid grid-cols-4 overflow-x-auto">

      <Link href="https://www.twitter.com/@cloushq" rel="follow" target="_blank" className="text-dark-blue-greenish transition hover:text-button-orange"
          onClick={() => trackButtonClick(" - Clous Twitter")}>
        <FaXTwitter className="w-6 h-6"/>
      </Link>

      <Link href="https://www.linkedin.com/company/cloushq" rel="follow" target="_blank" className="text-dark-blue-greenish transition hover:text-button-orange"
      onClick={() => trackButtonClick(" - Clous Linkedin")}
      >
      <FaLinkedinIn className="w-6 h-6"/>
      </Link>

      <Link href="https://www.producthunt.com/products/cloush-demo" rel="follow" target="_blank" className="text-dark-blue-greenish transition hover:text-button-orange"
      onClick={() => trackButtonClick(" - Clous Product Hunt")}
      >
      <FaProductHunt className="w-6 h-6"/>
      </Link>
    
      <Link href="https://www.youtube.com/channel/UCR9yFOwMPYCPsB8GfyR8ewg" rel="follow" target="_blank" className="text-dark-blue-greenish transition hover:text-button-orange"
      onClick={() => trackButtonClick(" - Clous Youtube")}
      >
      <FaYoutube className="w-6 h-6 "/>
      </Link>
    

        </section>
   );
}
 
export default SocialMedia;