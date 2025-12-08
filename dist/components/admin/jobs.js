"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Jobs;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const stats_card_1 = require("../shared/stats-card");
const table_1 = __importDefault(require("./table"));
const react_1 = require("react");
const jobsApi_1 = require("@/redux/features/jobsApi");
function Jobs() {
    const [page, setPage] = (0, react_1.useState)(1);
    const limit = 10;
    const { data, isLoading } = (0, jobsApi_1.useGetAllJobswithStaticsQuery)({ page, limit });
    const meta = data === null || data === void 0 ? void 0 : data.meta;
    // Memoize jobs to make it stable
    const jobs = (0, react_1.useMemo)(() => (data === null || data === void 0 ? void 0 : data.data) || [], [data === null || data === void 0 ? void 0 : data.data]);
    console.log(data);
    // Add serial + salary formatting
    const jobsWithExtras = (0, react_1.useMemo)(() => jobs.map((job, index) => ({
        serial: (page - 1) * limit + index + 1,
        title: job.title,
        category: job.category,
        type: job.type,
        jobLocation: job.jobLocation,
        applicationsCount: job.applicationsCount,
        salaryRange: `£${job.minSalary} - £${job.maxSalary}`,
    })), [jobs, page, limit]);
    // Columns definition for AdminTable
    const columns = (0, react_1.useMemo)(() => [
        { key: "serial", label: "Serial No." },
        { key: "title", label: "Job Title" },
        { key: "category", label: "Category" },
        { key: "type", label: "Type" },
        { key: "jobLocation", label: "Location" },
        { key: "applicationsCount", label: "Applications" },
        { key: "salaryRange", label: "Salary Range" },
    ], []);
    // Stats for StatsCard
    const stats = (0, react_1.useMemo)(() => {
        var _a, _b;
        return [
            {
                title: "Total Job Posted",
                value: ((_a = meta === null || meta === void 0 ? void 0 : meta.total) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || "0",
                change: "+8.5%",
                changeText: "Up from yesterday",
                icon: lucide_react_1.Calendar,
            },
            {
                title: "Active Jobs",
                value: jobs.length.toLocaleString(),
                change: "+8.5%",
                changeText: "Up from yesterday",
                icon: lucide_react_1.Users,
            },
            {
                title: "Applications",
                value: ((_b = meta === null || meta === void 0 ? void 0 : meta.totalApplications) === null || _b === void 0 ? void 0 : _b.toLocaleString()) || "0",
                change: "+8.5%",
                changeText: "Up from yesterday",
                icon: lucide_react_1.Calendar,
            },
        ];
    }, [jobs.length, meta]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(stats_card_1.StatsCard, { stats: stats }), isLoading ? ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "Loading jobs..." })) : ((0, jsx_runtime_1.jsx)(table_1.default, { data: jobsWithExtras, columns: columns, pagination: {
                    page: (meta === null || meta === void 0 ? void 0 : meta.page) || 1,
                    totalPages: (meta === null || meta === void 0 ? void 0 : meta.totalPage) || 1,
                    onPageChange: setPage,
                } }))] }));
}
