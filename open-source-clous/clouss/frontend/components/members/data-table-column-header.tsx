import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleSortToggle = () => {
    if (column.getIsSorted() === "asc") {
      column.toggleSorting(true); // Set to descending
    } else {
      column.toggleSorting(false); // Set to ascending
    }
  };

  return (
    <div className={cn("flex items-center space-x-2 text-muted", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="ml-2 h-8 px-0 hover:bg-background text-muted focus-visible:ring-0 focus-visible:ring-offset-0 "
        onClick={handleSortToggle}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
