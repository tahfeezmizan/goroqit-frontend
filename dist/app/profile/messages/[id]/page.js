"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const chat_detail_1 = __importDefault(require("@/components/profile/chat-detail"));
function page() {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(chat_detail_1.default, {}) }));
}
