"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const chat_list_1 = __importDefault(require("@/components/profile/chat-list"));
function ChatLayout({ children, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "p-4 overflow-hidden", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-6 min-h-screen", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-2 h-screen ", children: (0, jsx_runtime_1.jsx)(chat_list_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "col-span-4 h-screen", children: children })] }) }));
}
