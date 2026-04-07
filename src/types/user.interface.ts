import { UserRole } from "@/lib/auth-utils";
import { HostProfile } from "./host.interface";
import { AdminProfile } from "./admin.interface";
import { SuperAdminProfile } from "./superAdmin.interface";

export type UserStatus = "ACTIVE" | "BLOCKED" | "SUSPENDED";
export type Gender = "MALE" | "FEMALE";

export interface UserProfile {
  name: string;
  email?: string;
  username?: string;
  profilePhoto?: string;
  gender?: Gender;
  contactNumber?: string;
  dateOfBirth?: string;
  bio?: string;
  interests?: string[];
  address?: string;
  isProfilePublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BaseProfile {
  email: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile | HostProfile | AdminProfile | SuperAdminProfile | null;

  // superAdmin?: ISuperAdminProfile | null;
  // admin?: IAdminProfile | null;
  // host?: IHostProfile | null;
  // user?: IUserProfile | null;
}


import { z } from "zod";

export const editProfileZodSchema = z.object({
  name: z.string().min(2).max(100),
  username: z.string().min(3).max(50).optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  dateOfBirth: z.string().optional(),
  contactNumber: z.string().optional(),
  bio: z.string().max(500).optional(),
  address: z.string().optional(),
  interests: z.array(z.string()).optional(),
  organization: z.string().optional(),
  experienceLevel: z.coerce.number().min(0).max(50).optional(),
});

export type EditProfileFormValues = z.infer<typeof editProfileZodSchema>;

