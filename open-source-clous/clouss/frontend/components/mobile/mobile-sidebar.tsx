"use client"

import { cn } from "@/lib/utils"
import { Building2, Layers, LayoutDashboard, LogOut,  Plus, Settings } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"


export const MobileSidebar = () => {
    const pathname = usePathname()
    const router = useRouter();
    const routes = [

        {
            icon: Layers,
            href: "/boards",
            label: "Boards",
            pro: false,
        },

    ]
    const onNavigate = (url: string, pro:boolean) => {

        return router.push(url)
    }
    return (
        <div>
            <Sheet>
                <SheetTrigger className="lg:hidden pr-4">
                    <Menu/>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 bg-secondary pt-10 w-40" >
                <div className={cn("space-y-4 flex flex-col h-full bg-secondary border-r")}>
            <div className="p-2 flex flex-1 justify-center">
                <div className="space-y-2">
                    {routes.map((route) => (
                        <div
                        onClick={() =>onNavigate(route.href, route.pro)}
                        key={route.href}
                        className={cn("text-muted-foreground text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-background/90 rounded-lg transition",
                        pathname === route.href && "bg-background/90 text-primary"
                        )}
                        >
                            <div className="flex  gap-x-4 items-center flex-1">
                                <route.icon className="h-5 w-5 " />
                               {route.label}
                            </div>
                        </div>
                    ))} 
                </div>
            </div>
        </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}