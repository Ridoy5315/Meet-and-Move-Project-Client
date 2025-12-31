import { cn } from "@/lib/utils";
import React from "react";

interface PageFiltersProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageFilters({
  children,
  className,
}: PageFiltersProps) {
  return (
    <div
      className={cn(
        "mb-4 rounded-lg border bg-background p-4",
        className
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        {children}
      </div>
    </div>
  );
}
