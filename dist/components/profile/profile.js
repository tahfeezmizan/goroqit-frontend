"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfilePage;
const jsx_runtime_1 = require("react/jsx-runtime");
const tabs_1 = require("@/components/ui/tabs");
const navigation_1 = require("next/navigation");
const education_form_1 = require("./education-form");
const personal_details_form_1 = require("./personal-details-form");
const work_experience_form_1 = require("./work-experience-form");
const resume_upload_1 = require("./resume-upload");
const profile_overview_1 = require("./profile-overview");
const profile_section_1 = __importDefault(require("./profile-section"));
function ProfilePage() {
    const router = (0, navigation_1.useRouter)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const activeTab = searchParams.get("tab") || "profile";
    const handleTabChange = (value) => {
        router.push(`/profile?tab=${value}`);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-[#EBF1FA]  ", children: (0, jsx_runtime_1.jsx)("div", { className: "p-4  overflow-hidden ", children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { value: activeTab, onValueChange: handleTabChange, className: "w-full", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { className: "grid w-full grid-cols-5 bg-white mb-8 ", children: [(0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "profile", className: "cursor-pointer", children: "Over View" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "personal-details", className: "cursor-pointer", children: "Personal Details" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "resume", className: "cursor-pointer", children: "Resume / CV" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "education", className: "cursor-pointer", children: "Education" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "work-experience", className: "cursor-pointer", children: "Work Experience" })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "profile", className: "bg-white rounded-lg p-8 shadow-none border-none", children: (0, jsx_runtime_1.jsx)(profile_overview_1.ProfileOverview, {}) }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "personal-details", className: "bg-white rounded-lg p-8 shadow-none border-none space-y-6", children: [(0, jsx_runtime_1.jsx)(profile_section_1.default, {}), (0, jsx_runtime_1.jsx)(personal_details_form_1.PersonalDetailsForm, {})] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "resume", className: "bg-white rounded-lg p-8 shadow-none border-none", children: (0, jsx_runtime_1.jsx)(resume_upload_1.ResumeUpload, {}) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "education", className: "bg-white rounded-lg p-8 shadow-none border-none", children: (0, jsx_runtime_1.jsx)(education_form_1.EducationForm, {}) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "work-experience", className: "bg-white rounded-lg p-8 shadow-none border-none", children: (0, jsx_runtime_1.jsx)(work_experience_form_1.WorkExperienceForm, {}) })] }) }) }));
}
