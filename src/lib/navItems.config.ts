
export const getNavItems = () => {
  return [
    {
      title: "Explore Events",
      items: [
        {
          title: "All Events",
          href: `/credentials/add-new-credential`,
          icon: "FolderPlus",
        },
        {
          title: "Upcoming Events",
          href: `/credentials/view-all-credentials`,
          icon: "ScanEye",
        },
        {
          title: "Popular Events",
          href: `/credentials/manage-credentials`,
          icon: "SquareChartGantt",
        },
        {
          title: "Categories",
          href: `/credentials/manage-credentials`,
          icon: "SquareChartGantt",
        },
      ],
    },
    {
      role: "PUBLIC",
      items: [
        {
          title: "Become Host",
          href: "/settings",
          icon: "Settings2",
        },
      ],
    },
    {
      title: "Account",
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
      items: [
        {
          title: "Settings",
          href: "/settings",
          icon: "Settings2",
        },
      ],
    },
    {
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
