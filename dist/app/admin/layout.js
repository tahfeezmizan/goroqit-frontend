"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Layout;
const jsx_runtime_1 = require("react/jsx-runtime");
const dashboard_layout_1 = require("@/components/shared/dashboard-layout");
function Layout({ children }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(dashboard_layout_1.DashboardLayout, { children: children }) }));
}
