"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostTable = JobPostTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const jobsApi_1 = require("@/redux/features/jobsApi");
const lucide_react_1 = require("lucide-react");
const table_loader_1 = __importDefault(require("../shared/table-loader"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const tableHeaders = [
    { key: "jobTitle", label: "Job Title" },
    { key: "location", label: "Location" },
    { key: "salary", label: "Salary" },
    { key: "posted", label: "Posted" },
    { key: "expires", label: "Expires" },
    { key: "applicantCount", label: "Applicant Count" },
    { key: "action", label: "Action" },
];
function JobPostTable() {
    const [page, setPage] = (0, react_1.useState)(1);
    const [limit, setLimit] = (0, react_1.useState)(10);
    const [deleteJob] = (0, jobsApi_1.useDeleteJobMutation)();
    const { data, isLoading, error } = (0, jobsApi_1.useGetAllJobsQuery)({
        page,
        limit,
    });
    console.log(data);
    const handleDelete = (id) => {
        console.log(id);
        sweetalert2_1.default.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#009966",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteJob(id).unwrap();
                    sweetalert2_1.default.fire("Deleted!", "Job has been deleted.", "success");
                }
                catch (error) {
                    sweetalert2_1.default.fire("Error!", "Failed to delete job. Please try again.", "error");
                }
            }
        });
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "rounded-lg overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-white overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { className: "border-b border-gray-200 bg-gray-50", children: tableHeaders.map((header) => ((0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: header.label }, header.key))) }) }), (0, jsx_runtime_1.jsx)("tbody", { children: isLoading ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)(table_loader_1.default, {}) })) : error ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: 7, className: "py-8 px-6 text-center text-red-600", children: "Error loading jobs. Please try again." }) })) : data && data.length > 0 ? (
                        // Show data when available
                        data === null || data === void 0 ? void 0 : data.map((job) => ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200", children: [(0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6", children: (0, jsx_runtime_1.jsx)("div", { className: "font-medium text-gray-900", children: job.title }) }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6 text-gray-700", children: job.jobLocation }), (0, jsx_runtime_1.jsxs)("td", { className: "py-4 px-6 text-gray-700", children: [job.minSalary, " - ", job.maxSalary, " "] }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6 text-gray-700", children: new Date(job.startDate).toLocaleDateString() }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6 text-gray-700", children: new Date(job.endDate).toLocaleDateString() }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6 text-gray-700", children: job.applicationsCount }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6", children: (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", children: (0, jsx_runtime_1.jsx)(lucide_react_1.MoreVertical, { className: "w-4 h-4" }) }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { align: "end", children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/", children: "View Details" }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsx)(link_1.default, { href: `/recruiter/jobs/${job._id}`, children: "Edit Job" }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => handleDelete(job._id), className: "text-red-700", children: "Delete" })] })] }) })] }, job._id)))) : (
                        // Show empty state when no data is available
                        (0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: 7, className: "py-8 px-6 text-center text-gray-500", children: "No jobs found." }) })) })] }) }) }));
}
