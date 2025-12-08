"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const auth_layout_1 = require("@/components/auth/auth-layout");
const login_form_1 = require("@/components/auth/login-form");
function page() {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(auth_layout_1.AuthLayout, { children: (0, jsx_runtime_1.jsx)(login_form_1.LoginForm, {}) }) }));
}
