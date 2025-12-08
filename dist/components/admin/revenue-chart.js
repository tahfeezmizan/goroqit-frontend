"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RevenueChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const select_1 = require("@/components/ui/select");
const chart_1 = require("@/components/ui/chart");
const recharts_1 = require("recharts");
function RevenueChart({ monthlyRevenue, onYearChange }) {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = (0, react_1.useState)(currentYear);
    // Generate array of years: current year ±5
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
    const handleYearChange = (value) => {
        const selectedYear = Number(value);
        setYear(selectedYear);
        if (onYearChange)
            onYearChange(selectedYear);
    };
    const data = monthlyRevenue.map((item) => ({
        month: item.monthName,
        revenue: item.revenue,
    }));
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-white shadow-none border-none", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "text-2xl font-bold text-gray-900", children: ["Revenue - ", year] }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: year.toString(), onValueChange: handleYearChange, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-24", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Year" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: years.map((y) => ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: y.toString(), children: y }, y))) })] })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "pr-0", children: (0, jsx_runtime_1.jsx)(chart_1.ChartContainer, { config: { revenue: { label: "Revenue", color: "#6366F1" } }, className: "h-96 !w-full", children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "100%", children: (0, jsx_runtime_1.jsxs)(recharts_1.AreaChart, { data: data, margin: { top: 10, right: 30, left: 0, bottom: 0 }, children: [(0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsxs)("linearGradient", { id: "revenueGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "5%", stopColor: "#6366F1", stopOpacity: 0.3 }), (0, jsx_runtime_1.jsx)("stop", { offset: "95%", stopColor: "#6366F1", stopOpacity: 0.05 })] }) }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "month", axisLine: false, tickLine: false, tick: { fill: "#9CA3AF", fontSize: 12 } }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, { hide: true }), (0, jsx_runtime_1.jsx)(chart_1.ChartTooltip, { content: (0, jsx_runtime_1.jsx)(chart_1.ChartTooltipContent, {}) }), (0, jsx_runtime_1.jsx)(recharts_1.Area, { type: "monotone", dataKey: "revenue", stroke: "#6366F1", strokeWidth: 3, fill: "url(#revenueGradient)" })] }) }) }) })] }));
}
