"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppliedJobsPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const table_1 = __importDefault(require("@/components/shared/table"));
const applicationApi_1 = require("@/redux/features/applicationApi");
function AppliedJobsPage() {
    // Pass undefined since this endpoint does not require arguments
    const { data: appliedJobsData, isLoading, error } = (0, applicationApi_1.useGetAppliedJobsQuery)(undefined);
    console.log(appliedJobsData);
    if (isLoading)
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading..." });
    if (error)
        return (0, jsx_runtime_1.jsx)("p", { children: "Error loading jobs" });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-7", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Applied Jobs" }), (0, jsx_runtime_1.jsxs)("table", { className: "w-full bg-white", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-gray-200 bg-gray-50", children: [(0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: "Job Title" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: "Company / Recruiter" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: "Location" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: "Applied Date" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: "Action" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: (0, jsx_runtime_1.jsx)(table_1.default, { appliedJobs: appliedJobsData || [] }) })] })] }));
}
