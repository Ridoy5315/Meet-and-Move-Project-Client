export type UserRole = "SUPER_ADMIN" | "ADMIN" | "HOST" | "USER";

export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/set-password", "/change-password" ],
    patterns: [], 
}

export const superAdminProtectedRoutes: RouteConfig = {
    patterns: [/^\/super-admin/], 
    exact: [], 
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], 
    exact: [], 
}

export const hostProtectedRoutes: RouteConfig = {
    patterns: [/^\/host/], 
    exact: [],
}

export const userProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/], 
    exact: [], 
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): "SUPER_ADMIN" | "ADMIN" | "HOST" | "USER" | "COMMON" | null => {
    if (isRouteMatches(pathname, superAdminProtectedRoutes)) {
        return "SUPER_ADMIN";
    }
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRouteMatches(pathname, hostProtectedRoutes)) {
        return "HOST";
    }
    if (isRouteMatches(pathname, userProtectedRoutes)) {
        return "USER";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "SUPER_ADMIN") {
        return "/super-admin/dashboard";
    }
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "HOST") {
        return "/host/dashboard";
    }
    if (role === "USER") {
        return "/dashboard";
    }
    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}