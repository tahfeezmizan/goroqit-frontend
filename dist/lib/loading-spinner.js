"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoadingSpinner;
const jsx_runtime_1 = require("react/jsx-runtime");
function LoadingSpinner() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center py-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin h-8 w-8 border-2 border-green-800 border-t-transparent rounded-full" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-3 text-gray-600", children: "Loading..." })] }));
}
