import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getSidebarNavItemsByRole } from "@/lib/dashboard.navitems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
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
