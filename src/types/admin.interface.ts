export interface IAdminProfile {
  id: string;
  name: string;
  username?: string | null;
  email: string;
  profilePhoto?: string | null;
  dateOfBirth?: string | null;
  contactNumber?: string | null;
  bio?: string | null;
  address?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
