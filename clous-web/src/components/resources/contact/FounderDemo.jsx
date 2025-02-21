const FounderDemo = () => {
  return ( 
    <main className="flex flex-col justify-center text-center p-2 lg:px-24 gap-8">
      {/*<h2 className="text-3xl lg:text-5xl">
      #buildinpublic video series      
  </h2>*/}
      <div className="flex justify-center">
      <iframe  src="https://www.youtube.com/embed/m9bO_fpieOY?si=CEJJru3K6S8YieE2&lite=true" title="ClousH Alpha Launch" frameBorder="0" autoplay allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           className="w-full lg:h-[40rem] h-[20rem] rounded-lg" allowFullScreen loading="lazy"></iframe>
      </div>
    </main>
   );
}
 
export default FounderDemo;