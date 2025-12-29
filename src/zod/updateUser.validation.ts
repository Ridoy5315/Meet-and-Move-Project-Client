import { z } from "zod";

export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters")
    .optional(),

  username: z
    .string()
    .min(2, "Username must be at least 3 characters long")
    .max(30, "Username must not exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can contain only letters, numbers, and underscores"
    )
    .optional(),

  email: z
    .string()
    .email("Invalid email address")
    .optional(),

  contactNumber: z
    .string()
    .min(11, "Contact number is too short")
    .max(15, "Contact number is too long")
    .optional().or(z.literal("")),

  gender: z.enum(["MALE", "FEMALE"], { message: "Gender must be either 'MALE' or 'FEMALE'" }).optional().or(z.literal("")),

  dateOfBirth: z
  .string()
  .optional()
  .refine(
    (value) => !value || !Number.isNaN(Date.parse(value)),
    { message: "Invalid date of birth" }
  ).optional(),

  bio: z
    .string()
    .max(300, "Bio must not exceed 300 characters")
    .optional(),

  address: z
    .string()
    .max(200, "Address must not exceed 200 characters")
    .optional(),

  interests: z
    .array(
      z
        .string()
        .min(2, "Interest must be at least 2 characters")
        .max(30, "Interest must not exceed 30 characters")
    )
    .optional(),

  profilePhoto: z
    .instanceof(File)
    .optional(),
});
