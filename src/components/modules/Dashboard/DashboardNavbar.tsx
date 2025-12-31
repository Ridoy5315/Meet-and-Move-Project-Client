import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getSidebarNavItemsByRole } from "@/lib/dashboard.navitems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";

import DashboardNavbarContent from "./DashboardNavbarContent";
import { BaseProfile } from "@/types/user.interface";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as BaseProfile;
  const navItems = getSidebarNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
