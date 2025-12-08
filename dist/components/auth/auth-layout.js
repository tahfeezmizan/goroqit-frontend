"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLayout = AuthLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const auth_img_png_1 = __importDefault(require("../../../public/auth-img.png"));
function AuthLayout({ children }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen flex", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden lg:flex lg:w-1/2 relative", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: auth_img_png_1.default.src, alt: "Authentication background", fill: true, className: "object-cover", priority: true }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-black/20" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 lg:w-1/2 flex items-center justify-center p-8", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full max-w-lg ", children: children }) })] }));
}
