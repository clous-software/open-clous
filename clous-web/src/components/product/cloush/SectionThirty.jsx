import NegativeButton from "../../ui/NegativeButton";
import ticks from "assets/img/Ticks.png";
import valueProps from "assets/img/ValueProps.png";

function Thirty() {

    return (
        <main className="py-16 justify-center relative">
                    <h2 className="text-4xl lg:text-7xl font-semibold text-center mb-8 relative">For those who<br/> think different
                    <img src={ticks} className="absolute w-[5rem] right-[22%] -top-10" nofollow></img>
                    </h2>

          <section className="flex gap-8 mx-auto justify-center text-xl z-50">

<NegativeButton name="Join our community" target="_blank" linkUrl="https://join.slack.com/t/clouscommunity/shared_invite/zt-2g0jfas4z-wWJdlfVF_1wGAz85~sQWfw"
    />
    



<NegativeButton name="Try Clous Peer" target="_blank" linkUrl="https://beta.clous.app"/>

                
      </section>
      <img className="px-4 lg:px-24 mx-auto z-10" src="https://clous.s3.eu-west-3.amazonaws.com/images/Clous-Peer-Home.webp" alt="Clous Peer AI for Hiring Teams"></img>
      <img className="px-4 lg:px-24 mx-auto absolute bottom-60 z-20" src={valueProps} nofollow></img>
      
         
        </main>
      );
    }
  
  export default Thirty;