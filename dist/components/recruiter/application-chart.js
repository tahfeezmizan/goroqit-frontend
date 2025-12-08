"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationChart = ApplicationChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const chartData = [
    { day: "Sat", value: 65 },
    { day: "Sun", value: 45 },
    { day: "Mon", value: 85 },
    { day: "Tue", value: 55 },
    { day: "Wed", value: 75 },
    { day: "Thu", value: 95 },
    { day: "Fri", value: 35 },
];
function ApplicationChart() {
    const maxValue = Math.max(...chartData.map((d) => d.value));
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xl font-semibold text-gray-900 mb-2", children: "Application trend" }) }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-green-600 hover:bg-green-700 text-white", children: ["This Week", (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "w-4 h-4 ml-2" })] })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-end justify-between h-64 space-x-4", children: chartData.map((item) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full flex items-end justify-center mb-4", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg w-full max-w-12", style: {
                                        height: `${(item.value / maxValue) * 200}px`,
                                        minHeight: "20px",
                                    } }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-500 font-medium", children: item.day })] }, item.day))) }) })] }));
}
