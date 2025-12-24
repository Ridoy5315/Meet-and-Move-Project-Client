import { NavSection } from "@/types/navSection.interface";
import { getNavbarItems, NavbarUserRole } from "./navItems.config";

export const getNavbarByRole = (role: NavbarUserRole): NavSection[] => {
  return getNavbarItems().filter(
    (section) => !section.roles || section.roles.includes(role)
  ) as NavSection[];
};
