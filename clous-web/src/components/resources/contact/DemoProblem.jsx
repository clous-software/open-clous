const DemoProblem = () => {
  return ( 
    <main className="flex flex-col justify-center text-center p-2 lg:p-24 gap-8">
      {/*<h2 className="text-3xl lg:text-5xl">
      #buildinpublic video series      
  </h2>*/}
      <div className="flex justify-center">
      <iframe  src="https://www.youtube.com/embed/welKQJq0ffk?si=2xJuzP_QhdNunxPs" title="ClousH Alpha Launch" frameBorder="0" autoplay allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           className="w-full h-[40rem] rounded-lg" allowFullScreen></iframe>
      </div>
    </main>
   );
}
 
export default DemoProblem;