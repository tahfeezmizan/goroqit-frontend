"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobsHero;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const job_hero_png_1 = __importDefault(require("../../../../public/job-hero.png"));
function JobsHero() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-4 overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: job_hero_png_1.default.src, alt: "", width: 780, height: 500, className: "" }) }) }));
}
