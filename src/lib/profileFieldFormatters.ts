

export const FIELD_LABELS: Record<string, string> = {
  name: "Full Name",
  username: "Username",
  gender: "Gender",
  dateOfBirth: "Date of Birth",
  contactNumber: "Contact Number",
  bio: "About",
  address: "Address",
  organization: "Organization",
  experienceLevel: "Experience Level (Years)",
  totalEvents: "Total Events",
  successfulEvents: "Successful Events",
  cancelledEvents: "Cancelled Events",
  hostRating: "Host Rating",
  hostStatus: "Host Status",
  interests: "Interests",
};

export function getFriendlyLabel(key: string) {
  return FIELD_LABELS[key] ?? key;
}
