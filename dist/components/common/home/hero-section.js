"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSection = HeroSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const link_1 = __importDefault(require("next/link"));
// import heroBg from "../../../../public/banner-img.png";
const hero_bg_png_1 = __importDefault(require("@/assets/hero-bg.png"));
const avatar_1 = require("@/components/ui/avatar");
function HeroSection() {
    return ((0, jsx_runtime_1.jsx)("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden", style: {
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${hero_bg_png_1.default.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }, children: (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10 max-w-6xl mx-auto text-white text-center px-4 md:px-20 py-16 md:py-20 overflow-hidden space-y-5", children: [(0, jsx_runtime_1.jsxs)("h1", { className: "text-4xl sm:text-5xl font-bold leading-tight text-balance", children: ["Find Work. Find Talent.", " ", (0, jsx_runtime_1.jsx)("span", { className: "text-[#0F5F3E]", children: "All in One" }), " Place."] }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg md:text-2xl px-0 lg:px-40 leading-snug text-gray-200", children: "Roqit connects salons, barbers, and beauty creatives with fresh talent and opportunities. No stress. Just jobs that fit." }), (0, jsx_runtime_1.jsxs)("div", { className: " flex flex-col items-center justify-center sm:flex-row gap-4", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/find-talent", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "lg", className: "bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-lg", children: "Hire now" }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/job", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "lg", variant: "secondary", className: "bg-transparent hover:bg-green-800 border-2 border-green-900 hover:border-green-800 text-white px-6 py-4 text-lg font-medium rounded-lg duration-300", children: "Get hired" }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-row flex-wrap justify-center items-center gap-12", children: (0, jsx_runtime_1.jsxs)("div", { className: "*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { children: (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: "https://github.com/shadcn.png", alt: "@shadcn" }) }), (0, jsx_runtime_1.jsx)(avatar_1.Avatar, { children: (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: "https://github.com/leerob.png", alt: "@leerob" }) }), (0, jsx_runtime_1.jsx)(avatar_1.Avatar, { children: (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: "https://github.com/evilrabbit.png", alt: "@evilrabbit" }) })] }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-center", children: "1,200+ applicant already joined" })] }) }));
}
