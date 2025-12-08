"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HiringHero;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const hiring_png_1 = __importDefault(require("@/assets/hiring.png"));
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
const userApi_1 = require("@/redux/features/userApi");
const CountUp_1 = __importDefault(require("@/lib/CountUp"));
function HiringHero() {
    var _a, _b, _c, _d;
    const { data, isLoading } = (0, userApi_1.useGetAllUserQuery)({});
    const activeUsers = ((_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.staticData) === null || _b === void 0 ? void 0 : _b.totalUsers) || 0;
    const applicationsSubmitted = ((_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.staticData) === null || _d === void 0 ? void 0 : _d.totalApplicants) || 0;
    // hii
    return ((0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-20", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: hiring_png_1.default.src, alt: "", width: 600, height: 543, className: "max-w-full max-h-full object-cover" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-3", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-4xl font-bold text-black leading-tight", children: "The Smart Way to Hire" }), (0, jsx_runtime_1.jsx)("p", { className: "", children: "Easily publish your job openings and reach a massive pool of verified candidates instantly." }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-20 mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-3xl font-bold text-gray-400", children: [isLoading ? "---" : (0, jsx_runtime_1.jsx)(CountUp_1.default, { end: activeUsers }), "+"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: "Active Users" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-3xl font-bold text-gray-400", children: [isLoading ? "---" : (0, jsx_runtime_1.jsx)(CountUp_1.default, { end: applicationsSubmitted }), "+"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: "Job Applications Submitted" })] })] }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/recruiter/jobs", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-lg", size: "lg", children: "Post a job now" }) })] })] }) }));
}
