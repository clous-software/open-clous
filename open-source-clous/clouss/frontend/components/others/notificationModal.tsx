
import {IoMdNotificationsOutline } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import ListItem from "./list-item";
import { ArchiveIcon, BatteryFull, Table2, Users2 } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


const NotificationModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Tab1");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const listItems = [
    {  text: "Bandeja de entrada", tabName: "Tab1" },
     {text: "Archivadas", tabName: "Tab2" },
    {  text: "Todo", tabName: "Tab3" },
  ];
  return (
    <Popover>
       <PopoverTrigger className="h-11 w-11 p-2.5 rounded-lg text-muted hover:bg-accent">
          <IoMdNotificationsOutline className="w-6 h-6" />
      </PopoverTrigger>
      <PopoverContent className="shadow-none py-4 w-96 rounded-2xl" align="center">
        <main className="flex justify-between flex-col overflow-auto gap-4">
            <section className="flex gap-1 px-5 ">
            {listItems.map((item) => (
            <div className={`px-3 py-2 rounded-lg items-center hover:bg-muted/5 flex cursor-pointer text-sm hover:text-primary gap-2 leading-none ${item.tabName === activeTab
              ? "bg-muted/5 text-gray-foreground"
              : " hover:text-gray-foreground"}` }
            key={item.tabName}
            onClick={() => setActiveTab(item.tabName)} >
       {item.text}
        </div>
          ))}
            </section>
            <section className="w-full flex justify-between flex-col">
        {activeTab === "Tab1" && (
          <React.Fragment>
            <div className="flex gap-2 px-5 ">
            <Avatar className="w-6 h-6">
      <AvatarImage  />
      <AvatarFallback className="bg-primary border text-sm text-secondary">A</AvatarFallback>
    </Avatar>

    <div className="flex flex-col gap-1">
      <p className="text-sm">
    <span className="font-semibold"> Alvaro Villalba Perez</span>  <span >te mencionó en una página</span> <span className="text-gray-foreground">Hace 52 min</span>
      </p>
      <p className="font-semibold text-sm hover:text-primary cursor-pointer" >Lorem Ipsum</p>

            </div>
    </div>
      <section className="px-12 py-2 mt-2 rounded-lg items-center hover:bg-muted/5 cursor-pointer  hover:text-gray-foreground">
<div className="flex gap-3 items-center text-xs font-semibold">

  <Users2 className="h-4 w-4"/>
  <p >Owner</p>
</div>
      <div className="flex gap-2 items-center mt-2">

      <Avatar className="w-5 h-5">
      <AvatarImage  />
      <AvatarFallback className="bg-primary border text-secondary text-xs">
        A</AvatarFallback>
    </Avatar>
    <p className="text-xs">Alexandru Purdoiu</p>
      </div>
      </section>
          </React.Fragment>
        )}
        {activeTab === "Tab2" && (
          <React.Fragment>
            <div>
              Hola
            </div>
          </React.Fragment>
        )}
        {activeTab === "Tab3" && (
          <React.Fragment>
            <div>
              como
            </div>
          </React.Fragment>
        )}
      </section>
        </main>


      </PopoverContent>
    </Popover>
  );
}; 

export default NotificationModal;
