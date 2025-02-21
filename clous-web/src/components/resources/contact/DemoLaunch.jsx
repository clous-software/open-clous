const DemoLaunch = () => {
  return ( 
    <main className="flex flex-col justify-center text-center p-2 lg:p-24 gap-8" loading="lazy">
      {/*<h2 className="text-3xl lg:text-5xl">
      #buildinpublic video series      
  </h2>*/}
      <div className="flex justify-center px-4 lg:px-0">
      <iframe  src="https://www.youtube.com/embed/I-L0WrMaVsg?si=0gi25APci3GYTenx" title="ClousH Alpha Launch on 21st February" frameBorder="0" autoPlay loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           className="w-full lg:h-[40rem] h-[20rem] rounded-lg" allowFullScreen></iframe>
      </div>
    </main>
   );
}
 
export default DemoLaunch;