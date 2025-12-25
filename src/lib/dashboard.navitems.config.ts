import { SidebarNavSection } from "@/types/navSection.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

// export const getCommonNavItems = (role: UserRole): SidebarNavSection[] => {
//   const defaultDashboard = getDefaultDashboardRoute(role);

//   return [
//     {
//       title: "Overview",
//       items: [
//         {
//           title: "Dashboard",
//           href: defaultDashboard,
//           icon: "LayoutDashboard",
//           roles: ["USER", "HOST", "ADMIN", "SUPER_ADMIN"],
//         },
//       ],
//     },
//     {
//       title: "Account",
//       items: [
//         {
//           title: "Profile",
//           href: "/account/profile",
//           icon: "User",
//           roles: ["USER"],
//         },
//         {
//           title: "Settings",
//           href: "/account/settings",
//           icon: "Settings",
//           roles: ["USER"],
//         },
//         {
//           title: "Security",
//           href: "/account/security",
//           icon: "Shield",
//           roles: ["USER"],
//         },
//       ],
//     },
//   ];
// };

export const getCommonNavItems = (role: UserRole) => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  const overview: SidebarNavSection = {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: defaultDashboard,
        icon: "LayoutDashboard",
        roles: ["USER", "HOST"],
      },
    ],
  };

  const administration: SidebarNavSection = {
    title: "Administration",
    items: [
      {
        title: "Overview",
        href: defaultDashboard,
        icon: "LayoutDashboard",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  };

  const account: SidebarNavSection = {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: "/account/profile",
        icon: "User",
        roles: ["USER", "HOST", "ADMIN", "SUPER_ADMIN"],
      },
      {
        title: "Settings",
        href: "/account/settings",
        icon: "Settings",
        roles: ["USER", "HOST", "ADMIN", "SUPER_ADMIN"],
      },
      {
        title: "Security",
        href: "/account/security",
        icon: "Shield",
        roles: ["USER", "HOST", "ADMIN", "SUPER_ADMIN"],
      },
    ],
  };

  return { overview, administration, account };
};

export const adminNavItems: SidebarNavSection[] = [
  {
    title: "Administration",
    items: [
      {
        title: "Overview",
        href: "/admin/dashboard",
        icon: "LayoutDashboard",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        href: "/admin/dashboard/users",
        icon: "Users",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
      {
        title: "Hosts",
        href: "/admin/dashboard/hosts",
        icon: "UserCog",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "Event Operations",
    items: [
      {
        title: "Events",
        href: "/admin/dashboard/events",
        icon: "Calendar",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
      {
        title: "Categories",
        href: "/admin/dashboard/categories",
        icon: "Tags",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
      {
        title: "Reported Events",
        href: "/admin/dashboard/reports",
        icon: "AlertTriangle",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "Moderation",
    items: [
      {
        title: "Reviews & Ratings",
        href: "/admin/dashboard/reviews",
        icon: "Star",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
      {
        title: "Blocked Accounts",
        href: "/admin/dashboard/blocked",
        icon: "Ban",
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Analytics",
        href: "/admin/dashboard/analytics",
        icon: "BarChart3",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
      {
        title: "Audit Logs",
        href: "/admin/dashboard/audit-logs",
        icon: "FileSearch",
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
];


export const hostNavItems: SidebarNavSection[] = [
  {
    title: "Event Management",
    items: [
      {
        title: "All Events",
        href: "/host/dashboard/events",
        icon: "Calendar",
        badge: "3",
        roles: ["HOST"],
      },
      {
        title: "Upcoming",
        href: "/host/dashboard/events/upcoming",
        icon: "CalendarClock",
        roles: ["HOST"],
      },
      {
        title: "Past Events",
        href: "/host/dashboard/events/history",
        icon: "History",
        roles: ["HOST"],
      },
    ],
  },
  {
    title: "Participants",
    items: [
      {
        title: "Attendees",
        href: "/host/dashboard/participants",
        icon: "Users",
        roles: ["HOST"],
      },
      {
        title: "Requests & Approvals",
        href: "/host/dashboard/participants/requests",
        icon: "UserCheck",
        roles: ["HOST"],
      },
      {
        title: "Messages",
        href: "/host/dashboard/messages",
        icon: "MessageSquare",
        roles: ["HOST"],
      },
    ],
  },
  {
    title: "Create & Promote",
    items: [
      {
        title: "Create Event",
        href: "/host/dashboard/events/create",
        icon: "PlusCircle",
        roles: ["HOST"],
      },
      {
        title: "Draft Events",
        href: "/host/dashboard/events/drafts",
        icon: "FileText",
        roles: ["HOST"],
      },
    ],
  },
  {
    title: "Performance",
    items: [
      {
        title: "Analytics",
        href: "/host/dashboard/analytics",
        icon: "BarChart3",
        roles: ["HOST"],
      },
      {
        title: "Earnings",
        href: "/host/dashboard/earnings",
        icon: "Wallet",
        roles: ["HOST"],
      },
      {
        title: "Ratings & Reviews",
        href: "/host/dashboard/reviews",
        icon: "Star",
        roles: ["HOST"],
      },
    ],
  },
  {
    title: "Host Profile",
    items: [
      {
        title: "Public Profile",
        href: "/host/profile",
        icon: "User",
        roles: ["HOST"],
      },
      {
        title: "Verification",
        href: "/host/profile/verification",
        icon: "BadgeCheck",
        roles: ["HOST"],
      },
    ],
  },
];


export const userNavItems: SidebarNavSection[] = [
  {
    title: "My Activities",
    items: [
      {
        title: "Joined",
        href: "/dashboard/events/joined",
        badge: "3",
        icon: "CalendarCheck",
        roles: ["USER"],
      },
      {
        title: "Upcoming",
        href: "/dashboard/events/upcoming",
        icon: "CalendarClock",
        roles: ["USER"],
      },
      {
        title: "History",
        href: "/dashboard/events/history",
        icon: "History",
        roles: ["USER"],
      },
      {
        title: "Saved",
        href: "/dashboard/events/saved",
        icon: "Bookmark",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "Discover",
    items: [
      {
        title: "Explore Events",
        href: "/events",
        icon: "Compass",
        roles: ["USER"],
      },
      {
        title: "Categories",
        href: "/events/categories",
        icon: "Tags",
        roles: ["USER"],
      },
    ],
  },
];

export const getSidebarNavItemsByRole = (
  role: UserRole
): SidebarNavSection[] => {
  const { overview, administration, account } = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
      return [administration, ...adminNavItems, account];
    case "ADMIN":
      return [administration, ...adminNavItems, account];
    case "HOST":
      return [overview, ...hostNavItems, account];
    case "USER":
      return [overview, ...userNavItems, account];
    default:
      return [];
  }
};
