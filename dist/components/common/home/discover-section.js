"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoverSection = DiscoverSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const discover_section_img__1__png_1 = __importDefault(require("../../../../public/discover-section-img (1).png"));
const discover_section_img__2__png_1 = __importDefault(require("../../../../public/discover-section-img (2).png"));
const discover_section_img__3__png_1 = __importDefault(require("../../../../public/discover-section-img (3).png"));
function DiscoverSection() {
    const features = [
        {
            title: "Setup your profile!",
            description: "Start by creating an account with basic details. Then, add your professional info and upload your resume. It's quick and easy!",
            image: discover_section_img__1__png_1.default,
        },
        {
            title: "Describe your job",
            description: "Simply enter the job title, describe the role and its responsibilities, and list required skills. It's as straightforward as that!",
            image: discover_section_img__2__png_1.default,
        },
        {
            title: "Search some talents!",
            description: "Browse through profiles, filter by skills or experience, and find the perfect match for your job. It's effortless and efficient!",
            image: discover_section_img__3__png_1.default,
        },
    ];
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-[#EBF1FA] py-14", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-center mb-12", children: (0, jsx_runtime_1.jsx)("h2", { className: "text-4xl font-bold text-foreground mb-4", children: "Discover" }) }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-7 pb-8", children: features.map((feature, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white text-center rounded-lg p-5 ", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: feature.image, alt: feature.title, width: 200, height: 200, className: "mx-auto w-52 h-52 mb-6" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold mb-2", children: feature.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-base text-gray-600", children: feature.description })] }, index))) })] }) }));
}
