"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarFilter = SidebarFilter;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const checkbox_1 = require("@/components/ui/checkbox");
const slider_1 = require("@/components/ui/slider");
const select_1 = require("@/components/ui/select");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const lucide_react_1 = require("lucide-react");
const categoryApi_1 = require("@/redux/features/categoryApi");
const lodash_1 = require("lodash");
function SidebarFilter({ onFiltersChange }) {
    var _a, _b;
    const { data: categories } = (0, categoryApi_1.useGetCategoryQuery)({});
    const categoryNames = ((_b = (_a = categories === null || categories === void 0 ? void 0 : categories.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map((category) => category.name)) || [];
    const [filterData, setFilterData] = (0, react_1.useState)({
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
    // Debounced filter change handler
    const debouncedFilterChange = (0, react_1.useCallback)((0, lodash_1.debounce)((filters) => {
        onFiltersChange(filters);
    }, 500), [onFiltersChange]);
    (0, react_1.useEffect)(() => {
        debouncedFilterChange(filterData);
        return () => {
            debouncedFilterChange.cancel();
        };
    }, [filterData, debouncedFilterChange]);
    const handleInputChange = (field, value) => {
        setFilterData((prev) => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    const handleJobTypeChange = (jobTypeField, value) => {
        setFilterData((prev) => (Object.assign(Object.assign({}, prev), { jobType: Object.assign(Object.assign({}, prev.jobType), { [jobTypeField]: value }) })));
    };
    // Keep inputs in sync with slider
    const handleSalaryInputChange = (value, index) => {
        const num = Number(value);
        if (!isNaN(num)) {
            const newRange = [...filterData.salaryRange];
            newRange[index] = num;
            if (newRange[0] <= newRange[1]) {
                setFilterData((prev) => (Object.assign(Object.assign({}, prev), { salaryRange: newRange })));
            }
        }
    };
    const handleClearAll = () => {
        const clearedFilters = {
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
        };
        setFilterData(clearedFilters);
        onFiltersChange(clearedFilters);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full p-6 bg-white rounded-lg space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center text-xl border-b", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-semibold text-gray-800 leading-relaxed", children: "Filter" }), (0, jsx_runtime_1.jsx)("button", { className: "text-lg text-red-500 hover:text-red-600 leading-relaxed cursor-pointer", onClick: handleClearAll, children: "Clear All" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-black", children: "Search" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "text", placeholder: "Job title or keyword", value: filterData.search, onChange: (e) => handleInputChange("search", e.target.value), className: "pl-10 pr-4 py-2 w-full rounded-lg !text-md text-black" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "text", placeholder: "Location", value: filterData.location, onChange: (e) => handleInputChange("location", e.target.value), className: "pl-10 pr-4 py-2 w-full rounded-lg !text-md text-black" })] })] }), (0, jsx_runtime_1.jsx)("hr", { className: "border-t border-gray-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-black", children: "Category" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: filterData.category, onValueChange: (val) => handleInputChange("category", val), children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "mt-1 p-4 rounded-lg !text-md text-black w-full", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select category" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all-categories", children: "All Categories" }), categoryNames.map((categoryName, index) => ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: categoryName, children: categoryName }, index)))] })] })] }), (0, jsx_runtime_1.jsx)("hr", { className: "border-t border-gray-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-black", children: "Job Type" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: "full-time", checked: filterData.jobType.fullTime, onCheckedChange: (val) => handleJobTypeChange("fullTime", !!val) }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "full-time", className: "text-md font-medium leading-none", children: "Full time" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: "part-time", checked: filterData.jobType.partTime, onCheckedChange: (val) => handleJobTypeChange("partTime", !!val) }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "part-time", className: "text-md font-medium leading-none", children: "Part time" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: "contract", checked: filterData.jobType.contract, onCheckedChange: (val) => handleJobTypeChange("contract", !!val) }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "contract", className: "text-md font-medium leading-none", children: "Contract" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: "contract", checked: filterData.jobType.remote, onCheckedChange: (val) => handleJobTypeChange("remote", !!val) }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "remote", className: "text-md font-medium leading-none", children: "Remote" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: "freeLance", checked: filterData.jobType.freeLance, onCheckedChange: (val) => handleJobTypeChange("freeLance", !!val) }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "freeLance", className: "text-md font-medium leading-none", children: "Freelance" })] })] })] }), (0, jsx_runtime_1.jsx)("hr", { className: "border-t border-gray-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-black", children: "Salary Range" }), (0, jsx_runtime_1.jsx)(slider_1.Slider, { value: filterData.salaryRange, onValueChange: (val) => handleInputChange("salaryRange", val), step: 100, min: 0, max: 200000, className: "w-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-4", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", value: filterData.salaryRange[0], onChange: (e) => handleSalaryInputChange(e.target.value, 0), className: "w-1/2" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", value: filterData.salaryRange[1], onChange: (e) => handleSalaryInputChange(e.target.value, 1), className: "w-1/2" })] })] })] }));
}
