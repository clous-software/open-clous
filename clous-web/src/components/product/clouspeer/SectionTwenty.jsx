function Uvp() {
  return (
    <main className="py-12 my-16 px-4 lg:px-24 bg-beige-gray lg:flex gap-12">
      <section className="text-left flex flex-col justify-start items-start max-w-xl mb-8">
        <h2 className="text-3xl lg:text-5xl relative text-primary">
          Answer all of these questions (and more) with Clous Peer
        </h2>
      </section>
      <section className="relative">
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(242, 243, 240, 1), transparent)' }}></div>
        <ul className="text-xl text-[#F9A31A] relative z-0">
          <li>
            <p>What are the most qualified candidates for my open jobs?</p>
          </li>
          <li>
            <p>What are some jobs were candidates lack skills?</p>
          </li>
          <li>
            <p>What are the top 10 insights from interviews last month?</p>
          </li>
          <li>
            <p>Are there any relevant insights from the last 10 interviews?</p>
          </li>
          <li>
            <p>What candidates do you recommend for a Designer role?</p>
          </li>
          <li>
            <p>How can I improve my candidate experience?</p>
          </li>
          <li>
            <p>How many applicants applied in the last 30 days?</p>
          </li>
          <li>
            <p>How can I improve my hiring process?</p>
          </li>
          <li>
            <p>What are my next interviews?</p>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Uvp;
