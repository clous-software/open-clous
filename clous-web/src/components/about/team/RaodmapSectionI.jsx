import { Link } from 'react-router-dom';

function RoadmapSection() {
  // why can't I change the line color?
  return (
    <section className="py-16 text-base px-24">
      
  
      <div className="relative  hidden lg:grid wrap overflow-hidden py-16 h-full">
        <div className="absolute border-[#F26C21] h-full border left-[50%]"></div>
        
        
        <div className="mb-8 flex justify-between items-center w-full right-timeline">
          <div className="order-1 w-6/12"></div>
          <div className="z-20 flex items-center order-1 bg-button-orange w-4 h-4 rounded-full"></div>
          <div className="order-1 pl-6 py-4 w-6/12 ">
            <div className="rounded-lg pl-6">
            <p className="  mb-1 ">May ‘23</p>

              <h2 className="mb-1 text-2xl lg:text-5xl fadeIn">MVP Launch</h2>
              <p className=" tracking-wide font-normal text-xl fadeOut">
              Last May we launched our Minimum Viable Product (MVP). We have always prioritized the user experience, so after months of testing and user research, our MVP is ready for recruiters. 
</p>            </div>
          </div>
        </div>
        
        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
          <div className="order-1 w-6/12"></div>
          <div className="z-20 flex items-center order-1 bg-button-orange  w-4 h-4 rounded-full"></div>
          <div className="order-1 pr-6 py-4 w-6/12">
            <div className="rounded-lg pr-6">
            <p className=" mb-1 ">Nov ‘23</p>

              <h2 className="mb-1 text-2xl lg:text-5xl">Demo Launch</h2>
              <p className="font-normal tracking-wide text-xl">
              The Launch Day of our Demo, November 2023. This is getting serious, we know what value we want to capture and we have found a way to realize it. We're off to the engine room so you'll soon be able to see what's being built in Clous.
              </p>
            </div>
          </div>
        </div>
        
        
        <div className="mb-8 flex justify-between items-center w-full right-timeline">
          <div className="order-1 w-6/12"></div>
          <div className="z-20 flex items-center order-1 bg-button-orange w-4 h-4 rounded-full"></div>
          <div className="order-1 pl-6 py-4 w-6/12">
            <div className="rounded-lg pl-6">
            <p className=" mb-1 "> Apr ‘23</p>

              <h2 className="mb-1 text-2xl lg:text-5xl">Social Media</h2>
              <p className="font-normal tracking-wide text-xl">
              April 2023 is the beginning of our social media strategy. We believe that we cannot do this without you, we want to create a community that shares our values, we want to listen to you and have you close to us. 
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
          <div className="order-1 w-6/12"></div>
          <div className="z-20 flex items-center order-1 bg-button-orange  w-4 h-4 rounded-full"></div>
          <div className="order-1 pr-6 py-4 w-6/12">
            <div className="rounded-lg pr-6">
            <p className=" mb-1 "> Mar ‘23</p>
              <h2 className="mb-1 text-2xl lg:text-5xl"> Website Revamp</h2>
              <p className="font-normal tracking-wide text-xl">
              March 2023 means a strategic change in our journey. We have updated our website, because it is an extension of our product and we want to improve the user experience. Although it is not just a renovation, it is our commitment to constant improvement. 

              </p>
            </div>
          </div>
        </div>
        <div className="mb-8 flex justify-between items-center w-full right-timeline">
          <div className="order-1 w-6/12"></div>
          <div className="z-20 flex items-center order-1 bg-button-orange  w-4 h-4 rounded-full"></div>
          <div className="order-1 pl-6 py-4 w-6/12 ">
            <div className="rounded-lg pl-6">
            <p className="mb-1">Feb ‘23</p>

              <h2 className="mb-1 font-semibold text-2xl lg:text-5xl">
                Website Launch
              </h2>
              <p className="font-normal text-xl tracking-wide">
              In February 2023, our engineering team finished developing our website – great news, because now we have a place where we can get to know each other. The creation of the website had two premises, that the design should be attractive but simple and that the navigation should be intuitive, you can tell us if we have achieved it.  
       </p>     </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoadmapSection;
