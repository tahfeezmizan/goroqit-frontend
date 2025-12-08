"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFound;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function NotFound() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-md w-full text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-9xl font-bold text-green-900 mb-4", children: "404" }), (0, jsx_runtime_1.jsx)("div", { className: "w-24 h-1 bg-green-800 mx-auto mb-6" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Page Not Found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 text-lg leading-relaxed", children: "Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered the wrong URL." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, className: "bg-green-900 hover:bg-green-800  text-white px-8 py-4 text-lg font-medium rounded-lg", children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Home, { className: "w-4 h-4" }), "Go Home"] }) }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: () => window.history.back(), className: "bg-transparent hover:bg-green-800 hover:text-white border-2 border-green-900 hover:border-green-800 text-black px-6 py-4 text-lg font-medium rounded-lg duration-300", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "w-4 h-4" }), "Go Back"] })] })] }) }));
}
