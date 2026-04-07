/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IEvent } from "@/types/event.interface";
import {
  createEventZodSchema,
  updateEventZodSchema,
} from "@/zod/event.validation";
import { revalidateTag } from "next/cache";

export async function createEvent(
  id: string,
  _prevState: any,
  formData: FormData,
) {
  // 1️⃣ Parse JSON fields (tags)
  const tagsRaw = formData.get("tags") as string;

  let tags: string[] = [];
  try {
    const parsed = tagsRaw ? JSON.parse(tagsRaw) : [];

    tags = parsed
      .flatMap((tag: string) => tag.split(",").map((t) => t.trim()))
      .filter(Boolean);
  } catch {
    tags = [];
  }

  const priceType = formData.get("priceType") as "FREE" | "PAID";
  const price = priceType === "FREE" ? 0 : Number(formData.get("price"));

  // 2️⃣ Handle file
  const file = formData.get("image");

  // 3️⃣ Build validation payload
  const validationPayload = {
    title: formData.get("title") as string,

    date: formData.get("date") as string,
    registrationDeadline: formData.get("registrationDeadline") as string,
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,

    location: formData.get("location") as string,

    priceType: formData.get("priceType") as "FREE" | "PAID",
    price: price,

    capacity: Number(formData.get("capacity")),

    description: formData.get("description") as string,
    tags,

    image: file instanceof File && file.size > 0 ? file : undefined,
  };

  //   console.log("validationPayload", validationPayload);

  const validatedPayload = zodValidator(
    validationPayload,
    createEventZodSchema,
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  // 5️⃣ Backend JSON payload (NO file here)
  const backendPayload = {
    title: validatedPayload.data.title,

    date: validatedPayload.data.date,
    registrationDeadline: validatedPayload.data.registrationDeadline,
    startTime: validatedPayload.data.startTime,
    endTime: validatedPayload.data.endTime,

    location: validatedPayload.data.location,

    priceType: validatedPayload.data.priceType,
    price: validatedPayload.data.price,

    capacity: validatedPayload.data.capacity,

    description: validatedPayload.data.description,
    tags: validatedPayload.data.tags,
  };

  console.log("backendPayload", backendPayload);

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(backendPayload));

  if (validatedPayload.data.image) {
    newFormData.append("file", validatedPayload.data.image as File);
  }

  // 7️⃣ API call
  try {
    const response = await serverFetch.post(`/event/create-event/${id}`, {
      body: newFormData,
    });

    const result = await response.json();

    if (result?.success) {
      revalidateTag("events", "default");
    }
    return result;
  } catch (error: any) {
    console.error("Create event error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create event",
      formData: validationPayload,
    };
  }
}

export async function getAllPublicEvents(queryString?: string) {
  try {
    const res = await serverFetch.get(
      `/event${queryString ? `?${queryString}` : ""}`,
    );

    const result = await res.json();

    console.log("ALL Events", result);
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getAllEvents(queryString?: string) {
  try {
    const res = await serverFetch.get(
      `/event/all-events${queryString ? `?${queryString}` : ""}`,
    );

    const result = await res.json();

    console.log("ALL Events", result);
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getUpcomingEvents(queryString?: string) {
  try {
    const res = await serverFetch.get(
      `/event/upcoming-events${queryString ? `?${queryString}` : ""}`,
    );

    const result = await res.json();

    console.log("Upcoming Events", result);
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getPastEvents(queryString?: string) {
  try {
    const res = await serverFetch.get(
      `/event/past-events${queryString ? `?${queryString}` : ""}`,
    );

    const result = await res.json();

    console.log("Past Events", result);
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function updateEvent(
  id: string,
  _prevState: any,
  formData: FormData,
) {
  const tagsRaw = formData.get("tags") as string;

  let tags: string[] = [];
  try {
    const parsed = tagsRaw ? JSON.parse(tagsRaw) : [];

    tags = parsed
      .flatMap((tag: string) => tag.split(",").map((t) => t.trim()))
      .filter(Boolean);
  } catch {
    tags = [];
  }

  const getOptionalString = (key: string) => {
    const v = formData.get(key);
    if (v == null) return undefined;
    const s = String(v).trim();
    return s.length ? s : undefined;
  };

  const getOptionalNumber = (key: string) => {
    const v = formData.get(key);
    if (v == null) return undefined;
    const s = String(v).trim();
    if (!s.length) return undefined;
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
  };

  const priceType = getOptionalString("priceType") as
    | "FREE"
    | "PAID"
    | undefined;
  const price =
    priceType === "FREE"
      ? 0
      : priceType === "PAID"
        ? getOptionalNumber("price")
        : getOptionalNumber("price");

  const file = formData.get("image");

  // ---------- Build validation payload ----------
  const validationPayload = {
    title: getOptionalString("title"),
    description: getOptionalString("description"),
    date: getOptionalString("date"),
    registrationDeadline: getOptionalString("registrationDeadline"),
    startTime: getOptionalString("startTime"),
    endTime: getOptionalString("endTime"),
    location: getOptionalString("location"),
    priceType,
    price,
    capacity: getOptionalNumber("capacity"),
    tags,
    image: file instanceof File && file.size > 0 ? file : undefined,
  };

  // ---------- Validate ----------
  const validatedPayload = zodValidator(
    validationPayload,
    updateEventZodSchema,
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    // ✅ show first field error in toast
    const firstError =
      Object.values(validatedPayload.errors)[0]?.message ?? "Validation failed";

    return {
      success: false,
      message: firstError,
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
    };
  }

  const backendPayload = {
    title: validatedPayload.data.title,

    date: validatedPayload.data.date,
    registrationDeadline: validatedPayload.data.registrationDeadline,
    startTime: validatedPayload.data.startTime,
    endTime: validatedPayload.data.endTime,

    location: validatedPayload.data.location,

    priceType: validatedPayload.data.priceType,
    price: validatedPayload.data.price,

    capacity: validatedPayload.data.capacity,

    description: validatedPayload.data.description,
    tags: validatedPayload.data.tags,
  };

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(backendPayload));

  if (validatedPayload.data.image) {
    newFormData.append("file", validatedPayload.data.image as File);
  }

  try {
    const response = await serverFetch.patch(`/event/update-event/${id}`, {
      body: newFormData,
    });

    const result = await response.json();

    if (result?.success) {
      revalidateTag("events", "default");
    }
    return result;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
      formData: validatedPayload,
    };
  }
}

export async function softDeleteEvent(id: string) {
  try {
    const response = await serverFetch.delete(`/host/event/softDelete/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getEventById(id: string) {
  try {
    const response = await serverFetch.get(`/event/${id}`);
    const result = await response.json();
    console.log("Event", result);
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
