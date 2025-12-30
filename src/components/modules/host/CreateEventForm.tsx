"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import Image from "next/image";
import { toast } from "sonner";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { createEvent } from "@/services/host/event";
import { BaseProfile } from "@/types/user.interface";
import { HostProfile } from "@/types/host.interface";
import { Loader2 } from "lucide-react";

type ActionState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const initialState: ActionState = {};

interface ProfileActionsProps {
  data: BaseProfile;
}

export default function CreateEventForm({ data }: ProfileActionsProps) {
  const [, startTransition] = useTransition();
  const profile = data?.profile as HostProfile;
  console.log("data", profile);

  const tagsRef = useRef<string[]>([]);
  const [state, formAction, isPending] = useActionState(
    createEvent.bind(null, profile?.id),
    null
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const tagsJson = useMemo(() => JSON.stringify(tags), [tags]);

  const [formData, setFormData] = useState({
    title: "",
    category: "EVENT",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    isOnline: false,
    priceType: "FREE",
    price: "",
    capacity: "",
    description: "",
    image: null as File | null,
  });

  const handleImageChange = (file?: File | null) => {
    if (!file) {
      setPreviewUrl(null);
      setFormData({ ...formData, image: null });
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else if (state?.success) {
      toast.success("Event Created successful!");
      startTransition(() => {
        setFormData({
          title: "",
          category: "EVENT",
          date: "",
          startTime: "",
          endTime: "",
          location: "",
          isOnline: false,
          priceType: "FREE",
          price: "",
          capacity: "",
          description: "",
          image: null,
        });

        setTags([]);
        setPreviewUrl(null);
      });
    }
  }, [state]);

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* LEFT – FORM */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>
            Provide accurate information so users understand your event clearly.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Title + Category */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Weekend Football Match"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <InputFieldError field="title" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="category">Type</FieldLabel>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="EVENT">Event</option>
                <option value="ACTIVITY">Activity</option>
              </select>
              <InputFieldError field="category" state={state} />
            </Field>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <InputFieldError field="date" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
              <Input id="startTime" name="startTime" type="time" />
              <InputFieldError field="startTime" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="endTime">End Time</FieldLabel>
              <Input id="endTime" name="endTime" type="time" />
              <InputFieldError field="endTime" state={state} />
            </Field>
          </div>

          {/* Location + Online */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                placeholder="DHU Sports Complex / Zoom"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              <InputFieldError field="location" state={state} />
            </Field>

            <Field className="flex items-end gap-2">
              <input
                id="isOnline"
                name="isOnline"
                type="checkbox"
                checked={formData.isOnline}
                onChange={(e) =>
                  setFormData({ ...formData, isOnline: e.target.checked })
                }
              />
              <label htmlFor="isOnline" className="text-sm">
                Online
              </label>
            </Field>
          </div>

          {/* Price + Capacity */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="priceType">Price Type</FieldLabel>
              <select
                id="priceType"
                name="priceType"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                defaultValue="FREE"
              >
                <option value="FREE">Free</option>
                <option value="PAID">Paid</option>
              </select>
              <InputFieldError field="priceType" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <InputFieldError field="price" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="capacity">Capacity</FieldLabel>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min={1}
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
              />
              <InputFieldError field="capacity" state={state} />
            </Field>
          </div>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <InputFieldError field="description" state={state} />
          </Field>

          {/* Tags */}
          <Field>
            <FieldLabel>
              Tags{" "}
              <span className="text-muted-foreground">(Comma separated)</span>
            </FieldLabel>

            {/* Existing tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="cursor-pointer rounded-full border px-3 py-1 text-xs hover:bg-muted"
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  title="Click to remove"
                >
                  {tag} ✕
                </span>
              ))}
            </div>

            {/* Input + Add button */}
            <div className="flex gap-2">
              <Input
                id="tags-input"
                placeholder="Type tags separated by comma"
              />

              <Button
                type="button"
                variant="secondary"
                // disabled={!document.getElementById("tags-input")?.value}
                onClick={() => {
                  const input = document.getElementById(
                    "tags-input"
                  ) as HTMLInputElement;

                  if (!input?.value) return;

                  const newTags = input.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);

                  setTags((prev) => Array.from(new Set([...prev, ...newTags])));

                  input.value = "";
                }}
              >
                Add
              </Button>
            </div>

            {/* Hidden field for server action */}
            <input type="hidden" name="tags" value={JSON.stringify(tags)} />
          </Field>

          {/* Image */}
          <Field>
            <FieldLabel htmlFor="image">Event Image</FieldLabel>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={(e) => handleImageChange(e.target.files?.[0])}
            />
            <InputFieldError field="image" state={state} />
          </Field>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Creating Event..." : "Create Event"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* RIGHT – PREVIEW */}
      <Card className="lg:sticky lg:top-6 h-fit">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            This is how your event cover will appear.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border bg-muted">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Event Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No image selected
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
