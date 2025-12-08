"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterStats = RecruiterStats;
const jsx_runtime_1 = require("react/jsx-runtime");
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const stats = [
    {
        title: "Total Job Post",
        value: "124",
        change: "+8.5%",
        changeText: "Up from yesterday",
        icon: lucide_react_1.Briefcase,
    },
    {
        title: "Total Applicant",
        value: "124",
        change: "+8.5%",
        changeText: "Up from yesterday",
        icon: lucide_react_1.Users,
    },
    {
        title: "Money Spend",
        value: "124",
        change: "+8.5%",
        changeText: "Up from yesterday",
        icon: lucide_react_1.DollarSign,
    },
];
function RecruiterStats() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: stats.map((stat) => ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "bg-white", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600 mb-1", children: stat.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold text-gray-900 mb-2", children: stat.value }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "w-4 h-4 text-green-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-green-600 font-medium", children: stat.change }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-500", children: stat.changeText })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(stat.icon, { className: "w-6 h-6 text-green-600" }) })] }) }) }, stat.title))) }));
}
