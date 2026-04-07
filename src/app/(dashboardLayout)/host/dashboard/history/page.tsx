import AllEventsTable from "@/components/modules/host/AllEvents.tsx/AllEventsTable";
import EventFilters from "@/components/modules/host/AllEvents.tsx/EventFilters";
import PageHeader from "@/components/shared/page/PageHeader";
import PageLayout from "@/components/shared/page/PageLayout";
import PageTable from "@/components/shared/page/PageTable";
import TablePagination from "@/components/shared/table/TablePagination";
import TableSkeleton from "@/components/shared/table/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getPastEvents } from "@/services/host/event";
import { Suspense } from "react";

const HistoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const upcomingEventsResult = await getPastEvents(queryString);
  console.log("upcoming events result", upcomingEventsResult);
  const totalPages = Math.ceil(
    (upcomingEventsResult?.meta?.total || 1) /
      (upcomingEventsResult?.meta?.limit || 1),
  );
  return (
    <PageLayout
      header={
        <PageHeader
          title="Event History"
          description="View all events you have successfully completed on the platform."
        />
      }
    >
      <EventFilters />

      <PageTable>
        <Suspense fallback={<TableSkeleton columns={6} rows={8} />}>
          <AllEventsTable events={upcomingEventsResult.data}></AllEventsTable>
          <TablePagination
            currentPage={upcomingEventsResult?.meta?.page || 1}
            totalPages={totalPages || 1}
          />
        </Suspense>
      </PageTable>
    </PageLayout>
  );
};

export default HistoryPage;
