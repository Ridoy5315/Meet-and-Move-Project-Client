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
