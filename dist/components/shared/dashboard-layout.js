"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLayout = DashboardLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const sidebar_nav_config_1 = require("@/lib/sidebar-nav-config");
const userApi_1 = require("@/redux/features/userApi");
const top_navbar_1 = require("../recruiter/top-navbar");
const dashboard_sidebar_1 = require("./dashboard-sidebar");
function DashboardLayout({ children }) {
    const { data } = (0, userApi_1.useGetMeQuery)(undefined);
    const role = data === null || data === void 0 ? void 0 : data.role;
    // console.log("getMe data:", data);
    let sidebarItems;
    switch (role) {
        case "admin":
            sidebarItems = sidebar_nav_config_1.adminItems;
            break;
        case "recruiter":
            sidebarItems = sidebar_nav_config_1.recruiterItems;
            break;
        case "applicant":
            sidebarItems = sidebar_nav_config_1.applicantItems;
            break;
        default:
            sidebarItems = [];
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-screen overflow-x-auto grid grid-cols-6 gap-0 bg-[#F5F6FA]", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-1", children: (0, jsx_runtime_1.jsx)(dashboard_sidebar_1.DashboardSidebar, { sidebarItems: sidebarItems }) }), (0, jsx_runtime_1.jsxs)("main", { className: "col-span-5 overflow-y-auto", children: [(0, jsx_runtime_1.jsx)(top_navbar_1.TopNavbar, {}), (0, jsx_runtime_1.jsx)("div", { className: "p-8 bg-[#EBF1FA]", children: children })] })] }));
}
