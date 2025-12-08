"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TableLoader;
const jsx_runtime_1 = require("react/jsx-runtime");
function TableLoader() {
    return ((0, jsx_runtime_1.jsx)("td", { colSpan: 7, className: "py-8 px-6 text-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-3 text-gray-600", children: "Loading..." })] }) }));
}
