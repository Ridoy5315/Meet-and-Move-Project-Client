import { Button } from "@/components/ui/button";
import { getEventDateParts } from "@/lib/getEventDateParts";
import { IEvent } from "@/types/event.interface";
import { Clock, Eye, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EventCardPage = ({ event }: { event: IEvent }) => {
  const { id, title, date, startTime, endTime, location, imageUrl } = event;
  const eventImageUrl = imageUrl ?? "/images/event-placeholder.jpg";
  const { dateDay, dateMonth } = getEventDateParts(date);
  return (
    <div className="group relative w-full max-w-[520px] overflow-hidden rounded-3xl border bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1">
      {/* Background Image */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={eventImageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          priority
        />

        {/* Top gradient / soft fade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />

        {/* Date badge */}
        <div className="absolute left-5 top-5 rounded-2xl bg-white/20 px-4 py-3 text-white backdrop-blur-md ring-1 ring-white/20">
          <div className="text-3xl font-semibold leading-none">{dateDay}</div>
          <div className="text-sm opacity-90">{dateMonth}</div>
        </div>

        {/* Bottom content area */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="text-2xl font-semibold leading-tight text-white drop-shadow">
            {title}
          </h3>

          <div className="mt-3 space-y-2 text-white/85">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>
                {startTime} - {endTime}
              </span>
            </div>
          </div>
        </div>

        {/* Hover overlay (tinted bg + button) */}
        <div className="absolute inset-0 flex items-end justify-end p-5 sm:p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {/* tinted layer */}
          <div className="absolute inset-0 bg-black/25" />

          {/* <Link className="relative z-10 rounded-full px-5 bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/25" href={`/events/${id}`}>
            <Button type="button" >
              <Eye className="h-4 w-4 mr-2" />
              Details
            </Button>
          </Link> */}
          <Link href={`/explore-events/all-events/${id}`}>
            <Button
              type="button"
              // onClick={onDetails}
              className="relative z-10 rounded-full px-5 bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/25"
            >
              Details
            </Button>
          </Link>

          {/* <Button
            type="button"
            // onClick={onDetails}
            className=
              "relative z-10 rounded-full px-5 bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/25"           
          >
            Details
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default EventCardPage;
