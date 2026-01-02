"use client";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { IEvent } from "@/types/event.interface";
import Image from "next/image";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Tag,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import InfoRow from "@/components/shared/InfoRow";

interface EventViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  event: IEvent | null;
}

const EventViewDetailDialog = ({
  open,
  onClose,
  event,
}: EventViewDetailDialogProps) => {
  if (!event) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Event Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          {/* ===== Event Header ===== */}
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg">
            {event.imageUrl && (
              <Image
                src={event?.imageUrl}
                alt={event?.title}
                width={260}
                height={160}
                className="rounded-lg object-cover"
              />
            )}

            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{event?.title}</h2>
              <p className="text-muted-foreground mb-3">
                {event?.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {/* Approval Status */}
                {/* <Badge
                  variant={
                    event?.approvalStatus === "PUBLISHED"
                      ? "default"
                      : "secondary"
                  }
                >
                  {event?.approvalStatus}
                </Badge> */}

                {/* Lifecycle Status */}
                {event?.lifecycleStatus && (
                  <Badge variant="outline">
                    {event?.lifecycleStatus}
                  </Badge>
                )}

                {/* Price */}
                <Badge variant="secondary">
                  {event?.priceType === "FREE"
                    ? "Free Event"
                    : `$${event?.price}`}
                </Badge>
              </div>
            </div>
          </div>

          {/* ===== Event Information ===== */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-lg">Event Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Event Date"
                  value={formatDateTime(event?.date)}
                />
              </div>

              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Registration Deadline"
                  value={formatDateTime(event?.registrationDeadline)}
                />
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Time"
                  value={`${event?.startTime} - ${event?.endTime}`}
                />
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Location"
                  value={event?.location}
                />
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Capacity"
                  value={`${event?.capacity} participants`}
                />
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Registered"
                  value={`${event?.participantsCount} joined`}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* ===== Tags ===== */}
          {event?.tags && event?.tags.length > 0 && (
            <>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-lg">Tags</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {event?.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* ===== Meta ===== */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-lg">Meta Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <InfoRow
                label="Created At"
                value={formatDateTime(event?.createdAt)}
              />
              <InfoRow
                label="Last Updated"
                value={formatDateTime(event?.updatedAt)}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventViewDetailDialog;
