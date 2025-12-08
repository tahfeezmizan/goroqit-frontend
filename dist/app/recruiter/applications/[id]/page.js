"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const applicant_resume_1 = __importDefault(require("@/components/recruiter/applicant-resume"));
function page() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-lg", children: (0, jsx_runtime_1.jsx)(applicant_resume_1.default, {}) }));
}
