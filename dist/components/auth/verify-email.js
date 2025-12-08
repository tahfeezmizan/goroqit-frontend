"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VerifyEmail;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("../ui/button");
function VerifyEmail() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-5 text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-semibold ", children: "Verify email " }), (0, jsx_runtime_1.jsx)("p", { children: "Don\u2019t get the verification email to " }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg", children: "Reset email" })] }));
}
