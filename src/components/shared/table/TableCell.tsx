import * as React from "react";
import { TableCell as ShadcnTableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function TableCell({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnTableCell>) {
  return (
    <ShadcnTableCell
      className={cn("py-3 text-sm", className)}
      {...props}
    />
  );
}
