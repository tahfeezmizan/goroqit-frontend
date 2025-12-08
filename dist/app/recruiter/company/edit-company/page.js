"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const jsx_runtime_1 = require("react/jsx-runtime");
const company_profile_form_1 = require("@/components/recruiter/company-profile-form");
function page() {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(company_profile_form_1.CompanyProfileForm, {}) }));
}
