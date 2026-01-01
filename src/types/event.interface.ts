export type EventPriceType = "FREE" | "PAID";
export type EventApprovalStatus = "PENDING" | "PUBLISHED" | "REJECTED";
export type EventLifecycleStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  registrationDeadline: Date;
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
  location: string;
  priceType: EventPriceType;
  price: number | null;
  capacity: number;
  tags: string[];
  imageUrl: string | null;
  participantsCount: number;
  lifecycleStatus: EventLifecycleStatus;
}