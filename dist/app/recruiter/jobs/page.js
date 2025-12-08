"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobPostPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const job_post_table_1 = require("@/components/recruiter/job-post-table");
const link_1 = __importDefault(require("next/link"));
function JobPostPage() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6 ", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold text-gray-900", children: "Job Posts" }), (0, jsx_runtime_1.jsx)("div", { className: "", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/recruiter/jobs/post-job", className: "bg-green-900 hover:bg-green-800 text-white px-8 py-2 text-lg font-medium rounded-lg", children: "Post Job" }) })] }), (0, jsx_runtime_1.jsx)(job_post_table_1.JobPostTable, {})] }));
}
