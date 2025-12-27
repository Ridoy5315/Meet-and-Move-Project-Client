import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getSidebarNavItemsByRole } from "@/lib/dashboard.navitems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { SidebarNavSection } from "@/types/navSection.interface";
import { UserInfo } from "@/types/user.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;

  const navItems: SidebarNavSection[] = getSidebarNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
