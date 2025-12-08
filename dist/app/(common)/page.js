"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const discover_section_1 = require("@/components/common/home/discover-section");
const hero_section_1 = require("@/components/common/home/hero-section");
const hiring_hero_1 = __importDefault(require("@/components/common/home/hiring-hero"));
const recent_job_1 = require("@/components/common/home/recent-job");
const talent_section_1 = require("@/components/common/home/talent-section");
const why_roqit_section_1 = require("@/components/common/home/why-roqit-section");
const newsletter_section_1 = require("@/components/shared/pages/newsletter-section");
function page() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(hero_section_1.HeroSection, {}), (0, jsx_runtime_1.jsx)(discover_section_1.DiscoverSection, {}), (0, jsx_runtime_1.jsx)(why_roqit_section_1.WhyRoqitSection, {}), (0, jsx_runtime_1.jsx)(recent_job_1.RecentJob, {}), (0, jsx_runtime_1.jsx)(hiring_hero_1.default, {}), (0, jsx_runtime_1.jsx)(talent_section_1.TalentSection, {}), (0, jsx_runtime_1.jsx)(newsletter_section_1.NewsletterSection, {})] }));
}
