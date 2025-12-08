"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FilterSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const talent_cards_1 = __importDefault(require("@/components/shared/talent-cards"));
const error_message_1 = __importDefault(require("@/lib/error-message"));
const loading_spinner_1 = __importDefault(require("@/lib/loading-spinner"));
const talentApi_1 = require("@/redux/features/talentApi");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const talent_sidebar_1 = require("./talent-sidebar");
function FilterSection() {
    const [filters, setFilters] = (0, react_1.useState)({
        search: "",
        location: "",
        gender: "all",
        skills: "",
    });
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const apiFilters = (0, react_1.useMemo)(() => {
        const apiParams = {
            page: currentPage,
            limit: 8,
        };
        if (filters.search)
            apiParams.searchTerm = filters.search;
        if (filters.location)
            apiParams.location = filters.location;
        if (filters.gender && filters.gender !== "all") {
            apiParams.gender = filters.gender;
        }
        if (filters.skills)
            apiParams.skills = filters.skills;
        return apiParams;
    }, [filters, currentPage]);
    const { data: talentsResponse, isLoading, error, } = (0, talentApi_1.useGetFilteredTalentsQuery)(Object.assign(Object.assign({}, apiFilters), { skills: Array.isArray(apiFilters.skills)
            ? apiFilters.skills.join(",")
            : apiFilters.skills }));
    // Extract talents and pagination data from response
    const { talents, pagination } = (0, react_1.useMemo)(() => {
        if (!talentsResponse) {
            return { talents: [], pagination: null };
        }
        return {
            talents: talentsResponse.data || [],
            pagination: talentsResponse.meta || null,
        };
    }, [talentsResponse]);
    // Transform API data to match TalentCards expected format
    const transformedTalents = (0, react_1.useMemo)(() => {
        return talents.map((talent) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return ({
                id: talent._id,
                name: `${talent.firstName || ""} ${talent.lastName || ""}`.trim() ||
                    ((_a = talent.userId) === null || _a === void 0 ? void 0 : _a.name) ||
                    "Unknown",
                title: ((_c = (_b = talent.workExperience) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.jobTitle) || "Not specified",
                experience: ((_e = (_d = talent.workExperience) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.experience) || "Experience not specified",
                skills: Array.isArray(talent.skills)
                    ? talent.skills
                    : Array.isArray(talent.expartes)
                        ? talent.expartes
                        : [],
                price: talent.salaryExpectation || "Not specified",
                image: ((_f = talent.userId) === null || _f === void 0 ? void 0 : _f.image) || null,
                bio: talent.bio,
                education: (_h = (_g = talent.education) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.degreeTitle,
                country: talent.country,
                city: talent.city,
                workExperience: Array.isArray(talent.workExperience)
                    ? talent.workExperience
                    : [],
                userId: talent.userId,
            });
        });
    }, [talents]);
    console.log(transformedTalents, "transformed talents");
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
        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push((0, jsx_runtime_1.jsx)("button", { onClick: () => handlePageChange(i), className: `px-3 py-1 rounded-full ${currentPage === i
                    ? "bg-green-600 text-white font-semibold border border-green-600"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"}`, children: i }, i));
        }
        // Next button
        pages.push((0, jsx_runtime_1.jsx)("button", { onClick: () => handlePageChange(currentPage + 1), disabled: currentPage === pagination.totalPage, className: `p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50 ${currentPage === pagination.totalPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-green-700 hover:bg-gray-100 border border-gray-300"}`, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {}) }, "next"));
        return pages;
    };
    if (error) {
        return (0, jsx_runtime_1.jsx)(error_message_1.default, { title: "talents" });
    }
    return ((0, jsx_runtime_1.jsx)("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-1", children: (0, jsx_runtime_1.jsx)(talent_sidebar_1.TalentSidebar, { onFiltersChange: handleFiltersChange }) }), (0, jsx_runtime_1.jsxs)("div", { className: "col-span-1 md:col-span-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: isLoading ? ((0, jsx_runtime_1.jsx)(loading_spinner_1.default, {})) : transformedTalents && transformedTalents.length > 0 ? (transformedTalents.map((talent) => ((0, jsx_runtime_1.jsx)(talent_cards_1.default, { talent: talent }, talent._id)))) : ((0, jsx_runtime_1.jsxs)("div", { className: "col-span-2 text-center py-12", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-gray-500 text-lg mb-2", children: "No talents found matching your criteria" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-400", children: "Try adjusting your filters or search terms" })] })) }), pagination && pagination.totalPage > 1 && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-end items-center space-x-2 mt-8", children: renderPageNumbers() }))] })] }) }));
}
