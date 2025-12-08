"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const filter_section_1 = __importDefault(require("@/components/common/find-talent/filter-section"));
const find_talent_hero_1 = __importDefault(require("@/components/common/find-talent/find-talent-hero"));
function page() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-[#EBF1FA]", children: [(0, jsx_runtime_1.jsx)(find_talent_hero_1.default, {}), (0, jsx_runtime_1.jsx)(filter_section_1.default, {})] }));
}
