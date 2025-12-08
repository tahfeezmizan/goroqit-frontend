"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobsSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const rocket_png_1 = __importDefault(require("@/assets/rocket.png"));
const jobsApi_1 = require("@/redux/features/jobsApi");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const job_card_1 = __importDefault(require("./job-card"));
const sidebar_filter_1 = require("./sidebar-filter");
const lucide_react_1 = require("lucide-react");
const loading_spinner_1 = __importDefault(require("@/lib/loading-spinner"));
const error_message_1 = __importDefault(require("@/lib/error-message"));
function JobsSection() {
    const [filters, setFilters] = (0, react_1.useState)({
        search: "",
        location: "",
        category: "all-categories",
        jobType: {
            fullTime: false,
            partTime: false,
            contract: false,
            remote: false,
            freeLance: false,
        },
        salaryRange: [0, 100000],
    });
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    // Convert filter data to API parameters
    const apiFilters = (0, react_1.useMemo)(() => {
        const apiParams = {
            page: currentPage,
            limit: 8,
        };
        if (filters.search)
            apiParams.searchTerm = filters.search;
        if (filters.location)
            apiParams.jobLocation = filters.location;
        if (filters.category && filters.category !== "all-categories") {
            apiParams.category = filters.category;
        }
        // Handle job types - support multiple selection
        const selectedJobTypes = Object.entries(filters.jobType)
            .filter(([isSelected]) => isSelected)
            .map(([type]) => type);
        if (selectedJobTypes.length > 0) {
            const jobTypeMapping = {
                fullTime: "Full-time",
                partTime: "Part-time",
                contract: "Contract",
                remote: "Remote",
                freeLance: "Freelance",
            };
            const apiJobTypes = selectedJobTypes.map((type) => jobTypeMapping[type]);
            // If your API only supports single type, take the first one
            apiParams.type = apiJobTypes[0];
        }
        const [minSalary, maxSalary] = filters.salaryRange;
        if (minSalary > 0)
            apiParams.minSalary = minSalary;
        if (maxSalary < 100000)
            apiParams.maxSalary = maxSalary;
        return apiParams;
    }, [filters, currentPage]);
    const { data: jobsResponse, isLoading, error, } = (0, jobsApi_1.useGetFilterdJobsQuery)(apiFilters);
    console.log(jobsResponse, "jobs");
    // Extract jobs and pagination data from response
    const { jobs, pagination } = (0, react_1.useMemo)(() => {
        if (!jobsResponse) {
            return { jobs: [], pagination: null };
        }
        if (Array.isArray(jobsResponse)) {
            return { jobs: jobsResponse, pagination: null };
        }
        return {
            jobs: jobsResponse.data || [],
            pagination: jobsResponse.meta || null,
        };
    }, [jobsResponse]);
    const handleFiltersChange = (0, react_1.useCallback)((newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    }, []);
    const handlePageChange = (0, react_1.useCallback)((page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    // Generate page numbers for pagination
    const renderPageNumbers = () => {
        if (!pagination || pagination.totalPage <= 1)
            return null;
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(pagination.totalPage, startPage + maxVisiblePages - 1);
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        // Previous button
        pages.push((0, jsx_runtime_1.jsx)("button", { onClick: () => handlePageChange(currentPage - 1), disabled: currentPage === 1, className: `p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50 ${currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-green-700 hover:bg-gray-100 border border-gray-300"}`, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, {}) }, "prev"));
        // First page
        if (startPage > 1) {
            pages.push((0, jsx_runtime_1.jsx)("button", { onClick: () => handlePageChange(1), className: "p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50", children: "1" }, 1));
            if (startPage > 2) {
                pages.push((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1", children: "..." }, "ellipsis1"));
            }
        }
        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push((0, jsx_runtime_1.jsx)("button", { onClick: () => handlePageChange(i), className: `px-3 py-1 rounded-full ${currentPage === i
                    ? "bg-green-600 text-white font-semibold border border-green-600"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"}`, children: i }, i));
        }
        // Last page
        if (endPage < pagination.totalPage) {
            if (endPage < pagination.totalPage - 1) {
                pages.push((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1", children: "..." }, "ellipsis2"));
            }
            pages.push((0, jsx_runtime_1.jsx)("button", { onClick: () => handlePageChange(pagination.totalPage), className: "px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300", children: pagination.totalPage }, pagination.totalPage));
        }
        // Next button
        pages.push((0, jsx_runtime_1.jsx)("button", { onClick: () => handlePageChange(currentPage + 1), disabled: currentPage === pagination.totalPage, className: `p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50 ${currentPage === pagination.totalPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-green-700 hover:bg-gray-100 border border-gray-300"}`, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {}) }, "next"));
        return pages;
    };
    if (error) {
        return ((0, jsx_runtime_1.jsx)(error_message_1.default, { title: "jobs" }));
    }
    return ((0, jsx_runtime_1.jsxs)("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 pb-20 overflow-hidden h-full min-h-screen", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center mb-10 space-y-2 pt-5 lg:pt-10", children: [(0, jsx_runtime_1.jsxs)("h2", { className: "text-3xl lg:text-4xl font-bold text-center", children: ["Find Your ", (0, jsx_runtime_1.jsx)("span", { className: "text-green-600", children: "Styler" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-3", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[#515B6F] text-base", children: "Find your next career at Roqit" }), (0, jsx_runtime_1.jsx)(image_1.default, { src: rocket_png_1.default.src, alt: "rocket image", width: 42, height: 42 })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-1", children: (0, jsx_runtime_1.jsx)(sidebar_filter_1.SidebarFilter, { onFiltersChange: handleFiltersChange }) }), (0, jsx_runtime_1.jsxs)("div", { className: "col-span-1 md:col-span-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "space-y-6 mb-8", children: isLoading ? ((0, jsx_runtime_1.jsx)(loading_spinner_1.default, {})) : jobs && (jobs === null || jobs === void 0 ? void 0 : jobs.length) > 0 ? (jobs === null || jobs === void 0 ? void 0 : jobs.map((job) => ((0, jsx_runtime_1.jsx)(job_card_1.default, { job: job }, job._id)))) : ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-12", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-gray-500 text-lg mb-2", children: "No jobs found matching your criteria" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-400", children: "Try adjusting your filters or search terms" })] })) }), pagination && pagination.totalPage > 1 && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-end items-center space-x-2 mt-8", children: renderPageNumbers() }))] })] })] }));
}
