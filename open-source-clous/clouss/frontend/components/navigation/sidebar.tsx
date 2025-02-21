"use client";

import { cn } from "@/lib/utils";
import {
  AlignJustify,
  Home,
  Layers,
  LogOut,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ActionTooltip from "../actions/ActionTooltip";
import Link from "next/link";

export const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const routesB = [
    {
      id: "   ",
      icon: AlignJustify,
      label: "Clous",
      color: "gray-foreground",
    },
  ];
  const routes = [
    {
      icon: Home,
      href: "/home",
      label: "Home",
      pro: true,
    },
    {
      icon: Layers,
      href: "/boards",
      label: "Boards",
      pro: false,
    },
  ];

  const routesC = [
    {
      icon: LogOut,
      href: "/",
      label: "Exit",
      pro: false,
      color: "destructive",
    },
  ];

  const onNavigate = (url: string, pro: boolean) => {
    return router.push(url);
  };
  return (
    <main
      className={cn(
        "flex flex-col h-full bg-secondary border-r justify-between",
        open ? "w-36" : "w-16",
        "duration-500"
      )}
    >
      <section className="p-2 pt-4 flex flex-1 text-base font-medium flex-col text-start items-center gap-2">
        {routesB.map((route) => (
          <div
            key={route.id}
            className={cn(
              "h-10 group flex font-semibold w-full justify-start text-start",
              `text-${route.color}`, 
            )}
          >
            <div className={cn(
              " py-2 cursor-pointer gap-1 rounded-lg flex items-center flex-1"
              , open ? " hover:text-primary hover:bg-muted/5" : "" )} onClick={() => setOpen(!open)}>
              <p className={cn(
              "px-3 py-2 cursor-pointer  rounded-lg"
              , open ? " text-primary " : "hover:text-primary hover:bg-muted/5",
            )} 
              >
                <route.icon
                 
                  className={cn(
                    open ? "w-5 h-5" : "h-5",
                  )}
                />
              </p>
              <p
                className={cn(
                  open ? "text-xl" : "hidden ",
                )}
              >
                
                {route.label}
              </p>
            </div>
          </div>
        ))}
       {routes.map((route) =>
          route.label === "Boards" ? (
            <ActionTooltip
              key={route.href}
              label="Not so fast!
              "
              description="Make sure to publish your Job Opening to take the next steps."
              buttonText="Become an HR co-creator"
              side="right"
              align="start"
            >
              <div
                /* onClick={() => onNavigate(route.href, route.pro)} */
                className={cn(
                  "text-gray flex p-3 w-full justify-start text-xl font-medium leading-none rounded-lg overflow-x-hidden gap-4",
              /*     "text-gray-foreground group flex p-3 w-full justify-start cursor-pointer hover:text-primary hover:bg-muted/5 rounded-lg overflow-x-hidden gap-4",
                  pathname === route.href && "bg-muted/5 text-primary" */
                )}
              >
                <p>
                  <route.icon className={cn( "w-5 h-5"
                )} />
                </p>
                <p>{route.label}</p>
              </div>
            </ActionTooltip>
          ) : (
            <div
              onClick={() => onNavigate(route.href, route.pro)}
              key={route.href}
              className={cn(
                "text-gray-foreground group flex p-3 w-full text-xl justify-start font-medium cursor-pointer hover:text-primary hover:bg-muted/5 rounded-lg leading-none overflow-x-hidden gap-4",
                pathname === route.href && "bg-muted/5 text-primary"
              )}
            >
              <p>
                <route.icon className={cn( "w-5 h-5"
                )} />
              </p>
              <p>{route.label}</p>
            </div>
          )
        )}

      </section>
      <section className="p-2 pt-4 flex text-base font-medium flex-col  text-start items-center gap-2">
          {routesC.map((route) => (
            <div
              onClick={() => onNavigate(route.href, route.pro)}
              key={route.href}
              className={cn(
                "text-gray-foreground  group flex p-3 w-full justify-start text-xl font-medium cursor-pointer hover:text-primary hover:bg-muted/5 rounded-lg leading-none overflow-x-hidden gap-4",
                `text-${route.color}`,
                pathname === route.href && "text-primary"
              )}
            >
                 <p>
              <route.icon
                className={cn( "w-5 h-5"
                )}
              />
             </p>
              <p>
                {route.label}
              </p>
            </div>
          ))}
      </section>
    </main>
  );
};
