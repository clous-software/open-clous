"use client"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { Search } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [open, setOpen] = useState(false);
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center ustify-between sticky -inset-0 bg-background">
      <div className="flex flex-1 items-center space-x-2 mr-1">
      <h3 className="text-muted text-xl font-semibold mr-auto my-1.5">Members</h3>
        
      <Search onClick={() => setOpen(!open)} className="h-4 w-4"/>
<p     className={cn(
            "duration-700 translate",
            open ? "w-60" : "w-0",
            )}>

         <Input
          placeholder="Filter by name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className={cn(
            "h-8 border-none",
            )}
            />
            </p>
     
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 "
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}