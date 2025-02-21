"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { IoToggle } from 'react-icons/io5';
import Image from "next/image";

const Connections: React.FC = () => {
  // Use state to manage the connection status
  const [googleMeetConnected, setGoogleMeetConnected] = useState(false);
  const [googleCalendarConnected, setGoogleCalendarConnected] = useState(false);
  const [googleZoomConnected, setZoomConnected] = useState(false);

  const toggleGoogleMeetConnection = () => {
    setGoogleMeetConnected(!googleMeetConnected);
  };

  const toggleGoogleCalendarConnection = () => {
    setGoogleCalendarConnected(!googleCalendarConnected);
  };
  const toggleZoomConnection = () => {
    setZoomConnected(!googleZoomConnected);
  };

  return (
    <main className="h-full overflow-auto w-full">
 <nav className="flex border-b pb-3.5 justify-between items-center pt-1.5">
        <h2 className="text-xl font-semibold text-muted">
          Connections
        </h2>
     
      </nav>
      <Card className="border-none rounded-none pt-4 space-y-4">
        <p className="text-sm">
          Here you can connect or disconnect your favorite applications.
        </p>
        {/* Google Meet connection */}
        <CardContent className="flex gap-4 items-center border p-2 rounded-lg ">
          <Image width={40} height={40} src="/meet-logo.png" alt="Google Meet"
            className="text-gray-foreground cursor-pointer"
          />
          <div className="text-sm mr-auto">
            {/* Conditionally render the email based on connection status */}
            {googleMeetConnected && <p className="text-gray-foreground">alex@clous.app</p>}
            <p>Google Meet</p>
          </div>
          {/* Conditionally set the toggle color based on connection status */}
          <IoToggle
            className={`w-8 h-8 cursor-pointer ${googleMeetConnected ? 'text-primary' : 'text-muted rotate-180'}`}
            onClick={toggleGoogleMeetConnection}
          />
        </CardContent>
        {/* Google Calendar connection */}
        <CardContent className="flex gap-4 items-center border p-2 rounded-lg">
          <Image width={40} height={40} src="/google-calendar-logo.png" alt="Google Meet"
            className="text-gray-foreground cursor-pointer"
            onClick={toggleGoogleCalendarConnection}
          />
          <div className="text-sm mr-auto">
            {/* Conditionally render the email based on connection status */}
            {googleCalendarConnected && <p className="text-gray-foreground">alex@clous.app</p>}
            <p>Google Calendar</p>
          </div>
          {/* Conditionally set the toggle color based on connection status */}
          <IoToggle
            className={`w-8 h-8 cursor-pointer ${googleCalendarConnected ? 'text-primary' : 'text-text-muted rotate-180'}`}
            onClick={toggleGoogleCalendarConnection}
          />
        </CardContent>

        <CardContent className="flex gap-4 items-center border p-2 rounded-lg">
          <Image width={40} height={40} src="/zoom-logo.png" alt="Google Meet"
            className="text-gray-foreground cursor-pointer"
            onClick={toggleZoomConnection}
          />
          <div className="text-sm mr-auto">
            {/* Conditionally render the email based on connection status */}
            {googleZoomConnected && <p className="text-gray-foreground">alex@clous.app</p>}
            <p>Google Calendar</p>
          </div>
          {/* Conditionally set the toggle color based on connection status */}
          <IoToggle
            className={`w-8 h-8 cursor-pointer ${googleZoomConnected ? 'text-primary' : 'text-muted rotate-180'}`}
            onClick={toggleZoomConnection}
          />
        </CardContent>
      </Card>
    </main>
  );
};

export default Connections;
