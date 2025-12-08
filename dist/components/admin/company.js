"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React from "react";
// import { StatsCard } from "../shared/stats-card";
// import { Calendar, Users } from "lucide-react";
// import { Column, CompanyData } from "@/types/types";
// import AdminTable from "./table";
// import { useGetAllUserQuery } from "@/redux/features/userApi";
// const stats = [
//     {
//         title: "Total User",
//         value: "40,689",
//         icon: Calendar,
//     },
//     {
//         title: "Job Seekers",
//         value: "3,689 ",
//         icon: Users,
//     },
//     {
//         title: "Total Recruiter",
//         value: "14,154",
//         icon: Calendar,
//     },
// ];
// const companyData: CompanyData[] = [
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 12,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 5,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 7,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 5,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 5,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 4,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 12,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
// ];
// const columns: Column<CompanyData>[] = [
//     { key: "recruiterId", label: "Recruiter ID" },
//     { key: "recruiterName", label: "Recruiter Name" },
//     { key: "companyName", label: "Company Name" },
//     { key: "jobPosted", label: "Job Posted" },
//     { key: "renewalDate", label: "Renewal Date" },
//     { key: "paymentStatus", label: "Payment Status" },
// ];
// export default function Company() {
//     const { data } = useGetAllUserQuery({});
//     console.log(data);
//     return (
//         <div>
//             <StatsCard stats={stats} />
//             <AdminTable data={companyData} columns={columns} />
//         </div>
//     );
// }
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Company;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const stats_card_1 = require("../shared/stats-card");
const lucide_react_1 = require("lucide-react");
const table_1 = __importDefault(require("./table"));
const userApi_1 = require("@/redux/features/userApi");
const columns = [
    { key: "serial", label: "Serial No." },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "companyName", label: "Company" },
    { key: "createdAt", label: "Joined At" },
];
function Company() {
    var _a, _b, _c, _d;
    const [page, setPage] = (0, react_1.useState)(1);
    const limit = 10;
    const { data, isLoading } = (0, userApi_1.useGetAllUserQuery)({ page, limit, role: "recruiter" });
    const users = (0, react_1.useMemo)(() => {
        var _a;
        if (!((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.users))
            return [];
        return data.data.users.map((user, index) => {
            var _a;
            return ({
                serial: (page - 1) * limit + index + 1,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                companyName: ((_a = user.profile) === null || _a === void 0 ? void 0 : _a.companyName) || null,
                createdAt: new Date(user.createdAt).toLocaleDateString(),
            });
        });
    }, [data, page]);
    const stats = (0, react_1.useMemo)(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return [
            {
                title: "Total Users",
                value: ((_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.staticData) === null || _b === void 0 ? void 0 : _b.totalUsers) === null || _c === void 0 ? void 0 : _c.toLocaleString()) || "0",
                icon: lucide_react_1.Calendar,
            },
            {
                title: "Job Seekers",
                value: ((_f = (_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.staticData) === null || _e === void 0 ? void 0 : _e.totalApplicants) === null || _f === void 0 ? void 0 : _f.toLocaleString()) || "0",
                icon: lucide_react_1.Users,
            },
            {
                title: "Total Recruiters",
                value: ((_j = (_h = (_g = data === null || data === void 0 ? void 0 : data.data) === null || _g === void 0 ? void 0 : _g.staticData) === null || _h === void 0 ? void 0 : _h.totalRecruiters) === null || _j === void 0 ? void 0 : _j.toLocaleString()) || "0",
                icon: lucide_react_1.Calendar,
            },
        ];
    }, [data]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(stats_card_1.StatsCard, { stats: stats }), isLoading ? ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "Loading users..." })) : ((0, jsx_runtime_1.jsx)(table_1.default, { data: users, columns: columns, pagination: {
                    page: ((_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.page) || 1,
                    totalPages: ((_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.meta) === null || _d === void 0 ? void 0 : _d.totalPage) || 1,
                    onPageChange: setPage,
                } }))] }));
}
