"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const auth_layout_1 = require("@/components/auth/auth-layout");
const select_role_1 = __importDefault(require("@/components/auth/select-role"));
function page() {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(auth_layout_1.AuthLayout, { children: (0, jsx_runtime_1.jsx)(select_role_1.default, {}) }) }));
}
