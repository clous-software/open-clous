import NormalButton from "../ui/NormalButton";

export default function Eror404() {
  return (
    <div className="w-full h-screen grid grid-cols-2 items-center justify-center px-24 text-dark-blue-greenish font-semibold">
      <div className="w-full flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
        <p className="text-7xl md:text-8xl lg:text-9xl tracking-wider">
          404
        </p>
        <p className="text-7xl tracking-wider mt-2">
          Page Not Found
        </p>
        <p className="text-xl my-12">
          Sorry, the page you are looking for could not be found.
        </p>
      <NormalButton name="Back to Home" linkUrl="/"/>
      </div>
      <div className="flex justify-center rounded-xl overflow-hidden">
        <img src="https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp" alt="ClousH Home"/>
      </div>
    </div>
  );
}
