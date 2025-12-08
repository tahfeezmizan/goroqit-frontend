"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const stats_card_1 = require("@/components/shared/stats-card");
const feature_purchase_chart_1 = __importDefault(require("@/components/admin/feature-purchase-chart"));
const revenue_chart_1 = __importDefault(require("@/components/admin/revenue-chart"));
const lucide_react_1 = require("lucide-react");
const adminStatics_1 = require("@/redux/features/adminStatics");
function DashboardPage() {
    var _a, _b, _c, _d, _e, _f, _g;
    const [year, setYear] = (0, react_1.useState)(new Date().getFullYear());
    // Pass year as a parameter to fetch stats
    const { data, isLoading } = (0, adminStatics_1.useGetStatisticsQuery)({ year });
    if (isLoading)
        return (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "Loading dashboard..." });
    const stats = [
        {
            title: "Total Job Post",
            value: ((_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.jobs) === null || _b === void 0 ? void 0 : _b.totalJobs.toLocaleString()) || "0",
            icon: lucide_react_1.Briefcase,
        },
        {
            title: "Total Applicant",
            value: ((_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.users) === null || _d === void 0 ? void 0 : _d.totalApplicants.toLocaleString()) || "0",
            icon: lucide_react_1.Users,
        },
        {
            title: "Money Spend",
            value: `£${((_f = (_e = data === null || data === void 0 ? void 0 : data.data) === null || _e === void 0 ? void 0 : _e.subscriptions) === null || _f === void 0 ? void 0 : _f.totalRevenue.toLocaleString()) || "0"}`,
            icon: lucide_react_1.DollarSign,
        },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-semibold", children: "Welcome back" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Here is your job listings statistic report for ", year, "."] })] }), (0, jsx_runtime_1.jsx)(stats_card_1.StatsCard, { stats: stats }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-3 gap-4 mt-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-2", children: (0, jsx_runtime_1.jsx)(revenue_chart_1.default, { monthlyRevenue: ((_g = data === null || data === void 0 ? void 0 : data.data) === null || _g === void 0 ? void 0 : _g.monthlyRevenue) || [], onYearChange: (newYear) => setYear(newYear) }) }), (0, jsx_runtime_1.jsx)("div", { className: "col-span-1", children: (0, jsx_runtime_1.jsx)(feature_purchase_chart_1.default, {}) })] })] }));
}
