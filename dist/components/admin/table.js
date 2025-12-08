"use strict";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// type Column<T> = {
//     key: keyof T;
//     label: string;
// };
// type PaginationProps = {
//     page: number;
//     totalPages: number;
//     onPageChange: (page: number) => void;
// };
// type TableProps<T> = {
//     data: T[];
//     columns: Column<T>[];
//     pagination?: PaginationProps;
// };
// export default function AdminTable<T extends { [key: string]: any }>({ data, columns, pagination }: TableProps<T>) {
//     return (
//         <div className="">
//             <div className="bg-white rounded-lg overflow-hidden overflow-x-auto">
//                 <table className="w-full">
//                     <thead>
//                         <tr className="border-b border-gray-200 bg-gray-50">
//                             {columns.map((col) => (
//                                 <th key={String(col.key)} className="text-left py-4 px-6 font-semibold text-gray-700">
//                                     {col.label}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((row, rowIndex) => (
//                             <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
//                                 {columns.map((col) => (
//                                     <td key={String(col.key)} className="py-4 px-6 text-gray-700">
//                                         {row[col.key] ?? "-"}
//                                     </td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {/* Server-side Pagination Controls */}
//             {pagination && pagination.totalPages > 1 && (
//                 <div className="flex justify-end items-center gap-2 p-4">
//                     <button className="p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50" onClick={() => pagination.onPageChange(Math.max(pagination.page - 1, 1))} disabled={pagination.page === 1}>
//                         <ChevronLeft />
//                     </button>
//                     {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
//                         <button key={page} onClick={() => pagination.onPageChange(page)} className={`px-3 py-1 rounded-full ${pagination.page === page ? "bg-green-900 text-white font-semibold" : "text-gray-600 hover:bg-gray-100"}`}>
//                             {page}
//                         </button>
//                     ))}
//                     <button className="p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50" onClick={() => pagination.onPageChange(Math.min(pagination.page + 1, pagination.totalPages))} disabled={pagination.page === pagination.totalPages}>
//                         <ChevronRight />
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
function AdminTable({ data, columns, pagination }) {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg overflow-hidden overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { className: "border-b border-gray-200 bg-gray-50", children: columns.map((col) => ((0, jsx_runtime_1.jsx)("th", { className: "text-left py-4 px-6 font-semibold text-gray-700", children: col.label }, col.key))) }) }), (0, jsx_runtime_1.jsx)("tbody", { children: data.map((row, rowIndex) => ((0, jsx_runtime_1.jsx)("tr", { className: "border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200", children: columns.map((col) => {
                                    var _a;
                                    return ((0, jsx_runtime_1.jsx)("td", { className: "py-4 px-6 text-gray-700", children: (_a = row[col.key]) !== null && _a !== void 0 ? _a : "-" }, col.key));
                                }) }, rowIndex))) })] }) }), pagination && pagination.totalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end items-center gap-2 p-4", children: [(0, jsx_runtime_1.jsx)("button", { className: "p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50", onClick: () => pagination.onPageChange(Math.max(pagination.page - 1, 1)), disabled: pagination.page === 1, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, {}) }), Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => ((0, jsx_runtime_1.jsx)("button", { onClick: () => pagination.onPageChange(page), className: `px-3 py-1 rounded-full ${pagination.page === page ? "bg-green-900 text-white font-semibold" : "text-gray-600 hover:bg-gray-100"}`, children: page }, page))), (0, jsx_runtime_1.jsx)("button", { className: "p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50", onClick: () => pagination.onPageChange(Math.min(pagination.page + 1, pagination.totalPages)), disabled: pagination.page === pagination.totalPages, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {}) })] }))] }));
}
