"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FindTalentHero;
const jsx_runtime_1 = require("react/jsx-runtime");
const talent_hero_img_png_1 = __importDefault(require("@/assets/talent-hero-img.png"));
function FindTalentHero() {
    // const handleSubmit = (e: React.FormEvent) => {
    //   e.preventDefault();
    //   console.log("[v0] Newsletter subscription:", search);
    //   // Handle newsletter subscription logic here
    //   setSearch("");
    // };
    return ((0, jsx_runtime_1.jsx)("section", { className: "bg-[#414652] pb-20 px-4  pt-40 ", style: {
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${talent_hero_img_png_1.default.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }, children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-10", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl md:text-5xl font-bold text-white text-balance", children: "Top Talent Ready to Work" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-200 text-md md:text-2xl font-normal px-0 lg:px-40 leading-snug", children: "Discover verified professionals who are open for work right now. Browse their profiles, check ratings, and connect instantly." })] }) }) }));
}
