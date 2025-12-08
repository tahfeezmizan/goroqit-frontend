"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = layout;
const jsx_runtime_1 = require("react/jsx-runtime");
const footer_1 = require("@/components/shared/footer/footer");
const navbar_1 = require("@/components/shared/header/navbar");
function layout({ children }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "", children: [(0, jsx_runtime_1.jsx)(navbar_1.Navbar, {}), children, (0, jsx_runtime_1.jsx)(footer_1.Footer, {})] }));
}
