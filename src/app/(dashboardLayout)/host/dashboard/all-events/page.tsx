import AllEventsTable from "@/components/modules/host/AllEvents.tsx/AllEventsTable";
import { FilterDate } from "@/components/shared/filters/DateFilter";
import FilterActions from "@/components/shared/filters/FilterActions";
import { FilterSearch } from "@/components/shared/filters/SearchInput";
import { FilterSelect } from "@/components/shared/filters/SelectFilter";
import PageFilters from "@/components/shared/page/PageFilters";
import PageHeader from "@/components/shared/page/PageHeader";
import PageLayout from "@/components/shared/page/PageLayout";
import PageTable from "@/components/shared/page/PageTable";
import TablePagination from "@/components/shared/table/TablePagination";
import TableSkeleton from "@/components/shared/table/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllEvents } from "@/services/host/event";
import { Suspense } from "react";

const AllEventsPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const eventsResult = await getAllEvents(queryString);
  console.log("eventsResult", eventsResult);
  const totalPages = Math.ceil(
    (eventsResult?.meta?.total || 1) / (eventsResult?.meta?.limit || 1)
  );

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

      <PageTable>
        <Suspense fallback={<TableSkeleton columns={6} rows={8} />}>
          <AllEventsTable events={eventsResult.data}></AllEventsTable>
          <TablePagination
          currentPage={eventsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
        </Suspense>
      </PageTable>
    </PageLayout>
  );
};

export default AllEventsPage;
