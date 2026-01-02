import { z } from "zod";

export const createEventZodSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),

    date: z.string().min(1, "Event date is required"),
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



export const updateEventZodSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters").optional(),

    description: z.string().min(20, "Description must be at least 20 characters").optional(),

    date: z.string().min(1, "Event date is required").optional(),

    registrationDeadline: z
      .string()
      .min(1, "Registration deadline is required")
      .optional(),

    startTime: z.string().min(1, "Start time is required").optional(),

    endTime: z.string().min(1, "End time is required").optional(),

    location: z.string().min(2, "Location is required").optional(),

    priceType: z.enum(["FREE", "PAID"]).optional(),

    price: z.coerce.number().min(1, "Price can't be negative").optional(),

    capacity: z.coerce.number().int().min(1, "Capacity must be at least 1").optional(),

    tags: z
      .array(z.string().min(1))
      .max(5, "Maximum 5 tags allowed")
      .optional(),

    image: z.instanceof(File).optional(),
  })
  .superRefine((data, ctx) => {
    // 🔒 Conditional price validation
    if (data.priceType === "PAID" && data.price == null) {
      ctx.addIssue({
        path: ["price"],
        message: "Price is required for paid events",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.priceType === "FREE" && data.price != null && data.price !== 0) {
      ctx.addIssue({
        path: ["price"],
        message: "Free events must have price 0",
        code: z.ZodIssueCode.custom,
      });
    }

    // 🔒 Date logic only if both provided
    if (data.date && data.registrationDeadline) {
      if (new Date(data.registrationDeadline) > new Date(data.date)) {
        ctx.addIssue({
          path: ["registrationDeadline"],
          message: "Registration deadline cannot be after event date",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
