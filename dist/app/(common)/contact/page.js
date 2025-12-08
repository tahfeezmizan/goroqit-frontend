"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const contact_form_1 = __importDefault(require("@/components/common/contact-form"));
const newsletter_section_1 = require("@/components/shared/pages/newsletter-section");
function page() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(contact_form_1.default, {}), (0, jsx_runtime_1.jsx)(newsletter_section_1.NewsletterSection, {})] }));
}
