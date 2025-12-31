import { FilterDate } from "@/components/shared/filters/DateFilter";
import FilterActions from "@/components/shared/filters/FilterActions";
import { FilterSearch } from "@/components/shared/filters/SearchInput";
import { FilterSelect } from "@/components/shared/filters/SelectFilter";
import PageFilters from "@/components/shared/page/PageFilters";
import PageHeader from "@/components/shared/page/PageHeader";
import PageLayout from "@/components/shared/page/PageLayout";
import React from "react";

const AllEventsPage = () => {
  return (
    <PageLayout
      header={
        <PageHeader title="Events" description="Manage and filter all events" />
      }
    >
      <PageFilters>
        <FilterSearch placeholder="Search events..." />

        <FilterSelect
          placeholder="Status"
          options={[
            { label: "All", value: "all" },
            { label: "Upcoming", value: "upcoming" },
            { label: "Completed", value: "completed" },
          ]}
        />

        <FilterDate />

        <FilterActions  />
      </PageFilters>

      {/* Page content */}
    </PageLayout>
  );
};

export default AllEventsPage;
