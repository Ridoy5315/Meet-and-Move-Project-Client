export interface IHostProfile {
  id: string;
  name: string;
  username: string | null;
  email: string;
  profilePhoto: string | null;
  contactNumber: string | null;
  organization: string | null;
  experienceLevel: number;
  bio: string | null;
  address: string | null;
  totalEvents: number;
  successfulEvents: number;
  cancelledEvents: number;
  hostRating: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
