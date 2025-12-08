"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalentSection = TalentSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const talent_cards_1 = __importDefault(require("@/components/shared/talent-cards"));
const loading_spinner_1 = __importDefault(require("@/lib/loading-spinner"));
const userApi_1 = require("@/redux/features/userApi");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
function TalentSection() {
    var _a;
    const { data: talent, isLoading } = (0, userApi_1.useGetAllTalentQuery)("");
    console.log("All Talent", talent);
    return ((0, jsx_runtime_1.jsx)("section", { className: "bg-[#EBF1FA] py-20", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl lg:text-4xl font-bold ", children: "Top Talent Ready to Work" }), (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/find-talent", className: "bg-transparent  text-black hover:text-white hover:bg-green-800 border-2 border-green-900  px-6 py-1 text-lg font-medium rounded-lg duration-300 flex items-center justify-between gap-2", children: ["Explore all", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "w-4 h-4 " })] })] }), isLoading ? ((0, jsx_runtime_1.jsx)(loading_spinner_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: talent && talent.length > 0 ? ((_a = talent === null || talent === void 0 ? void 0 : talent.slice(0, 6)) === null || _a === void 0 ? void 0 : _a.map((talent) => ((0, jsx_runtime_1.jsx)(talent_cards_1.default, { talent: talent }, talent._id)))) : ((0, jsx_runtime_1.jsx)("div", { className: "col-span-full text-center py-8 text-2xl text-gray-500", children: "No Talent available" })) }))] }) }));
}
