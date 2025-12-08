"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
function ErrorMessage({ title }) {
    return ((0, jsx_runtime_1.jsx)("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 pb-20 overflow-hidden", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center py-12", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-red-500 text-lg mb-2", children: "Oops! Something went wrong." }), (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-400", children: ["We couldn't load the ", title, ". Please refresh the page or try again later."] })] }) }));
}
