"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtaSection = CtaSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const cta_section_img_png_1 = __importDefault(require("../../../../public/cta-section-img.png"));
const link_1 = __importDefault(require("next/link"));
function CtaSection() {
    return ((0, jsx_runtime_1.jsx)("section", { className: "relative h-auto flex \r\n       items-center lg:items-end  justify-center overflow-hidden py-24 md:py-36", style: {
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${cta_section_img_png_1.default.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }, children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto  px-4 sm:px-6  text-center text-white", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl md:text-6xl font-bold leading-tight text-balance mb-6", children: "Ready to Post Your First Job?" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/job", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "lg", className: "bg-green-900 hover:bg-green-800 text-white px-8 md:px-12 py-4 md:py-6 text-lg font-medium rounded-lg", children: "Post a job now" }) })] }) }));
}
