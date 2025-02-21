import { Link } from "react-router-dom";

const Navbanner = () => {
  return ( 
    <main className="bg-primary text-white text-sm text-center h-10 items-center flex justify-center ">
      <p className="font-normal ">It’d mean the world to us if you joined {""}
        <Link to="https://www.producthunt.com/products/cloush-demo" target="_blank" rel="noreferrer" className="font-semibold underAnimation">
         Clous Alpha launch
        </Link>
        {""}  on 13th February –  <Link to="/cloush-alpha-launch" target="_blank" className="font-semibold underAnimation 
">
         join here.
        </Link></p>
    </main>
   );
}
 
export default Navbanner;