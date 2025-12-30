import { z } from "zod";

export const createEventZodSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.enum(["EVENT", "ACTIVITY"], { message: "Category is required" }),

  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),

  location: z.string().min(2, "Location is required"),
  isOnline: z.coerce.boolean().optional().default(false),

  priceType: z.enum(["FREE", "PAID"]),
  price: z.coerce.number().min(0, "Price can't be negative").optional(),

  capacity: z.coerce.number().int().min(1, "Capacity must be at least 1"),

  description: z.string().min(20, "Description must be at least 20 characters"),
  tags: z.array(z.string()).optional().default([]),
  image: z
    .instanceof(File, { message: "Event image is required" })
    .refine((file) => file.size > 0, {
      message: "Event image is required",
    })
});
