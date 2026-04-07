import { z } from "zod";

export const becomeHostZodSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must not exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can contain only letters, numbers, and underscores"
    ),

  email: z.string().email("Invalid email address"),

  contactNumber: z
    .string()
    .min(6, "Contact number is too short")
    .max(20, "Contact number is too long"),

  gender: z.enum(["MALE", "FEMALE"]),

  dateOfBirth: z
    .string()
    .nonempty("Date of birth is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format")
    .refine((val) => {
      const dob = new Date(val);
      const today = new Date();

      // Not future date
      if (dob > today) return false;

      // Age calculation
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      return age >= 18;
    }, "You must be at least 18 years old"),

  organization: z.string().min(2, "Organization is required").max(100, "Organization name is too long"),

  experienceLevel: z
    .string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine(
      (val) => Number.isInteger(val) && val >= 0,
      "Experience level must be a non-negative number"
    ),

  bio: z.string().min(2, "Bio is required").max(500, "Bio cannot exceed 500 characters"),

  address: z.string().min(2, "Address is required").max(200, "Address is too long"),

  profilePhoto: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Profile photo is required"),
});
