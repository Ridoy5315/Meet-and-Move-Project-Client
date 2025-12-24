

export type NavbarUserRole = "PUBLIC" | "USER" | "HOST" | "ADMIN" | "SUPER_ADMIN";

export const getNavbarItems = () => {
  return [
    {
      roles: ["PUBLIC", "USER", "HOST", "ADMIN"],
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Settings2",
        },
      ],
    },
    {
      title: "Explore Events",
      roles: ["PUBLIC", "USER", "HOST"],
      items: [
        {
          title: "All Events",
          href: `/explore-events/all-events`,
          icon: "FolderPlus",
        },
        {
          title: "Upcoming Events",
          href: `/explore-events/upcoming-events`,
          icon: "ScanEye",
        },
        {
          title: "Popular Events",
          href: `/explore-events/popular-events`,
          icon: "SquareChartGantt",
        },
        {
          title: "Categories",
          href: `/explore-events/categories`,
          icon: "SquareChartGantt",
        },
      ],
    },
    {
      roles: ["USER"],
      items: [
        {
          title: "My Events",
          href: `/dashboard/my-events/all-events`,
          icon: "FolderPlus",
        },
      ],
    },
    // {
    //   title: "My Events",
    //   items: [
    //     {
    //       title: "Joined Events",
    //       href: `/dashboard/my-events/all-events`,
    //       icon: "FolderPlus",
    //     },
    //     {
    //       title: "Upcoming Events",
    //       href: `/dashboard/my-events/upcoming-events`,
    //       icon: "ScanEye",
    //     },
    //     {
    //       title: "Past Events",
    //       href: `/dashboard/my-events/my-events`,
    //       icon: "SquareChartGantt",
    //     },
    //   ],
    // },
    {
      roles: ["HOST"],
      items: [
        {
          title: "My Events",
          href: `/host/dashboard/my-events/hosted-events`,
          icon: "FolderPlus",
        },
      ],
    },
    // {
    //   title: "My Events",
    //   items: [
    //     {
    //       title: "Joined Events",
    //       href: `/host/dashboard/my-events/hosted-events`,
    //       icon: "FolderPlus",
    //     },
    //     {
    //       title: "Upcoming Events",
    //       href: `/host/dashboard/my-events/upcoming-hosted-events`,
    //       icon: "ScanEye",
    //     },
    //     {
    //       title: "Past Events",
    //       href: `/host/dashboard/my-events/past-hosted-events`,
    //       icon: "SquareChartGantt",
    //     },
    //     {
    //       title: "Past Events",
    //       href: `/host/dashboard/my-events/participants-management`,
    //       icon: "SquareChartGantt",
    //     },
    //   ],
    // },
    {
      roles: ["ADMIN"],
      items: [
        {
          title: "Control Panel",
          href: `/admin/dashboard/control-panel/manage-users`,
          icon: "FolderPlus",
        },
      ],
    },
    // {
    //   title: "Control Panel",
    //   items: [
    //     {
    //       title: "Manage Users",
    //       href: `/admin/dashboard/control-panel/manage-users`,
    //       icon: "FolderPlus",
    //     },
    //     {
    //       title: "Manage Hosts",
    //       href: `/admin/dashboard/control-panel/manage-hosts`,
    //       icon: "ScanEye",
    //     },
    //     {
    //       title: "Manage Events",
    //       href: `/admin/dashboard/control-panel/manage-events`,
    //       icon: "SquareChartGantt",
    //     },
    //   ],
    // },
    {
      roles: ["PUBLIC", "USER"],
      items: [
        {
          title: "Become Host",
          href: "/become-host",
          icon: "Settings2",
        },
      ],
    },
    {
      roles: ["HOST"],
      items: [
        {
          title: "Create Events",
          href: "/create-events",
          icon: "Settings2",
        },
      ],
    },
    {
      title: "Account",
      roles: ["USER", "HOST", "ADMIN"],
      items: [
        {
          title: "Profile",
          href: "/account/profile",
          icon: "UserPen",
        },
        {
          title: "Change Password",
          href: "/account/change-password",
          icon: "LockKeyhole",
        },
      ],
    },
    {
      roles: ["PUBLIC", "USER", "HOST", "ADMIN"],
      items: [
        {
          title: "About Us",
          href: "/aboutUs",
          icon: "UsersRound",
        },
      ],
    },
  ];
};
