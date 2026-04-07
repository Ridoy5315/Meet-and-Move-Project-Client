import { z } from "zod";

export const createEventZodSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),

    date: z.string().min(1, "Event date is required"),

    registrationStartDate: z
      .string()
      .min(1, "Registration start date is required"), 

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

  // registrationStartDate < registrationDeadline
  .refine(
    (data) =>
      new Date(data.registrationStartDate) <
      new Date(data.registrationDeadline),
    {
      message:
        "Registration start date must be earlier than registration deadline",
      path: ["registrationStartDate"],
    },
  )

  // registrationDeadline <= event date
  .refine(
    (data) => new Date(data.registrationDeadline) <= new Date(data.date),
    {
      message: "Registration deadline cannot be after event date",
      path: ["registrationDeadline"],
    },
  )

  // FREE / PAID price rule
  .refine(
    (data) => (data.priceType === "FREE" ? data.price === 0 : data.price > 0),
    {
      message: "Paid events must have a price, free events must have price 0",
      path: ["price"],
    },
  );

export const updateEventZodSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters").optional(),

    description: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .optional(),

    date: z.string().min(1, "Event date is required").optional(),

    registrationStartDate: z
      .string()
      .min(1, "Registration start date is required")
      .optional(), // ✅ NEW

    registrationDeadline: z
      .string()
      .min(1, "Registration deadline is required")
      .optional(),

    startTime: z.string().min(1, "Start time is required").optional(),
    endTime: z.string().min(1, "End time is required").optional(),

    location: z.string().min(2, "Location is required").optional(),

    priceType: z.enum(["FREE", "PAID"]).optional(),

    price: z.coerce.number().min(0, "Price cannot be negative").optional(),

    capacity: z.coerce
      .number()
      .int()
      .min(1, "Capacity must be at least 1")
      .optional(),

    tags: z
      .array(z.string().min(1))
      .max(5, "Maximum 5 tags allowed")
      .optional(),

    image: z.instanceof(File).optional(),
  })
  .superRefine((data, ctx) => {
    // 🔒 Price rules
    if (data.priceType === "PAID") {
      const p = typeof data.price === "number" ? data.price : undefined;
      if (!p || p <= 0) {
        ctx.addIssue({
          path: ["price"],
          message: "Price must be greater than 0 for paid events",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (data.priceType === "FREE" && data.price !== undefined && data.price !== 0) {
      ctx.addIssue({
        path: ["price"],
        message: "Free events must have price 0",
        code: z.ZodIssueCode.custom,
      });
    }

    // registrationStartDate < registrationDeadline (only if both provided)
    if (data.registrationStartDate && data.registrationDeadline) {
      const start = new Date(data.registrationStartDate);
      const deadline = new Date(data.registrationDeadline);

      if (!(start < deadline)) {
        ctx.addIssue({
          path: ["registrationStartDate"],
          message:
            "Registration start date must be earlier than registration deadline",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // 🔒 registrationDeadline <= event date (only if both provided)
    if (data.date && data.registrationDeadline) {
      const eventDate = new Date(data.date);
      const deadline = new Date(data.registrationDeadline);

      if (deadline > eventDate) {
        ctx.addIssue({
          path: ["registrationDeadline"],
          message: "Registration deadline cannot be after event date",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // ⭐ Optional (recommended): if user updates one registration date, require the other too
    // if (data.registrationStartDate && !data.registrationDeadline) {
    //   ctx.addIssue({
    //     path: ["registrationDeadline"],
    //     message: "Registration deadline is required when start date is provided",
    //     code: z.ZodIssueCode.custom,
    //   });
    // }

    // if (!data.registrationStartDate && data.registrationDeadline) {
    //   ctx.addIssue({
    //     path: ["registrationStartDate"],
    //     message: "Registration start date is required when deadline is provided",
    //     code: z.ZodIssueCode.custom,
    //   });
    // }
  });

