"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const link_1 = __importDefault(require("next/link"));
const page = () => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-md w-full bg-white rounded-2xl shadow-lg border border-green-800 text-center p-8 space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { className: "w-16 h-16 text-[#0F5F3E]" }) }), (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Payment Successful \uD83C\uDF89" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Thank you for your purchase. Your plan has been activated and you\u2019re all set to continue!" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "secondary", className: "bg-transparent hover:bg-green-800 text-green-800 hover:text-white border-2 border-green-900 hover:border-green-800   w-full sm:w-auto", children: "Back to Home" }) }) })] }) }));
};
exports.default = page;
