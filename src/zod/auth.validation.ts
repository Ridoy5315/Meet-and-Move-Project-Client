import { z } from "zod";

export const registrationZodSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 5 characters")
      .max(60, "Name must be at most 60 characters"),

    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .regex(
        /^[a-zA-Z0-9._]+$/,
        "Username can only contain letters, numbers, dot (.) and underscore (_)"
      ),

    email: z.string().trim().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 40 characters")
      .regex(/[A-Z]/, "Password must include at least 1 uppercase letter")
      .regex(/[a-z]/, "Password must include at least 1 lowercase letter")
      .regex(/[0-9]/, "Password must include at least 1 number")
      .regex(/[^A-Za-z0-9]/, "Password must include at least 1 symbol"),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginZodSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password is required")
    .max(64, "Password must be at most 40 characters"),
});
