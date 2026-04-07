import { cn } from "@/lib/utils";
import React from "react";

interface PageLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({
  header,
  children,
  className,
}: PageLayoutProps) {
  return (
    <main className="w-full">
      {/* Sticky Header Area */}
      {header}

      {/* Page Content */}
      <section
        className={cn(
          "mx-auto ",
          className
        )}
      >
        {children}
      </section>
    </main>
  );
}
