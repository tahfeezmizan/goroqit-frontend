"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentJob = RecentJob;
const jsx_runtime_1 = require("react/jsx-runtime");
const loading_spinner_1 = __importDefault(require("@/lib/loading-spinner"));
const jobsApi_1 = require("@/redux/features/jobsApi");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const recent_job_card_1 = __importDefault(require("./recent-job-card"));
function RecentJob() {
    const { data: jobs, isLoading } = (0, jobsApi_1.useGetAllJobsQuery)('');
    return ((0, jsx_runtime_1.jsx)("section", { className: "bg-[#EBF1FA] py-20", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl lg:text-4xl font-bold ", children: "Recent Job Circular" }), (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/job", className: "bg-transparent  text-black hover:text-white hover:bg-green-800 border-2 border-green-900  px-6 py-1 text-lg font-medium rounded-lg duration-300 flex items-center justify-between gap-2", children: ["Explore all", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "w-4 h-4 " })] })] }), isLoading ? ((0, jsx_runtime_1.jsx)(loading_spinner_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: jobs && (jobs === null || jobs === void 0 ? void 0 : jobs.length) > 0 ? (jobs
                        .slice(0, 6)
                        .map((job) => ((0, jsx_runtime_1.jsx)(recent_job_card_1.default, { job: job }, job._id)))) : ((0, jsx_runtime_1.jsx)("div", { className: "col-span-full text-center py-8 text-2xl text-gray-500", children: "No jobs available" })) }))] }) }));
}
