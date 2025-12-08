"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const empty_state_1 = __importDefault(require("@/components/profile/empty-state"));
const lucide_react_1 = require("lucide-react");
function page() {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("main", { className: "flex h-[750px] flex-col items-center justify-center p-4 bg-white", children: (0, jsx_runtime_1.jsx)(empty_state_1.default, { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-12 w-12 text-gray-300" }), title: "No new messages", description: "You've read them all!" }) }) }));
}
