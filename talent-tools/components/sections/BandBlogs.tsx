"use client";
import Link from 'next/link';
import NegativeButton from "@/components/ui/NegativeButton";
import Image from 'next/image';

const BandBlogs = () => {
  return (
    <main className="mb-32">
      <ul className="pt-24 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-y-24 px-2 lg:px-24 gap-x-12">
        <Link href="https://www.clous.app/blog/a9f1532f-427b-43a3-9734-6a1c3d565866" target="_blank" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
        >
          <div className="rounded-lg">
            <img
              className="rounded-xl h-[25rem] w-[100%] object-cover"
              src="https://clous.s3.eu-west-3.amazonaws.com/editorial/blog/Blog_10006/Cover06-Recruitment_strategies_evolution_in_2024.webp"
              alt="Talent Acquisition vs Headhunting by Clous"
            />

            <div className="justify-start items-center">
              <p className="text-primary inline-flex font-medium mt-6
            "
              >
                Blogs - Recruitment
              </p>

              <h2 className="text-4xl">
                What Is Coming for Recruitment in 2024
              </h2>

              <p className="mt-4 font-medium">
                6 February, 2024 · 9 min read
              </p>
            </div>
          </div>
        </Link>
        <Link href="http://www.clous.app/clous-wiki/e7da1dec-ee72-422c-9c1c-5423ec1f2bde" target="_blank" className="relative overflow-hidden transition duration-500 rounded-lg lg:hover:text-primary group-hover:shadow-xl"
        >
          <img
            className="w-[100%] h-[25rem] rounded-xl object-cover"
            src="https://clous.s3.eu-west-3.amazonaws.com/editorial/news/Covernews_10003.webp"
            alt="Automate Hiring Workflows by Clous"
          />

          <div className="justify-center items-center">
            <p className="text-primary inline-flex font-medium mt-6
            "
            >
              Wiki - Launch
            </p>
            <h2 className="text-4xl">
              {" "}
              Clous Demo now accessible from our website
            </h2>
            <p className="mt-4 font-medium">
              22 November, 2023 · 2 min read
            </p>

          </div>

        </Link>

      </ul>
      <div className="mx-auto justify-center flex">
        <NegativeButton name="All blogs" linkUrl="/blog" className="bg-primary text-secondary" target="_blank" onClick={() => { }} />
      </div>
    </main>
  );
}

export default BandBlogs;