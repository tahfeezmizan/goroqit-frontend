"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RecentJobCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const company_logo__1__png_1 = __importDefault(require("@/assets/company-logo (1).png"));
const time_ago_1 = __importDefault(require("@/lib/time-ago"));
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
function RecentJobCard({ job }) {
    const { _id, title, startDate, experianceLabel, user } = job || {};
    const { companyName } = (user === null || user === void 0 ? void 0 : user.profile) || {};
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-lg overflow-hidden bg-white  p-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start mb-8", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: company_logo__1__png_1.default, alt: title, width: 80, height: 80, className: "w-20 h-20 border p-2 rounded" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-bold", children: experianceLabel || "Experienced" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: (0, jsx_runtime_1.jsx)(time_ago_1.default, { date: startDate }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-4 mt-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold leading-none group-hover:text-white transition-colors duration-400", children: title }), (0, jsx_runtime_1.jsx)("p", { children: companyName || "No Company" })] }), (0, jsx_runtime_1.jsx)(link_1.default, { href: `/job/${_id}`, className: "bg-green-900 text-white px-2 py-1 text-sm rounded-lg w-28 mr-0 text-center", children: "View Details" })] }) })] }, _id));
}
