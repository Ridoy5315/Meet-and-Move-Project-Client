import * as React from "react";
import { TableHead as ShadcnTableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function TableHead({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnTableHead>) {
  return (
    <ShadcnTableHead
      className={cn(
        "text-xs font-medium uppercase tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
