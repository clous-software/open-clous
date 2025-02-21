import { Link } from "react-router-dom";

export default function Maintenance() {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center 
     space-x-8 2xl:space-x-0">
    <div className="w-full flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-dark-blue-greenish lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">Under Construction</h1>
        <p className="font-light my-8 text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
        “We’re working hard to make this website page available. 
      </p>
      <Link
          to="/"
          className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-gray-100 px-4 py-2 rounded-lg transition duration-150"
          title="Return Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Return Home</span>
        </Link>
    </div>
</div>
  );
}
