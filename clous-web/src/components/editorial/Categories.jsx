import { Link } from "react-router-dom";

const EditorialCategories = () => {
  return ( 
    <main className="flex justify-center py-12">
      <ul className="flex gap-4 text-xl font-normal">
      <li className="border rounded-full px-3 py-2 hover:bg-primary hover:text-white">
      <Link to="">
        Blogs
        </Link>
      </li>
      <li className="border rounded-full px-3 py-2 hover:bg-primary hover:text-white">

      <Link to="">
        HR Talks
        </Link>
      </li>
      <li className="border rounded-full px-3 py-2 hover:bg-primary hover:text-white">

      <Link to="">
        Guides
        </Link>
      </li>
      <li className="border rounded-full px-3 py-2 hover:bg-primary hover:text-white">

      <Link to="">
        News
        </Link>
      </li>
      
      {/* <li className="border rounded-full px-3 py-2 hover:bg-primary hover:text-white">

      <Link to="/research">
        Research
        </Link>
      </li> */}
      
      </ul>
    </main>
   );
}
 
export default EditorialCategories;