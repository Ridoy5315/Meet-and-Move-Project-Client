export const USER_VISIBLE_FIELDS = [
  "name",
  "username",
  "gender",
  "dateOfBirth",
  "contactNumber",
  "bio",
  "address",
  "interests",
];

export const HOST_VISIBLE_FIELDS = [
  "name",
  "username",
  "gender",
  "dateOfBirth",
  "contactNumber",
  "bio",
  "address",
  "organization",
  "experienceLevel",
  "totalEvents",
  "successfulEvents",
  "cancelledEvents",
  "hostRating",
  "hostStatus",
];

export const ADMIN_VISIBLE_FIELDS = [
  "name",
  "username",
  "gender",
  "dateOfBirth",
  "contactNumber",
  "bio",
  "address",
];

export const SUPER_ADMIN_VISIBLE_FIELDS = [
  "name",
  "gender",
  "contactNumber",
];

export function getVisibleFields(role: string) {
  switch (role) {
    case "HOST":
      return HOST_VISIBLE_FIELDS;
    case "ADMIN":
      return ADMIN_VISIBLE_FIELDS;
    case "SUPER_ADMIN":
      return SUPER_ADMIN_VISIBLE_FIELDS;
    default:
      return USER_VISIBLE_FIELDS;
  }
}
