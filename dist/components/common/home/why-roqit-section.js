"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhyRoqitSection = WhyRoqitSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const why_roqit_img_png_1 = __importDefault(require("@/assets/why-roqit-img.png"));
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const features = [
    {
        icon: lucide_react_1.Package,
        title: "Made for Beauty & Creative Props",
        description: "Not another corporate job board.",
    },
    {
        icon: lucide_react_1.Gauge,
        title: "Fast & Affordable",
        description: "Job posts go live instantly.",
    },
    {
        icon: lucide_react_1.MapPin,
        title: "Local & Relevant",
        description: "See real roles in your area.",
    },
    {
        icon: lucide_react_1.User,
        title: "Social-Style Profiles",
        description: "Showcase skills, reviews, and photos.",
    },
];
function WhyRoqitSection() {
    return ((0, jsx_runtime_1.jsx)("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-20", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row gap-10 items-center justify-between overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-8 ", children: [(0, jsx_runtime_1.jsx)("h2", { className: " text-4xl  font-bold text-black leading-tight mb-10", children: "Why Roqit?" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-8 ", children: features.map((feature, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-4 ", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 w-12 h-12 bg-green-900 rounded-full flex items-center justify-center ", children: (0, jsx_runtime_1.jsx)(feature.icon, { className: "w-6 h-6 text-white" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg md:text-xl font-semibold text-gray-900 ", children: feature.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-400", children: feature.description })] })] }, index))) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 ", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: why_roqit_img_png_1.default.src, width: 632, height: 556, className: "w-full lg:w-[632px] h-full lg:h-[556px] mr-0", alt: "why roqit" }) })] }) }));
}
