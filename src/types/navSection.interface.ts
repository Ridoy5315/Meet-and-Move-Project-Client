import { UserRole } from "@/lib/auth-utils";
import { NavbarUserRole } from "@/lib/navItems.config";


export interface NavItem {
    title: string;
    href: string;
    icon: string; 
}

export interface NavSection {
    title?: string;
    items: NavItem[];
    roles?: NavbarUserRole[];
}

export interface SidebarNavItem {
    title: string;
    href: string;
    icon: string;
    badge?: string;
    roles?: UserRole[]; 
}

export interface SidebarNavSection {
    title?: string;
    items: SidebarNavItem[];
}
