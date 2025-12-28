import { UserRole } from "@/lib/auth-utils";
import { HostProfile } from "./host.interface";
import { AdminProfile } from "./admin.interface";
import { SuperAdminProfile } from "./superAdmin.interface";

export type UserStatus = "ACTIVE" | "BLOCKED" | "SUSPENDED";
export type Gender = "MALE" | "FEMALE";

export interface UserProfile {
  name: string;
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

