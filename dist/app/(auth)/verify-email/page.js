"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const auth_layout_1 = require("@/components/auth/auth-layout");
const verify_email_1 = __importDefault(require("@/components/auth/verify-email"));
function page() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [" ", (0, jsx_runtime_1.jsx)(auth_layout_1.AuthLayout, { children: (0, jsx_runtime_1.jsx)(verify_email_1.default, {}) })] }));
}
