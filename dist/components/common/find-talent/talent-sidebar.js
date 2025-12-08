"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalentSidebar = TalentSidebar;
const jsx_runtime_1 = require("react/jsx-runtime");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const lodash_1 = require("lodash");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
function TalentSidebar({ onFiltersChange }) {
    const [filterData, setFilterData] = (0, react_1.useState)({
        search: "",
        location: "",
        gender: "all",
        skills: "",
    });
    // Debounced filter change handler
    const debouncedFilterChange = (0, react_1.useCallback)((0, lodash_1.debounce)((filters) => {
        onFiltersChange(filters);
    }, 500), [onFiltersChange]);
    // Update debounced filters when filterData changes
    (0, react_1.useEffect)(() => {
        debouncedFilterChange(filterData);
        return () => {
            debouncedFilterChange.cancel();
        };
    }, [filterData, debouncedFilterChange]);
    const handleInputChange = (field, value) => {
        setFilterData((prev) => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    const handleClearAll = () => {
        const clearedFilters = {
            search: "",
            location: "",
            gender: "all",
            skills: "",
        };
        setFilterData(clearedFilters);
        onFiltersChange(clearedFilters);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full p-6 bg-white rounded-lg space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center text-xl border-b", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-semibold text-gray-800 leading-relaxed", children: "Filter" }), (0, jsx_runtime_1.jsx)("button", { className: "text-red-500 text-lg hover:text-red-600 leading-relaxed cursor-pointer", onClick: handleClearAll, children: "Clear All" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-black", children: "Search" }), (0, jsx_runtime_1.jsx)("div", { className: "relative", children: (0, jsx_runtime_1.jsx)(input_1.Input, { type: "text", placeholder: "Search by name or skills", value: filterData.search, onChange: (e) => handleInputChange("search", e.target.value), className: "pl-4 pr-4 py-2 w-full rounded-lg !text-md text-black border border-gray-300" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-black", children: "Location" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "text", placeholder: "Location", value: filterData.location, onChange: (e) => handleInputChange("location", e.target.value), className: "pl-10 pr-4 py-2 w-full rounded-lg !text-md text-black" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-black", children: "Gender" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: filterData.gender, onValueChange: (val) => handleInputChange("gender", val), children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "mt-1 p-4 rounded-lg !text-md text-black w-full", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select Gender" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "All Genders" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Male", children: "Male" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Female", children: "Female" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Other", children: "Other" })] })] })] })] }));
}
