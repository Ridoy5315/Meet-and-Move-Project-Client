import * as React from "react";
import { TableRow as ShadcnTableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function TableRow({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnTableRow>) {
  return (
    <ShadcnTableRow
      className={cn(
        "hover:bg-muted/50 transition-colors",
        className
      )}
      {...props}
    />
  );
}
