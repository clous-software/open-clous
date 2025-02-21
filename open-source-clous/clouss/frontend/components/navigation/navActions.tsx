"use client"

import { Plus } from "lucide-react"
import ActionTooltip from "../actions/action-tooltip";
export const NavigationAction = () => {
    return ( 
        <>
        <ActionTooltip
        side="right"
        align="center"
        label="Add a workflow"
        >
        <button
        className="group flex items-center"
        >
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center border group-hover:bg-primary">
                <Plus className="transition group-hover:text-secondary " size={25}/>
            </div>
        </button>
        </ActionTooltip>
        </>
     );
}
 
