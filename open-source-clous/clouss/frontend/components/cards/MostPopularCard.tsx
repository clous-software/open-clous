import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SiGooglecalendar } from "react-icons/si";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import { CgGoogle } from "react-icons/cg";
import { IoLogoGoogle } from "react-icons/io5";

interface SelectedButtonIndex {
  dayIndex: number;
  timeIndex: number;
}

interface SelectedDateTime {
  day: string;
  time: string;
}

const MostPopular = () => {
  const [isSchedule, setIsSchedule] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] =
    useState<SelectedButtonIndex | null>(null);
  const [currentRender, setCurrentRender] = useState("yes");
  const [selectedDateTime, setSelectedDateTime] =
    useState<SelectedDateTime | null>(null); // Variable de estado para almacenar el día y la hora seleccionados

  const handleNext = () => {
    if (currentRender === "yes") {
      setCurrentRender("no");
    } else if (currentRender === "no") {
      setCurrentRender("maybe");
    }
  };

  const handlePrevious = () => {
    if (currentRender === "maybe") {
      setCurrentRender("no");
    } else if (currentRender === "no") {
      setCurrentRender("yes");
    }
  };

  const handleButtonSchedule = (dayIndex: number, timeIndex: number) => {
    setSelectedButtonIndex({ dayIndex, timeIndex });
    setIsSchedule(true);
    setSelectedDateTime({
      day: schedules[dayIndex].day,
      time: schedules[dayIndex].times[timeIndex],
    });
  };

  // Definir una matriz para los horarios
  const schedules = [
    { day: "Tomorrow", times: ["13:00", "14:00", "15:00", "16:00"] },
    { day: "Friday", times: ["09:00", "10:00", "11:00", "12:00"] },
    { day: "Monday", times: ["16:00", "17:00", "18:00", "19:00"] },
  ];

  const handleFinish = () => {
    window.location.reload();
  };
  
  const renderNoOption = () => (
    <Card className="flex flex-col border-none w-full h-full">
      <CardHeader className="pt-5 pb-2 text-2xl text-muted font-semibold">
        You don’t meet the requirements
      </CardHeader>
      <CardContent className="grid grid-cols-2 text-sm gap-2 pb-4">
        <div className="border rounded-lg px-3 py-2">
          <h3 className="font-medium">Lacks Master’s Degree</h3>
          <p className="text-gray-foreground">in Engineering fields.</p>
        </div>
        <div className="border rounded-lg px-3 py-2">
          <h3 className="font-medium">No portfolio attached</h3>
          <p className="text-gray-foreground">about their skills.</p>
        </div>
      </CardContent>
      <CardHeader className="pt-5 pb-2 text-2xl text-muted font-semibold">
        Jobs tailored to you
      </CardHeader>
      <CardContent className="space-y-2 pt-0 pb-6">
        <div className="border rounded-lg flex justify-between px-3 py-4 items-center">
          <h3 className="text-lg font-semibold flex gap-2 items-center">
            <Image
              src="/favicon.ico"
              alt={""}
              width={32}
              height={28}
              className="rounded-lg"
            />
            Software Engineer
          </h3>
          <h3 className="text-lg font-medium">Part-time</h3>
        </div>
        <div className="border rounded-lg flex justify-between px-3 py-4 items-center">
          <h3 className="text-lg font-semibold flex gap-2 items-center">
            <Image
              src="/favicon.ico"
              alt={""}
              width={32}
              height={28}
              className="rounded-lg"
            />
            Account Executive
          </h3>
          <h3 className="text-lg font-medium">Full-Time</h3>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4 h-24 border-t-2 mt-auto">
        <Button onClick={handlePrevious} variant="secondary">
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </CardFooter>
    </Card>
  );

  const renderMaybeOption = () => (
    <Card className="flex flex-col justify-between border-none w-full h-full">
      <CardHeader className="justify-between pt-5 pb-2 flex-col gap-2">
        <h2 className="text-2xl text-muted font-semibold">
          You’re in… the que
        </h2>
        <p>
          You are a perfect fit for this job opening, but sadly the recruiting
          team has their schedules all booked up. Click the bell icon to get
          notified when it’s your turn!
        </p>
      </CardHeader>
      <CardContent className="mt-6">
        <div className="grid grid-cols-5 gap-4 h-1  overflow-hidden">
          <div className="bg-primary rounded-full"></div>
          <div className="bg-primary rounded-full"></div>
          <div className="bg-primary rounded-full"></div>
          <div className="flex rounded-lg bg-primary">
            <div className="bg-primary w-1/3"></div>
            <div className="bg-accent w-2/3"></div>
          </div>
          <div className="bg-accent border-l-dotted"></div>
        </div>
      </CardContent>
      <Player autoplay loop src="/Animation.json" className=" w-60 h-full" />
      <CardFooter className="flex justify-end gap-4 h-24 border-t-2 mt-auto">
        <Button onClick={handlePrevious} variant="secondary">
          Back</Button>
        <Button onClick={handleFinish} >
          Finish
          </Button>
      </CardFooter>
    </Card>
  );

  const renderYesOption = () => (
    <Card className="flex flex-col border-none w-full h-full">
      <CardHeader className="justify-between pt-5 pb-2">
        <h2 className="text-2xl text-muted font-semibold">
          You’re in! Schedule an interview
        </h2>
        {/*          <Image
          width={36}
          height={36}
          className="rounded-lg cursor-pointer"
          src="/alexx.jpg"
          alt="Alvaro Clous"
        /> */}
      </CardHeader>

      <CardContent className="pb-3">
        <Alert className="bg-accent text-gray-foreground rounded-xl">
          <IoLogoGoogle className="h-4 w-4" />
          <AlertTitle className="text-muted"> You’re not connected</AlertTitle>
          <AlertDescription className="text-muted">
            We’ve detected you’re not signed on. Click the button below to start
            scheduling.
            <Link href="" className=" text-primary flex">
              Connect
            </Link>
          </AlertDescription>
        </Alert>
      </CardContent>

      <CardContent className="grid grid-cols-3 gap-8 pt-3 pb-0 mb-auto">
        {/* Mapea la matriz de horarios para renderizar los botones */}
        {schedules.map((schedule, dayIndex) => (
          <div key={dayIndex} className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">{schedule.day}</h3>
            {schedule.times.map((time, timeIndex) => (
              <div key={timeIndex} className=" gap-2 flex group">
                <Button
                  variant="outline"
                  className={` relative text-lg w-full p-4 font-medium  border-primary h-8 overflow-hidden ${
                    selectedButtonIndex?.dayIndex === dayIndex &&
                    selectedButtonIndex?.timeIndex === timeIndex
                      ? "bg-primary text-secondary group-hover:bg-primary/90 group-hover:text-secondary"
                      : "group-hover:bg-muted/5 group-hover:text-primary text-primary"
                  }`}
                  onClick={() => handleButtonSchedule(dayIndex, timeIndex)}
                >
                  {time}
                </Button>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
      {isSchedule && (
        <CardContent className="h-20 flex justify-center items-center py-0">
          <Button>Schedule</Button>
        </CardContent>
      )}

      <CardFooter className="h-24 border-t-2">
        {/* Change the button label based on current render */}
        {currentRender === "yes" ? (
          <Button onClick={handleNext} className="ml-auto">
            Next
          </Button>
        ) : (
          <Button>Some other label</Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    // Render based on current state
    currentRender === "yes"
      ? renderYesOption()
      : currentRender === "no"
      ? renderNoOption()
      : renderMaybeOption()
  );
};

export default MostPopular;
