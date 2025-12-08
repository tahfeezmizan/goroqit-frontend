"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
const jsx_runtime_1 = require("react/jsx-runtime");
const applications_list_1 = require("@/components/recruiter/applications-list");
function Page() {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(applications_list_1.ApplicationsList, {}) }));
}
