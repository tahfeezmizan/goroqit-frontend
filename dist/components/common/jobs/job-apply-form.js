"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobApplyForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const application_1 = require("@/redux/features/application");
const navigation_1 = require("next/navigation");
const react_hook_form_1 = require("react-hook-form");
const sonner_1 = require("sonner");
function JobApplyForm() {
    var _a;
    const params = (0, navigation_1.useParams)();
    const { id, slug } = params;
    const route = (0, navigation_1.useRouter)();
    const jobTitle = decodeURIComponent(id);
    const jobSlug = Array.isArray(slug) ? slug[0] : slug !== null && slug !== void 0 ? slug : "";
    const [applyJob] = (0, application_1.useApplyJobMutation)();
    const { register, handleSubmit, formState: { errors }, watch, } = (0, react_hook_form_1.useForm)();
    const onSubmit = async (data) => {
        var _a, _b, _c, _d;
        const resumeFile = ((_a = data.resume) === null || _a === void 0 ? void 0 : _a[0]) || null;
        try {
            const formData = new FormData();
            formData.append("job", jobSlug);
            formData.append("name", data.name);
            formData.append("title", jobTitle);
            formData.append("location", data.location);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("experience", data.experience.toString());
            if (resumeFile) {
                formData.append("resume", resumeFile);
            }
            const res = (await applyJob(formData));
            if ((_b = res.data) === null || _b === void 0 ? void 0 : _b.success) {
                sonner_1.toast.success("Job application successfully");
                route.push("");
            }
            else {
                sonner_1.toast.error(((_d = (_c = res.error) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || "Something went wrong");
            }
            console.log(res);
        }
        catch (error) {
            console.error(error);
            sonner_1.toast.error("An unexpected error occurred");
        }
    };
    // Watch selected file for display
    const resumeFile = (_a = watch("resume")) === null || _a === void 0 ? void 0 : _a[0];
    return ((0, jsx_runtime_1.jsx)("div", { className: "pt-10 max-w-2xl mx-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-md p-6 md:p-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Job Application" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Full Name" }), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "text", id: "name", placeholder: "Enter your name" }, register("name", { required: "Name is required" }), { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" })), errors.name && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.name.message }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "email", id: "email", placeholder: "example@gmail.com" }, register("email", { required: "Email is required" }), { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" })), errors.email && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.email.message }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone Number" }), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "tel", id: "phone", placeholder: "000 0000 0000" }, register("phone", { required: "Phone is required" }), { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" })), errors.phone && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.phone.message }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "location", className: "block text-sm font-medium text-gray-700 mb-1", children: "Location" }), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "text", id: "location", placeholder: "City, Country" }, register("location", { required: "Location is required" }), { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" })), errors.location && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.location.message }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "experience", className: "block text-sm font-medium text-gray-700 mb-1", children: "Experience" }), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "number", id: "experience", placeholder: "2 years" }, register("experience", {
                                    required: "Experience is required",
                                }), { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" })), errors.experience && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.experience.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "resume", className: "block text-sm font-medium text-gray-700 mb-2", children: "Resume Upload" }), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "file", id: "resume", accept: ".pdf,.doc,.docx" }, register("resume", { required: true }), { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" })), resumeFile && ((0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-sm text-green-600", children: ["Selected: ", resumeFile.name] })), errors.resume && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: "Resume is required" }))] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200", children: "Submit Now" })] })] }) }));
}
