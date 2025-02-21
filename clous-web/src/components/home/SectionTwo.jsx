const stats = [
  { id: 1, name: "culture fit", value: "+92%" },
  { id: 2, name: "time to fill", value: "-37%" },
  { id: 3, name: "candidate experience", value: "+65%" },
];

export default function Example() {

  return (
    <div className="bg-[#fafafa] py-16">
      <div className="max-w-full md:max-w-full  xl:px-16 2xl:px-24 px-4 2xl:max-w-full  py-8 lg:py-16">
        <div className="max-w-full mb-10 md:mx-auto md:text-center text-start lg:max-w-3xl md:mb-12">
          <h2 className=" text-dark-blue-greenish text-4xl font-semibold lg:mx-auto mb-4  dark:text-white">
            <span className="relative inline-block ">
              <svg viewBox="0 0 52 24" fill="currentColor" className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-orange-400 lg:w-32 lg:-ml-28 lg:-mt-10 lg:block">
                <defs>
                  <pattern id="18302e52-9e2a-4c8e-9550-0cbb21b38e55" x="0" y="0" width=".135" height=".30">
                    <circle cx="1" cy="1" r=".7"/>
                  </pattern>
                </defs>
                <rect fill="url(#18302e52-9e2a-4c8e-9550-0cbb21b38e55)" width="52" height="24"/>
              </svg>
              <span className="relative">Make </span>
            </span>{" "}
             great candidate <br/> experience a standard
          </h2>
          <p className=" text-dark-blue-greenish text-xl text-left">
          Only screen the candidates you can interview. 
          Choose the frequency to slot your interviews.
           AI transcribes and summarizes your interview notes.
          </p>
        </div>
        <div className="grid gap-2 xl:gap-8 sm:grid-cols-3 text-center lg:grid-cols-3 pb-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4 my-4 sm:my-1"
            >
              <dt className="font-semibold text-xl leading-7 text-dark-blue-greenish">
                {stat.name}
              </dt>
              <dd className="order-first  tracking-tight text-6xl text-transparent font-semibold bg-clip-text bg-gradient-to-r from-orange-300 to-button-orange transitions duration-300 ease-in-out  hover:bg-gradient-to-bl">
                {stat.value}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
