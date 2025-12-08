"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobDescriptionPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const format_date_1 = require("@/lib/format-date");
const jobsApi_1 = require("@/redux/features/jobsApi");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const job_details_1 = __importDefault(require("./job-details"));
const jobData = {
    appliedCount: 5,
    capacity: 10,
    applyBefore: "July 31, 2021",
    postedOn: "July 1, 2021",
    jobType: "Full-Time",
    salary: "$75k-$85k USD",
    categories: ["Marketing", "Design"],
    requiredSkills: [
        "Project Management",
        "Copywriting",
        "Social Media Marketing",
        "English",
        "Copy Editing",
    ],
};
function JobDescriptionPage() {
    const { id } = (0, navigation_1.useParams)();
    const { data: job } = (0, jobsApi_1.useGetSingleJobQuery)({ id });
    console.log("JObs ", job);
    //   console.log("Id", id);
    const { capacity, requiredSkills, } = jobData;
    const progressPercentage = ((job === null || job === void 0 ? void 0 : job.applicationsCount) / capacity) * 100;
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-[#EBF1FA]", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden ", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-3 gap-6 mt-10", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-2", children: (0, jsx_runtime_1.jsx)(job_details_1.default, { data: job }) }), (0, jsx_runtime_1.jsxs)("div", { className: "col-span-1 space-y-6 ", children: [(0, jsx_runtime_1.jsx)("aside", { className: "w-full bg-white p-6 rounded-lg", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-8", children: [(0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "About this role" }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-50 rounded-lg p-4 mb-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-between items-center mb-2", children: (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-medium text-gray-700", children: [job === null || job === void 0 ? void 0 : job.applicationsCount, " applied of ", capacity, " capacity"] }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full bg-gray-200 rounded-full h-2", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-green-500 h-2 rounded-full transition-all duration-300", style: { width: `${progressPercentage}%` } }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "Apply Before" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium text-gray-900", children: (0, format_date_1.formatDate)(job === null || job === void 0 ? void 0 : job.endDate) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "Job Posted On" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium text-gray-900", children: (0, format_date_1.formatDate)(job === null || job === void 0 ? void 0 : job.startDate) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "Job Type" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium text-gray-900", children: job === null || job === void 0 ? void 0 : job.type })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "Salary" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium text-gray-900", children: ["$", job === null || job === void 0 ? void 0 : job.minSalary, " - $", job === null || job === void 0 ? void 0 : job.maxSalary, " USD"] })] })] })] }), (0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Categories" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: (0, jsx_runtime_1.jsx)("span", { className: `px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"`, children: job === null || job === void 0 ? void 0 : job.category }) })] }), (0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Required Skills" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: requiredSkills.map((skill, index) => ((0, jsx_runtime_1.jsx)("span", { className: "px-3 py-1 rounded-lg text-sm font-medium bg-gray-50 text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer", children: skill }, index))) })] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: `/job/${job === null || job === void 0 ? void 0 : job.title}/${job === null || job === void 0 ? void 0 : job._id}`, children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg", children: "Apply Now" }) }) })] })] }) }) }));
}
