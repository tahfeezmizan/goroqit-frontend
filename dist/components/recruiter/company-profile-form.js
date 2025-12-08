"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyProfileForm = CompanyProfileForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const lucide_react_1 = require("lucide-react");
const userApi_1 = require("@/redux/features/userApi");
function CompanyProfileForm() {
    const { register, handleSubmit, setValue, formState: {}, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            companyName: "",
            companyDescription: "",
            companyEmail: "",
            phone: "",
            companyWebsite: "",
            location: "",
            linkedinProfile: "",
            twitterProfile: "",
            facebookProfile: "",
            instagramProfile: "",
            companyLogo: null,
        },
    });
    const [updateProfile] = (0, userApi_1.useUpdateProfileMutation)();
    const handleFileChange = (e) => {
        var _a;
        const file = ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        console.log(file);
        setValue("companyLogo", file);
    };
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            // Append all fields to FormData
            formData.append("companyName", data.companyName);
            formData.append("companyDescription", data.companyDescription);
            formData.append("email", data.companyEmail);
            formData.append("phone", data.phone);
            formData.append("companyWebsite", data.companyWebsite);
            formData.append("location", data.location);
            formData.append("linkedinProfile", data.linkedinProfile);
            formData.append("twitterProfile", data.twitterProfile);
            formData.append("facebookProfile", data.facebookProfile);
            formData.append("instagramProfile", data.instagramProfile);
            console.log(data.companyLogo);
            if (data.companyLogo) {
                formData.append("companyLogo", data.companyLogo);
            }
            const res = await updateProfile({ body: formData });
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6 bg-white p-6 rounded-lg", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-between items-center", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Company Profile" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mt-1", children: "Manage your company information" })] }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-90", children: "Company Logo" }), (0, jsx_runtime_1.jsx)(card_1.Card, { className: "border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ImageIcon, { className: "mx-auto h-12 w-12 text-gray-400" }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4", children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "companyLogo", className: "cursor-pointer", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-blue-600 hover:text-blue-500", children: "Click to replace" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: " or drag and drop" })] }), (0, jsx_runtime_1.jsx)("input", { id: "companyLogo", type: "file", className: "hidden", accept: ".svg,.png,.jpg,.jpeg,.gif", onChange: handleFileChange })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 mt-2", children: "SVG, PNG, JPG or GIF (max. 400 x 400px)" })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "companyName", className: "text-lg font-medium text-gray-90", children: "Company Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "companyName", placeholder: "Hair Stylist" }, register("companyName"), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "companyDescription", className: "text-lg font-medium text-gray-90", children: "Company Descriptions" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, Object.assign({ id: "companyDescription", placeholder: "Company companyDescriptions" }, register("companyDescription"), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px]" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 pt-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold text-gray-90", children: "Contact Information" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "companyEmail", className: "text-lg font-medium text-gray-90", children: "Email Address" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "companyEmail", type: "companyEmail", placeholder: "example@gmail.com" }, register("companyEmail"), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "phone", className: "text-lg font-medium text-gray-90", children: "Phone Number" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "phone", placeholder: "0000 0000 0000" }, register("phone"), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "companyWebsite", className: "text-lg font-medium text-gray-90", children: "Website" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "companyWebsite", placeholder: "https://example.com" }, register("companyWebsite"), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "location", className: "text-lg font-medium text-gray-90", children: "Location" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "location", placeholder: "London" }, register("location"), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold text-gray-90", children: "Social Media" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "linkedinProfile", className: "text-lg font-medium text-gray-90", children: "Linkedin" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "linkedinProfile", placeholder: "https://example.com" }, register("linkedinProfile"), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "twitterProfile", className: "text-lg font-medium text-gray-90", children: "Twitter" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "twitterProfile", placeholder: "https://example.com" }, register("twitterProfile"), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "facebookProfile", className: "text-lg font-medium text-gray-90", children: "Facebook" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "facebookProfile", placeholder: "https://example.com" }, register("facebookProfile"), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "instagramProfile", className: "text-lg font-medium text-gray-90", children: "Instagram" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "instagramProfile", placeholder: "https://example.com" }, register("instagramProfile"), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" }))] })] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full mt-5 bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg", children: "Save Change" })] })] }));
}
