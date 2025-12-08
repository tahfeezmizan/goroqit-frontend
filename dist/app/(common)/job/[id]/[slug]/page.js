"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const job_apply_form_1 = __importDefault(require("@/components/common/jobs/job-apply-form"));
function page() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-[#EBF1FA]", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden ", children: (0, jsx_runtime_1.jsx)(job_apply_form_1.default, {}) }) }));
}
