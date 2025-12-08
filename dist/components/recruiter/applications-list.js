"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsList = ApplicationsList;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const format_date_1 = require("@/lib/format-date");
const application_1 = require("@/redux/features/application");
const link_1 = __importDefault(require("next/link"));
function ApplicationsList() {
    const { data: appliedUser } = (0, application_1.useGetApplicationQuery)("");
    console.log("people apply ", appliedUser);
    return ((0, jsx_runtime_1.jsx)("div", { className: "", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold text-gray-900", children: "Applications" }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-gray-200 bg-gray-50", children: [(0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: "Full Name" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: "Email" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: "Phone" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: "Application Date" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: "Action" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: appliedUser === null || appliedUser === void 0 ? void 0 : appliedUser.map((job) => ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200", children: [(0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6", children: (0, jsx_runtime_1.jsx)("div", { className: "font-medium text-gray-900", children: job === null || job === void 0 ? void 0 : job.name }) }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6 text-gray-700", children: job === null || job === void 0 ? void 0 : job.email }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6 text-gray-700", children: job === null || job === void 0 ? void 0 : job.phone }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6 text-gray-700", children: (0, format_date_1.formatDate)(job === null || job === void 0 ? void 0 : job.createdAt) }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: `/recruiter/applications`, target: "_blank", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "bg-green-50 text-green-900 hover:bg-green-900 hover:text-white duration-300 font-semibold", children: "View Details" }) }) })] }, job === null || job === void 0 ? void 0 : job._id))) })] }) })] }) }));
}
