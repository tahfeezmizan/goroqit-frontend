"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeaturePurchaseChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const card_1 = require("@/components/ui/card");
const recharts_1 = require("recharts");
// Feature purchase data for pie chart
const featurePurchaseData = [
    { name: "Geo-Boost", value: 32, color: "#FF715B" },
    { name: "Featured Job Ad", value: 45, color: "#34D196" },
    { name: "Urgent Badge", value: 40, color: "#6610F2" },
];
function FeaturePurchaseChart() {
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white shadow-none border-none", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-2xl font-bold text-gray-900", children: "Feature Purchase" }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center h-80", children: [(0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "100%", children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, { data: featurePurchaseData, cx: "50%", cy: "50%", innerRadius: 90, outerRadius: 120, paddingAngle: 2, dataKey: "value", children: featurePurchaseData.map((entry, index) => ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: entry.color }, `cell-${index}`))) }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {})] }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-3xl font-bold text-gray-900", children: "3986" }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-500", children: "Total Purchase" })] }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-3 mt-6 justify-center", children: featurePurchaseData.map((item, index) => ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white", style: { backgroundColor: item.color }, children: item.name }, index))) })] })] }));
}
