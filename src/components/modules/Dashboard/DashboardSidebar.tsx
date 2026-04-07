import { getDefaultDashboardRoute, UserRole } from "@/lib/auth-utils";
import { getSidebarNavItemsByRole } from "@/lib/dashboard.navitems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { SidebarNavSection } from "@/types/navSection.interface";

import DashboardSidebarContent from "./DashboardSidebarContent";
import { UserProfile } from "@/types/user.interface";

interface UserInfo {
  userInfo: UserProfile;
  role: UserRole;
}

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
