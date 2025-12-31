"use client";

import { cn } from "@/lib/utils";
import AppBreadcrumbs from "./AppBreadcrumbs";
import { motion } from "framer-motion";
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  sticky?: boolean;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  icon,
  actions,
  sticky = true,
  className,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        sticky &&
          "sticky -top-6 z-40 bg-background/80 backdrop-blur border-b",
        "mb-6",
        className
      )}
    >
      <div className="px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        {/* Breadcrumbs */}
        <AppBreadcrumbs />

        {/* Header Content */}
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            {icon && (
              <div className="mt-1 text-primary">
                {icon}
              </div>
            )}

            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {title}
              </h1>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>

          {actions && (
            <div className="flex gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
