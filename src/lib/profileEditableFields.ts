import { UserRole } from "./auth-utils";

export const USER_EDITABLE_FIELDS = [
  "name",
  "username",
  "profilePhoto",
  "email",
  "gender",
  "dateOfBirth",
  "contactNumber",
  "bio",
  "address",
  "interests",
];

export const HOST_EDITABLE_FIELDS = [
  "name",
  "username",
  "profilePhoto",
  "email",
  "gender",
  "dateOfBirth",
  "contactNumber",
  "bio",
  "address",
  "organization",
  "experienceLevel",
];

export const ADMIN_EDITABLE_FIELDS = [
  "name",
  "username",
  "email",
  "profilePhoto",
  "gender",
  "dateOfBirth",
  "contactNumber",
  "bio",
  "address",
];

export const SUPER_ADMIN_EDITABLE_FIELDS = [
  "name",
  "username",
  "email",
  "profilePhoto",
  "gender",
  "dateOfBirth",
  "contactNumber",
  "bio",
  "address",
];

export function getEditableFields(role: UserRole) {
  switch (role) {
    case "HOST":
      return HOST_EDITABLE_FIELDS;
    case "ADMIN":
      return ADMIN_EDITABLE_FIELDS;
    case "SUPER_ADMIN":
      return SUPER_ADMIN_EDITABLE_FIELDS;
    default:
      return USER_EDITABLE_FIELDS;
  }
}
