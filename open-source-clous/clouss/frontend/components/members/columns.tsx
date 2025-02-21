
import { ColumnDef } from "@tanstack/react-table"
import { Members } from "./schema"
import { DataTableColumnHeader } from "./data-table-column-header"


export const columns: ColumnDef<Members>[] = [
  
  
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2 p-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
            
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2 p-2">
          <span className="max-w-[500px] truncate font-medium"
          onClick={() => console.log(row.original)}>
            {row.getValue("email")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2 p-2">
          <span className="max-w-[500px] truncate font-medium"
          onClick={() => console.log(row.original)}>
            {row.getValue("role")}
          </span>
        </div>
      )
    },
  },

 
]