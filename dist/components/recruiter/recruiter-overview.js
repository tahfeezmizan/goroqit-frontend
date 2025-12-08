"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RecruiterOverview;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const stats_card_1 = require("../shared/stats-card");
const application_chart_1 = require("./application-chart");
const recruterStaticsApi_1 = require("@/redux/features/recruterStaticsApi");
function RecruiterOverview() {
    var _a, _b, _c;
    const { data, isLoading, error } = (0, recruterStaticsApi_1.useGetRecruiterStatisticsQuery)();
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading statistics..." });
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: "Failed to load recruiter statistics" });
    }
    const recruiterStats = data === null || data === void 0 ? void 0 : data.data;
    const stats = [
        {
            title: "Total Job Post",
            value: (_a = recruiterStats === null || recruiterStats === void 0 ? void 0 : recruiterStats.totalJobs.toString()) !== null && _a !== void 0 ? _a : "0",
            change: "+0%", // you can calculate % change later if API supports
            changeText: "Compared to last week",
            icon: lucide_react_1.Briefcase,
        },
        {
            title: "Total Applicant",
            value: (_b = recruiterStats === null || recruiterStats === void 0 ? void 0 : recruiterStats.totalApplications.toString()) !== null && _b !== void 0 ? _b : "0",
            change: "+0%",
            changeText: "Compared to last week",
            icon: lucide_react_1.Users,
        },
        {
            title: "Total Chats",
            value: (_c = recruiterStats === null || recruiterStats === void 0 ? void 0 : recruiterStats.totalChats.toString()) !== null && _c !== void 0 ? _c : "0",
            change: "+0%",
            changeText: "Compared to last week",
            icon: lucide_react_1.DollarSign, // you could swap this for a chat icon if you prefer
        },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-8 space-y-1", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-semibold", children: "Welcome back, Luck" }), (0, jsx_runtime_1.jsx)("p", { children: "Here is your job listings statistic report." })] }), (0, jsx_runtime_1.jsx)(stats_card_1.StatsCard, { stats: stats }), (0, jsx_runtime_1.jsx)(application_chart_1.ApplicationChart, {})] }));
}
