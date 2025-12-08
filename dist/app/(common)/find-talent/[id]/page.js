"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const applicant_profile_1 = __importDefault(require("@/components/common/find-talent/applicant-profile"));
function page() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "pt-20", children: (0, jsx_runtime_1.jsx)(applicant_profile_1.default, {}) }));
}
