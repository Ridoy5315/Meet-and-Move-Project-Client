import { UserRole } from "@/lib/auth-utils";
import { ISuperAdminProfile } from "./superAdmin.interface";
import { IAdminProfile } from "./admin.interface";
import { IHostProfile } from "./host.interface";

export type UserStatus = "ACTIVE" | "BLOCKED" | "SUSPENDED";
export type Gender = "MALE" | "FEMALE";

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  username?: string | null;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  dateOfBirth?: string | null;
  bio?: string | null;
  interests?: string[];
  address?: string | null;
  isDeleted: boolean;
  isProfilePublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  gender?: Gender | null;
  status: UserStatus;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;

  superAdmin?: ISuperAdminProfile | null;
  admin?: IAdminProfile | null;
  host?: IHostProfile | null;
  user?: IUserProfile | null;
}
