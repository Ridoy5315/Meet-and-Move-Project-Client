import { Gender } from "./user.interface";

export interface AdminProfile{
  name: string;
  username?: string;
  profilePhoto?: string;
  gender?: Gender;
  dateOfBirth?: string;
  contactNumber?: string;
  bio?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}
