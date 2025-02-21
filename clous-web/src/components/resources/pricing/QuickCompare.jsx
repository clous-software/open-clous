import Lottie from "lottie-react";
import involveTwo from "assets/img/involve-team-v2.json";
import action from "assets/img/action.json";
import saveHours from "assets/img/save-hours.json";
import recurring from "assets/img/recurring.json";

const Services = () => {
  

  return (
    <main className="lg:py-6 lg:px-24 px-4 mt-16 lg:flex lg:flex-col text-center items-left">
    

       <h2 className="mb-2 text-xl tracking-tight font-semibold mx-auto mb-6">
        So, what tool is best for your hiring team?
              </h2>
      <section className="flex gap-16">
      <div className="flex gap-4 w-full rounded-3xl">
      <ul className=" flex flex-col gap-1 text-left items-left rounded-xl w-full">
          <h3 className="text-3xl">Reasons a competitor might be better for you (for now...)</h3>
          <li className="cursor-pointer mt-2 flex gap-1.5 items-center font-normal text-base">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <p className="mr-2">Multi-posting is essential to you, no matter how much you spend</p>
          </li>
          <li className="cursor-pointer mt-2 flex gap-1.5 items-center font-normal text-base">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <p className="mr-2">You need 100+ integrations to manage your workflow</p>
          </li>
          <li className="cursor-pointer mt-2 flex gap-1.5 items-center font-normal text-base">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <p className="mr-2">You want an AI avatar doing your job entirely</p>
          </li>
          <li className="cursor-pointer mt-2 flex gap-1.5 items-center font-normal text-base">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <p className="mr-2">You want to message candidates all day long</p>
          </li>
          
    
        </ul>
       {/*  <div className="mt-4">
      <Lottie className='w-16 h-16' animationData={recurring}/>
      <Lottie className='w-16 h-16 mr-8 ' animationData={saveHours}/> 
            </div>*/}
        </div>
        <div className="flex gap-4 w-full rounded-3xl px-4">
       {/* <div className="mt-4">
         <Lottie className='w-16 h-16' animationData={involveTwo}/>
        <Lottie className='w-16 h-16 ml-4 -mt-4' animationData={action}/> 
            </div>*/}
        
        
        <ul className=" flex flex-col gap-1 text-right items-left rounded-xl w-full">
          <h3 className="text-3xl">Reasons to choose Clous <br/> over other great tools</h3>
          <li className="cursor-pointer justify-end mt-2 flex gap-1.5 items-center font-normal text-base">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <p className="mr-2">You can start right away, no implementation hustles</p>
          </li>
          <li className="cursor-pointer justify-end mt-2 flex gap-1.5 items-center font-normal text-base">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <p className="mr-2">You care about candidate experience, a lot</p>
          </li>
          <li className="cursor-pointer justify-end mt-2 flex gap-1.5 items-center font-normal text-base">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <p className="mr-2">You prefer using one tool than 20 with integrations</p>
          </li>
          <li className="cursor-pointer justify-end mt-2 flex gap-1.5 items-center font-normal text-base">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <p className="mr-2">You believe every piece of data should be used</p>
          </li>
          
    
        </ul>
        </div>
      </section>
     </main>
  );
}

export default Services;
