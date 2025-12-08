"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CompanyProfile;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@/lib/utils");
const userApi_1 = require("@/redux/features/userApi");
const image_1 = __importDefault(require("next/image"));
function CompanyProfile() {
    const { data } = (0, userApi_1.useGetMeQuery)(undefined);
    const profileData = data === null || data === void 0 ? void 0 : data.profile;
    console.log("Active", profileData);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm p-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "Company Profile" }), (0, jsx_runtime_1.jsx)("div", { className: "mb-8", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: (0, utils_1.getImageUrl)(profileData === null || profileData === void 0 ? void 0 : profileData.companyLogo), alt: profileData === null || profileData === void 0 ? void 0 : profileData.companyName, width: 80, height: 80, className: "w-20 h-20 border p-2 rounded" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-8 space-y-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold", children: "Company Name" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg ", children: "Hair Stylist" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-8", children: [(0, jsx_runtime_1.jsx)("h3", { className: "block text-xl font-semibold text-gray-900 mb-3", children: "Description" }), (0, jsx_runtime_1.jsx)("p", { children: profileData === null || profileData === void 0 ? void 0 : profileData.companyDescription })] })] }));
}
