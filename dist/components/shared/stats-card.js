"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsCard = StatsCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const card_1 = require("@/components/ui/card");
function StatsCard({ stats }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: stats.map((stat) => ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "bg-white shadow-none border-none", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "px-6 py-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600 mb-1", children: stat.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold text-gray-900 mb-2", children: stat.value })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(stat.icon, { className: "w-6 h-6 !text-green-900" }) })] }) }) }, stat.title))) }));
}
