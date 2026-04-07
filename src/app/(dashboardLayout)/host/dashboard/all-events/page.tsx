import AllEventsTable from "@/components/modules/host/AllEvents.tsx/AllEventsTable";
import EventFilters from "@/components/modules/host/AllEvents.tsx/EventFilters";
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
        <PageHeader title="Events Overview" description="Oversee and manage every event created on the platform." />
      }
    >
      <EventFilters />

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
