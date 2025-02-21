"use client"
import { Grip } from "lucide-react";
import { Montserrat } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { MobileSidebar } from "../mobile/mobile-sidebar";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

export const Navbar = () => {

    return (
        <div className="lg:hidden sticky top-0 z-20 w-full h-12 flex items-center py-2 px-4 border-b bg-secondary">
            <div className="flex items-center flex-grow">
                <MobileSidebar/>

            </div>
           

        </div>
    )
}