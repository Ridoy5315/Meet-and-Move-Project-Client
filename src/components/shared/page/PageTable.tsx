import { cn } from "@/lib/utils";
import React from "react";

interface PageTableProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTable({ children, className }: PageTableProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-background",
        className
      )}
    >
      {/* horizontal scroll safety */}
      <div className="relative w-full overflow-auto">
        {children}
      </div>
    </div>
  );
}
