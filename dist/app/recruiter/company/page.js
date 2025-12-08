"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const company_profile_1 = __importDefault(require("@/components/recruiter/company-profile"));
const link_1 = __importDefault(require("next/link"));
function page() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold text-gray-900", children: "About Company " }), (0, jsx_runtime_1.jsx)("div", { className: "", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/recruiter/company/edit-company", className: "bg-green-900 hover:bg-green-800 text-white px-8 py-2 text-lg font-medium rounded-lg", children: "Edit Company" }) })] }), (0, jsx_runtime_1.jsx)(company_profile_1.default, {})] }));
}
