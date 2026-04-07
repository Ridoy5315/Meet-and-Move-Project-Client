"use client";

import ClearFiltersButton from "@/components/shared/filters/ClearFiltersButton";
import RefreshButton from "@/components/shared/filters/RefreshButton";
import { SearchInput } from "@/components/shared/filters/SearchInput";
import { SelectFilter } from "@/components/shared/filters/SelectFilter";
import { usePathname } from "next/navigation";

const EventFilters = () => {
  const pathname = usePathname();

  const isUpcomingEventsPage =
    pathname === "/host/dashboard/upcoming-events" || pathname === "/host/dashboard/history";

  return (
    <div className="rounded-xl border bg-background p-4 space-y-4">
      {/* Row 1: Search + Actions */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchInput
          paramName="searchTerm"
          placeholder="Search events by title, description, or location..."
        />

        <div className="flex items-center gap-2">
          <RefreshButton />
          <ClearFiltersButton />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Row 2: Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Price Type */}
        <SelectFilter
          paramName="priceType"
          placeholder="Price"
          defaultValue="Any Price Type"
          options={[
            { label: "Free", value: "FREE" },
            { label: "Paid", value: "PAID" },
          ]}
        />

        {/* Event Status */}
        {!isUpcomingEventsPage && (
          <SelectFilter
            paramName="lifecycleStatus"
            placeholder="Status"
            defaultValue="Any Status"
            options={[
              { label: "Upcoming", value: "UPCOMING" },
              { label: "Ongoing", value: "ONGOING" },
              { label: "Completed", value: "COMPLETED" },
              { label: "Cancelled", value: "CANCELLED" },
            ]}
          />
        )}
        {/* price status */}
        <SelectFilter
          paramName="priceRange"
          placeholder="Price Range"
          defaultValue="All Prices"
          options={[
            { label: "Under $50", value: "0-50" },
            { label: "$50 – $100", value: "50-100" },
            { label: "$100 – $500", value: "100-500" },
            { label: "$500+", value: "500-" },
          ]}
        />
      </div>
    </div>
  );
};

export default EventFilters;
