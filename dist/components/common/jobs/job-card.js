"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobCard;
const jsx_runtime_1 = require("react/jsx-runtime");
// components/JobCard.tsx
const company_logo__1__png_1 = __importDefault(require("@/assets/company-logo (1).png"));
const card_1 = require("@/components/ui/card");
const time_ago_1 = __importDefault(require("@/lib/time-ago"));
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
function JobCard({ job }) {
    const { _id, title, jobLocation, maxSalary, minSalary, startDate, type, user, } = job;
    const { companyName } = (user === null || user === void 0 ? void 0 : user.profile) || {};
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full bg-white hover:shadow-md transition rounded-lg", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "flex flex-col lg:flex-row justify-between items-start gap-6 md:gap-4 p-5", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: company_logo__1__png_1.default, alt: "image", width: 80, height: 80, className: "w-20 h-20b object-contain border p-2 rounded mb-2" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold leading-loose", children: title }), (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-800", children: ["Company:", " ", (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: companyName || "No compnay" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-4 mt-2 text-md text-black", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { size: 16, className: "text-green-950 " }), " ", jobLocation] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Briefcase, { size: 16, className: "text-green-950 " }), type] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 16, className: "text-green-950 " }), (0, jsx_runtime_1.jsx)(time_ago_1.default, { date: startDate })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row-reverse lg:flex-col justify-between lg:justify-between sm:items-end gap-3 md:gap-5", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: `job/${_id}`, className: "bg-green-900 hover:bg-green-800 text-white px-2 py-1 text-base font-medium rounded-lg", children: "Apply Now" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [" ", (0, jsx_runtime_1.jsx)(lucide_react_1.CirclePoundSterling, { size: 20, className: "bg-green-900 text-white rounded-full" }), " ", (0, jsx_runtime_1.jsxs)("p", { className: "font-medium text-gray-700", children: ["USD $", minSalary, " - $", maxSalary, " per year"] })] })] })] }) }));
}
