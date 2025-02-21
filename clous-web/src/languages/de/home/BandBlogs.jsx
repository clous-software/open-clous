import { Link } from "react-router-dom";
import NegativeButton from "../../../components/ui/NegativeButton";

function BandBlogs() {
  return (
    <main className="mb-32">
      <ul  className="pt-48 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-y-24 px-2 lg:px-24 gap-x-12">
      <Link to="https://www.clous.app/blog/a9f1532f-427b-43a3-9734-6a1c3d565866" target="_blank" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
        >
          <div className="rounded-lg">
         <img
                className="rounded-xl h-[25rem] w-[100%] object-cover"
                src="https://clous.s3.eu-west-3.amazonaws.com/editorial/blog/Blog_10006/Cover_10006.webp"
                alt="Talent Acquisition vs Headhunting by Clous"
              />
          
            <div className="justify-start items-center">
            <p className="text-primary inline-flex text-center text-lg
             rounded-lg mt-6
            "
              >
                Blogs
              </p>

              <h3 className="text-4xl ">
              Wie wird das Jahr 2024 im Talentmanagement sein
              </h3>
              
              
            </div>
          </div>
        </Link>
        <Link to="https://www.clous.app/clous-wiki/70d5aef4-ecd3-404d-ab84-3bb5e9e66e58" target="_blank" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
        >
          <img
                className="w-[100%] h-[25rem] rounded-xl object-cover"
                src="https://clous.s3.eu-west-3.amazonaws.com/editorial/news/Covernews_10001.png"
                alt="Automate Hiring Workflows by Clous"
              />
           
            <div className="justify-center items-center">
            <p className="text-primary inline-flex text-center text-lg
             rounded-lg mt-6
            "
              >
                Wiki
              </p>
              <h3 className="text-4xl">
                {" "}
                Clous beginnt zu operieren

              </h3>
           
             
            </div>

        </Link>
       
    </ul>
    <div className="mx-auto justify-center flex">
    <NegativeButton name="Alle blogs" linkUrl="/blog"/>
    </div>
    </main>
    );
}

export default BandBlogs