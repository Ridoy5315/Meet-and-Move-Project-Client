"use client";
import ManagementTable from "@/components/shared/table/ManagementTable";
import { softDeleteEvent } from "@/services/host/event";
import { IEvent } from "@/types/event.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { eventsColumns } from "./EventsColumns";
import EventUpdateDialog from "./EventUpdateFormDialog";

interface EventsTableProps {
  events: IEvent[];
}

const AllEventsTable = ({ events }: EventsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingEvent, setDeletingEvent] = useState<IEvent | null>(null);
  const [viewingEvent, setViewingEvent] = useState<IEvent | null>(null);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (event: IEvent) => {
    setViewingEvent(event);
  };

  const handleEdit = (event: IEvent) => {
    setEditingEvent(event);
  };

  const handleDelete = (event: IEvent) => {
    setDeletingEvent(event);
  };

  const confirmDelete = async () => {
    if (!deletingEvent) return;

    setIsDeleting(true);
    const result = await softDeleteEvent(deletingEvent.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Event deleted successfully");
      setDeletingEvent(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete event");
    }
  };

  return (
    <>
      <ManagementTable
        data={events}
        columns={eventsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(doctor) => doctor.id!}
        emptyMessage="No Events found"
      ></ManagementTable>

      {/* Edit event Form Dialog */}
      <EventUpdateDialog
        open={!!editingEvent}
        event={editingEvent!}
        onClose={() => setEditingEvent(null)}
        onSuccess={() => {
          setEditingEvent(null);
          handleRefresh();
        }}
      />
    </>
  );
};

export default AllEventsTable;
