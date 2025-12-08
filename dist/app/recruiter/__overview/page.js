"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const application_chart_1 = require("@/components/recruiter/application-chart");
const recruiter_overview_1 = __importDefault(require("@/components/recruiter/recruiter-overview"));
function page() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(recruiter_overview_1.default, {}), (0, jsx_runtime_1.jsx)(application_chart_1.ApplicationChart, {})] }));
}
