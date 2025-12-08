"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const stats_card_1 = require("../shared/stats-card");
const table_1 = __importDefault(require("./table"));
const userApi_1 = require("@/redux/features/userApi");
const react_1 = require("react");
const columns = [
    { key: "_id", label: "Serial Id" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "companyName", label: "Company" },
    { key: "createdAt", label: "Joined At" },
];
function User() {
    var _a, _b, _c;
    const [page, setPage] = (0, react_1.useState)(1);
    const limit = 10;
    const { data, isLoading } = (0, userApi_1.useGetAllUserQuery)({ page, limit });
    const users = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.users) || [];
    const meta = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.meta;
    const staticData = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.staticData;
    // Generate stats dynamically
    const stats = (0, react_1.useMemo)(() => {
        var _a, _b, _c;
        return [
            {
                title: "Total Users",
                value: ((_a = staticData === null || staticData === void 0 ? void 0 : staticData.totalUsers) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || "0",
                icon: lucide_react_1.Calendar,
            },
            {
                title: "Job Seekers",
                value: ((_b = staticData === null || staticData === void 0 ? void 0 : staticData.totalApplicants) === null || _b === void 0 ? void 0 : _b.toLocaleString()) || "0",
                icon: lucide_react_1.Users,
            },
            {
                title: "Total Recruiters",
                value: ((_c = staticData === null || staticData === void 0 ? void 0 : staticData.totalRecruiters) === null || _c === void 0 ? void 0 : _c.toLocaleString()) || "0",
                icon: lucide_react_1.Calendar,
            },
        ];
    }, [staticData]);
    const usersWithSerial = users.map((user, index) => (Object.assign(Object.assign({}, user), { _id: (page - 1) * limit + index + 1 })));
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(stats_card_1.StatsCard, { stats: stats }), isLoading ? ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "Loading users..." })) : ((0, jsx_runtime_1.jsx)(table_1.default, { data: usersWithSerial, columns: columns, pagination: {
                    page: (meta === null || meta === void 0 ? void 0 : meta.page) || 1,
                    totalPages: (meta === null || meta === void 0 ? void 0 : meta.totalPage) || 1,
                    onPageChange: setPage,
                } }))] }));
}
