import { Gender } from "./user.interface";

export type HostStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface HostProfile {
  id: string;
  name: string;
  username: string;
  profilePhoto: string;
  gender?: Gender;
  contactNumber: string;
  dateOfBirth?: string;
  organization: string;
  experienceLevel: number;
  bio: string | null;
  address: string | null;
  totalEvents: number;
  successfulEvents: number;
  cancelledEvents: number;
  hostRating: number;
  hostStatus: HostStatus;
  createdAt: string;
  updatedAt: string;
}
