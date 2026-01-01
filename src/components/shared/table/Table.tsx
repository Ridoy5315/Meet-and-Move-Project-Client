import * as React from "react";
import {
  Table as ShadcnTable,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TableProps extends React.ComponentProps<typeof ShadcnTable> {}

export default function Table({ className, ...props }: TableProps) {
  return (
    <ShadcnTable
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export { TableBody, TableHeader };
