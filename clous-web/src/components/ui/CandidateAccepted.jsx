import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { Link } from "react-router-dom";


const CandidateAccepted = () => {
  const [isSchedule, setIsSchedule] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState();
  const [selectedDateTime, setSelectedDateTime] = useState() // Variable de estado para almacenar el día y la hora seleccionados

  const handleButtonSchedule = (dayIndex, timeIndex) => {
    setSelectedButtonIndex({ dayIndex, timeIndex });
    setIsSchedule(true);
    setSelectedDateTime({
      day: schedules[dayIndex].day,
      time: schedules[dayIndex].times[timeIndex]
    })    };

  // Definir una matriz para los horarios
  const schedules = [
    { day: "Tomorrow", times: ["13:00", "14:00"] },
    { day: "Friday", times: ["09:00", "10:00"] },
    { day: "Monday", times: ["16:00", "17:00"] },
  ];

  return ( 
    <main className="flex flex-col border-none w-full h-full pr-12">
    <section className="justify-between pb-2">
      <h2 className="text-2xl text-muted font-semibold">You’re in! Schedule an interview</h2>
    </section>

  

    <section className="grid grid-cols-3 gap-8 pt-6 pb-0">
      {/* Mapea la matriz de horarios para renderizar los botones */}
      {schedules.map((schedule, dayIndex) => (
        <div key={dayIndex} className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">{schedule.day}</h3>
          {schedule.times.map((time, timeIndex) => (
            <div key={timeIndex} className="gap-2 flex group">
              <Button
                className={`relative text-lg bg-[#FAFAFA] border-2 shadow-none hover:shadow-none items-center justify-center py-2 w-full border-primary overflow-hidden ${
                  selectedButtonIndex?.dayIndex === dayIndex &&
                  selectedButtonIndex?.timeIndex === timeIndex
                    ? "bg-primary text-secondary group-hover:bg-primary group-hover:text-secondary"
                    : "group-hover:text-primary text-primary"
                }`}
                onClick={() => handleButtonSchedule(dayIndex, timeIndex,)}
              >
                {time}
              </Button>
            </div>
          ))}
        </div>
      ))}
    </section>
    {isSchedule && (
      <section className="h-full flex justify-center items-center mt-2 lg:mt-8">
        <Button  className="w-full text-dark-blue-greenish text-lg cursor-default bg-[#FAFAFA] hover:shadow-none shadow-none">Schedule {selectedDateTime?.day}, at {selectedDateTime?.time}</Button>
      </section>
    )}
  </main>
   );
}
 
export default CandidateAccepted;