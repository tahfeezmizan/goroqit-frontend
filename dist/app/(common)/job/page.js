"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const jobs_section_1 = __importDefault(require("@/components/common/jobs/jobs-section"));
function page() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-[#EBF1FA] pt-24", children: (0, jsx_runtime_1.jsx)(jobs_section_1.default, {}) }));
}
