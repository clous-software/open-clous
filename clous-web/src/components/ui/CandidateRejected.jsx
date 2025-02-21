const CandidateRejected = () => {
  return ( 
    <main className="flex flex-col border-none w-full h-full px-24 mt-12 lg:mt-0">
    
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 pb-4">
      <div className="border rounded-lg px-3 py-2 text-sm">
      <h3 className="font-semibold  text-lg">Lacks Master’s Degree

</h3>
        <p className="font-normal">in Engineering fields.</p>

      </div>
      <div className="border rounded-lg px-3 py-2 text-sm">
      <h3 className="font-semibold text-lg">No portfolio attached



</h3>
        <p className="font-normal">about their skills.</p>

      </div>
    </section>
    <section className="pt-8 pb-3 text-2xl text-muted font-semibold">
   Other jobs that better fit you
    </section>    
    <section className="space-y-2 pt-0 pb-6 ">
      <div className="border rounded-lg flex justify-start px-3 py-2 items-center">
        <img src="/favicon.ico" alt={""} className="rounded-lg"/>
      <h3 className="text-lg font-semibold ml-2">Software Engineer</h3>
      <h3 className=" font-medium ml-auto">Part-time</h3>
      
      </div>
      <div className="border rounded-lg flex  justify-start px-3 py-2 items-center hover:bg-dark-blue-greenish/5">
        <img src="/favicon.ico" alt={""} className="rounded-lg"/>
      <h3 className="text-lg font-semibold ml-2">Account Executive</h3>
      <h3 className=" font-medium ml-auto">Full-Time</h3>
      
      </div>
    </section>
  </main>
   );
}
 
export default CandidateRejected;