/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { updateEvent } from "@/services/host/event";
import { IEvent } from "@/types/event.interface";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface EventUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  event: IEvent;
}

const EventUpdateDialog = ({
  open,
  onClose,
  onSuccess,
  event,
}: EventUpdateDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasHandledSuccess = useRef(false);
  const toastShownRef = useRef(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [priceType, setPriceType] = useState<"FREE" | "PAID">("FREE");

  const [state, formAction, isPending] = useActionState(
    (prevState: any, formData: FormData) => {
      if (formData.get("_reset") === "true") return null; // Initial null state
      return updateEvent.bind(null, event?.id)(prevState, formData);
    },
    null
  );
  const prevStateRef = useRef(state);

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (!value) return;

    // 🔒 Prevent duplicate tags (case-insensitive)
    if (tags.map((t) => t.toLowerCase()).includes(value.toLowerCase())) {
      toast.error("Tag already exists");
      return;
    }

    setTags([...tags, value]);
    setTagInput("");
  };

  useEffect(() => {
    if (!open || !event) return;

    setPriceType(event.priceType);
    setTags(event.tags.map(capitalizeFirstLetter));
    setTagInput("");
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [open, event?.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const isCompleted = event?.lifecycleStatus === "COMPLETED";

  const isRegistrationClosed =
    new Date(event?.registrationDeadline) < new Date();

  useEffect(() => {
    if (state?.success && prevStateRef.current?.success !== true) {
      if (!toastShownRef.current) {
        toastShownRef.current = true;
        toast.success(state.message || "Event updated successfully", {
          id: "event-update-success",
        });
      }
      if (formRef.current) formRef.current.reset();
      onClose();
      setTimeout(() => {
        onClose();
        onSuccess();
      }, 0);
    } else if (
      state &&
      !state.success &&
      prevStateRef.current?.success !== false
    ) {
      toast.error(state.message, { id: "event-update-error" });
    }
    prevStateRef.current = state;
  }, [state, onSuccess, onClose]);

  useEffect(() => {
    if (!open) {
      toastShownRef.current = false;
      hasHandledSuccess.current = false;
      prevStateRef.current = null; // Add this
    }
  }, [open, state]);

  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(URL.createObjectURL(selectedFile));
      }
    };
  }, [selectedFile]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Update Event</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className={`flex flex-col flex-1 min-h-0 ${
            isCompleted ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          {isCompleted && (
            <div className="px-6 py-3 bg-yellow-50 text-yellow-700 text-sm">
              This event is completed and can no longer be updated.
            </div>
          )}

          {isRegistrationClosed && (
            <div className="px-4 py-2 rounded bg-red-50 text-red-600 text-sm">
              Registration deadline has passed. Registration is closed.
            </div>
          )}
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Event Title</FieldLabel>
              <Input id="title" name="title" defaultValue={event?.title} />
              <InputFieldError state={state} field="title" />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                defaultValue={event?.description}
              />
              <InputFieldError state={state} field="description" />
            </Field>

            <Field>
              <FieldLabel htmlFor="image">Event Image</FieldLabel>

              {(selectedFile || event?.imageUrl) && (
                <Image
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : event?.imageUrl || ""
                  }
                  alt="Event preview"
                  width={128} // w-32
                  height={80} // h-20
                  className="object-cover rounded mb-2"
                />
              )}

              <Input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              <InputFieldError state={state} field="image" />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              <Field>
                <FieldLabel htmlFor="date">Event Date</FieldLabel>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={event?.date.split("T")[0]}
                />
                <InputFieldError state={state} field="date" />
              </Field>

              {/* Registration Deadline */}
              <Field>
                <FieldLabel htmlFor="registrationDeadline">
                  Registration Deadline
                </FieldLabel>
                <Input
                  id="registrationDeadline"
                  name="registrationDeadline"
                  type="date"
                  defaultValue={event?.registrationDeadline.split("T")[0]}
                />
                <InputFieldError state={state} field="registrationDeadline" />
              </Field>
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  defaultValue={event?.startTime}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="endTime">End Time</FieldLabel>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  defaultValue={event?.endTime}
                />
              </Field>
            </div>

            {/* Location */}
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                defaultValue={event?.location}
              />
            </Field>

            <div className="grid grid-cols-3 gap-4">
              {/* Price Type */}
              <Field>
                <FieldLabel htmlFor="priceType">Price Type</FieldLabel>
                <Input type="hidden" name="priceType" value={priceType} />
                <Select
                  value={priceType}
                  onValueChange={(v) => setPriceType(v as "FREE" | "PAID")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FREE">Free</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* Price */}
              {priceType === "PAID" && (
                <Field>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    defaultValue={event?.price ?? ""}
                  />
                  <InputFieldError state={state} field="price" />
                </Field>
              )}

              {/* Capacity */}
              <Field>
                <FieldLabel htmlFor="capacity">Capacity</FieldLabel>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  defaultValue={event?.capacity}
                />
                <InputFieldError state={state} field="capacity" />
              </Field>
            </div>

            {/* Tags */}
            <Field>
              <FieldLabel>Tags</FieldLabel>

              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-muted flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        setTags(tags.filter((_, i) => i !== index))
                      }
                      className="text-muted-foreground hover:text-destructive"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
                  value={tagInput}
                  disabled={tags.length >= 5}
                  onChange={(e) => setTagInput(e.target.value)}
                />

                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim()}
                >
                  Add
                </Button>
              </div>

              <input type="hidden" name="tags" value={JSON.stringify(tags)} />
            </Field>
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            {/* <Button>Update Event</Button> */}
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Updating..." : "Update Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventUpdateDialog;
