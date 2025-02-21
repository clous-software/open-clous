import React, { useEffect, useState } from 'react';
import NormalButton from '../ui/NormalButton';
import { Link } from "react-router-dom";
import TextButton from "components/ui/TextButton";

const Roi = () => {
  const rangeValues = [100, 125, 200, 400, 600, 800, 1200, 1700, 2500];
  const [savedMinutes, setSavedMinutes] = useState(0);
  const [formData, setFormData] = useState({
    interviewed: 10,
    hires: 4,
    interviews: 2,
    aplicants: 100,
    team: 1,
  });

  const handleRangeChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setFormData({ ...formData, aplicants: rangeValues[selectedValue] });
  };

  const handleInterviewedChange = (event) => {
    const { value } = event.target;
    const newInterviewed = isNaN(value) ? 10 : Math.min(Math.max(value, 10), 125);
    setFormData({ ...formData, interviewed: newInterviewed });
  };

  const handleInterviewsChange = (value) => {
    
    setFormData({ ...formData, interviews: value });
  };
 
  const handleTeamChange = (value) => {
    setFormData({ ...formData, team: value });
  };
  
  const handleHiresChange = (event) => {
    const { value } = event.target;
    const newHires = isNaN(value) ? 4 : Math.min(Math.max(value, 4), 25);
    setFormData({ ...formData, hires: newHires });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    try {
    } catch (error) {
      console.error(error);
    }
  };

  const { interviewed, interviews, aplicants, team, hires } = formData;

  useEffect(() => {
    const calculateInterviewValue = () => {
      if (formData.aplicants >= 100 && formData.aplicants <= 400) {
        return 0.1;
      } else if (formData.aplicants >= 600 && formData.aplicants <= 2500) {
        return 0.5;
      }
      return 0; // Valor por defecto si no cumple ninguna condición
    };
    calculateInterviewValue();
    const calculatedMinutes = (
      (formData.aplicants * 5) +
      (formData.interviews * formData.interviewed * 3) +
      (15 * formData.team * formData.interviews * formData.interviewed) +
      (formData.interviewed * (1 + 8))
    ) * formData.hires;
  
    setSavedMinutes(parseFloat(calculatedMinutes.toFixed(2))); // Limitar a dos decimales
  }, [formData.aplicants, formData.interviews, formData.interviewed, formData.team, formData.hires])
  const savedHours = savedMinutes / 60;
  
  const savedAnually = savedHours * 25;
  const roundedSavedAnually = Math.round(savedAnually); // Round the value


  return ( 
    <main className="w-full flex gap-8 justify-between items-between align-between py-32 my-12 px-4 lg:px-24" id="roi">
      <aside className='border border-primary rounded-xl pl-6 w-2/3 py-6 h-full bg-primary text-white'>
          <h2 className='text-5xl mb-6'>Your savings</h2>
        <p className='flex gap-2 text-xl items-end my-4'> <span className='text-5xl'>{savedMinutes}</span><span> minutes</span></p>
          <p className='flex gap-2 my-4 text-xl items-end'><span className='text-5xl'>{savedHours.toFixed(0)}</span><span> hours</span> </p>
          <p className='flex gap-2 my-4 text-xl items-end'><span className='text-5xl'> {roundedSavedAnually.toFixed(0)}€</span><span> yearly</span> </p>
          <Link to="https://beta.clous.app/quote" target="_blank" className="cursor-pointer bg-[#333333] rounded-2xl py-3 text-secondary text-xl justify-center flex mt-12 mr-6">
            Request quote

            </Link> 
 </aside>
      {/*<section className="md:max-w-3xl h-full py-16 md:mx-auto items-center md:text-center">
        <h1 className="font-bold text-4xl md:text-8xl mb-12">
        Save with every hire       </h1>
        <p className="font-normal text-lg md:text-xl mt-2 mb-4 mx-auto">
        Our teams keep return on investment at the top of mind for our customers.

  </p>
        <div className="grid md:flex md:justify-center items-center gap-4 text-lg">

          <NormalButton name="Try Clous free" linkUrl="https://demo.clous.app" target="_blank"
              />
        <div className="flex gap-2 items-center cursor-pointer">
        <Link
                  to="/contact"
                >
                  
                  <TextButton name="Contact sales"/>
                </Link>
</div>
      </div>
      </section>*/}
      <form className='w-1/3 border rounded-3xl p-8'
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
      <section className=" flex w-full gap-8">
        <ul className=' grid grid-cols-1 gap-8'>
        <li className='w-full rounded-xl'>
        <h3 className='text-xl mb-2'>How many applicants per job opening?</h3>
          <div className='flex items-center gap-6'>
          <p className='text-lg'>100</p>
        <input 
          className="rounded-full w-full"
          type="range"
          min="0"
          max={rangeValues.length - 1}
          value={rangeValues.indexOf(aplicants)}          
          onChange={handleRangeChange}
          style={{
            background: `linear-gradient(to right, #F26C21 ${(rangeValues.indexOf(aplicants) / (rangeValues.length - 1)) * 100}%, #d3d3d3 ${(rangeValues.indexOf(aplicants) / (rangeValues.length - 1)) * 100}%)`,
            appearance: "none",
            height: "10px",
            borderRadius: "5px",
            outline: "none",
            padding: "0",
            margin: "0",
            zIndex: "1",
          }}

          />
          <p className='text-lg'>2500+</p>

          </div>
          <div className="mt-2 text-xl font-medium text-center"><span className='font-bold'>{aplicants}</span> applicants</div>
        </li>
        <li className=''>
        <h3 className='text-xl mb-2'>How many interviews do you carry out?</h3>
              <div className='grid grid-cols-3 gap-6 items-center text-center'>
                {[ 2, 3, 4].map((value) => (
                  <p
                    key={value}
                    className={`py-2.5 cursor-pointer text-xl font-semibold border rounded-xl ${
                      interviews === value ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => handleInterviewsChange(value)}
                  >
                    {value}
                  </p>
                ))}
              </div>
        </li>
        
        <li className=' w-full rounded-xl'>
        <h3 className='text-xl mb-2'>How many interviews do you need to onboard a new hire?</h3>
<div className='flex items-center gap-6'>


<p className='text-lg'>10</p>
<input
        className='w-full text-xl'
        type="range"
        min="10"
        max="125"
        value={interviewed}
        onChange={handleInterviewedChange}
        style={{
          background: `linear-gradient(to right, #F26C21 ${((formData.interviewed - 10) / (125 - 10)) * 100}%, #d3d3d3 ${((formData.interviewed - 10) / (125 - 10)) * 100}%)`,
          appearance: "none",
          height: "10px",
          borderRadius: "5px",
          outline: "none",
          padding: "0",
          margin: "0",
          zIndex: "1",
        }}
      />
<p className='text-lg'>125+</p>

</div>
<div className="mt-2 text-xl font-medium text-center"><span className="font-bold">{formData.interviewed}</span> interviews per hire</div>
        </li>
        <li className=''>
        <h3 className='text-xl mb-2'>How many team members are involved during interviews?</h3>
              <div className='grid grid-cols-3 gap-6 items-center text-center'>
                {[1, 2, 3].map((value) => (
                  <p
                    key={value}
                    className={`py-2.5 cursor-pointer text-xl font-semibold  border rounded-xl ${
                      team === value ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => handleTeamChange(value)}
                  >
                    {value}
                  </p>
                ))}
              </div>
        </li>
        <li className=' w-full rounded-xl'>
        <h3 className='text-xl mb-2'>How many new hires do you onboard each year?</h3>  
          <div className='flex items-center gap-6'>


<p className='text-lg'>4</p>
          <input
  className='w-full'
  type="range"
  min="4"
  max="25"
  value={hires}
  onChange={handleHiresChange}
  style={{
    background: `linear-gradient(to right, #F26C21 ${((hires - 4) / (25 - 4)) * 100}%, #d3d3d3 ${((hires - 4) / (25 - 4)) * 100}%)`,
    appearance: "none",
    height: "10px",
    borderRadius: "5px",
    outline: "none",
    padding: "0",
    margin: "0",
    zIndex: "1",
  }}
/>
<p className='text-lg'>25+</p>

</div>
<div className="mt-2 text-xl font-medium text-center"><span className='font-bold'>{formData.hires}</span> hires per year</div>

        </li>
        </ul>
        
      </section>
        </form>
    </main>
  );
}

export default Roi;