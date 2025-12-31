import { z } from "zod";

export const createEventZodSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    category: z.enum(["EVENT", "ACTIVITY"], {
      message: "Category is required",
    }),

    date: z.string().min(1, "Date is required"),
    registrationDeadline: z
      .string()
      .min(1, "Registration deadline is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),

    location: z.string().min(2, "Location is required"),

    priceType: z.enum(["FREE", "PAID"]),
    price: z.coerce.number().min(0, "Price can't be negative"),

    capacity: z.coerce.number().int().min(1, "Capacity must be at least 1"),

    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    tags: z.array(z.string()).optional().default([]),
    image: z
      .instanceof(File, { message: "Event image is required" })
      .refine((file) => file.size > 0, {
        message: "Event image is required",
      }),
  })
  .refine(
    (data) => (data.priceType === "FREE" ? data.price === 0 : data.price! > 0),
    {
      message: "Paid events must have a price, free events must have price 0",
      path: ["price"],
    }
  );
