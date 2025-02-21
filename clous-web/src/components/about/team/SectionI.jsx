import FeatureCard from "../../ui/FeatureCard";
function SectionI() {

  return (
    <section className="py-16 text-dark-blue-greenish justify-content-center text-center">
        <h2 className="text-3xl lg:text-5xl lg:mx-auto lg:max-w-xl mb-12">
          What’s the motivation behind Clous?
        </h2>
        <div className="grid gap-8 lg:grid-cols-3 grid-cols-1">
        <FeatureCard
        icon={ <img className='w-6' src='https://clous.s3.eu-west-3.amazonaws.com/icons/icon-1.webp' alt="Clous Icons"/>} 
        title="The founder story"
        description="Our founders met in a startup incubation program. In a follow-up video-call, they reconnected."
        />
        <FeatureCard
        icon={ <img className='w-6' src='https://clous.s3.eu-west-3.amazonaws.com/icons/icon-2.webp' alt="Clous Icons"/>} 
        title="Vision to accomplishments"
        description="To redefine how people find meaningful professional careers that lets them pursue their passions and live fulfilling lives."
        />


        <FeatureCard
        icon={ <img className='w-6' src='https://clous.s3.eu-west-3.amazonaws.com/icons/icon-3.webp' alt="Clous Icons"/>} 
        title="Missión to social impact"
        description="To transform the hiring process and accelerate human connection, leading to improved success and well-being for HR teams and job seekers."
        />   
      </div>
    </section>
  );
}

export default SectionI;