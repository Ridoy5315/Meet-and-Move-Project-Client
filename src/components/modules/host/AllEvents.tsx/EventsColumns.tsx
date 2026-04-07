/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { Column } from "@/components/shared/table/ManagementTable";
import { IEvent } from "@/types/event.interface";
import { Users, Tag } from "lucide-react";

interface EventColumnConfig extends Column<IEvent> {
  header: string;
  accessor: (event: IEvent) => React.ReactNode;
  sortKey?: string;
}

export const eventsColumns: EventColumnConfig[] = [
  {
    header: "Event",
    accessor: (event: IEvent) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">{event.title}</span>
        <span className="text-xs text-muted-foreground">{event.location}</span>
      </div>
    ),
    sortKey: "title",
  },

  {
    header: "Event Date",
    accessor: (event: IEvent) => <DateCell date={event.date} />,
    sortKey: "date",
  },

  {
    header: "Registration Deadline",
    accessor: (event: IEvent) => <DateCell date={event.registrationDeadline} />,
    sortKey: "registrationDeadline",
  },

  {
    header: "Time",
    accessor: (event: IEvent) => (
      <span className="text-sm font-medium">
        {event.startTime} – {event.endTime}
      </span>
    ),
  },

  {
    header: "Price",
    accessor: (event: IEvent) =>
      event.priceType === "FREE" ? (
        <span className="text-sm font-semibold text-green-600">Free</span>
      ) : (
        <span className="text-sm font-semibold text-blue-600">
          ${event.price}
        </span>
      ),
    sortKey: "price",
  },

  {
    header: "Capacity",
    accessor: (event: IEvent) => (
      <div className="flex items-center gap-1 text-sm">
        <Users className="h-4 w-4 text-muted-foreground" />
        {event.participantsCount}/{event.capacity}
      </div>
    ),
  },

  // {
  //      header: "Tags",
  //      accessor: (event: IEvent) =>
  //           event.tags && event.tags.length > 0 ? (
  //                <div className="flex flex-wrap gap-1">
  //                     {event.tags.slice(0, 3).map((tag: string, index: number) => (
  //                          <span
  //                               key={index}
  //                               className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
  //                          >
  //                               <Tag className="h-3 w-3 mr-1" />
  //                               {tag}
  //                          </span>
  //                     ))}
  //                </div>
  //           ) : (
  //                <span className="text-xs text-gray-500">No tags</span>
  //           ),
  // },
];
