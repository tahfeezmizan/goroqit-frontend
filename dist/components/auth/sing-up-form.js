"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupForm = SignupForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const checkbox_1 = require("@/components/ui/checkbox");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const authApi_1 = require("@/redux/features/authApi");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const sonner_1 = require("sonner");
function SignupForm() {
    const route = (0, navigation_1.useRouter)();
    const [role, setRole] = (0, react_1.useState)("applicant");
    const [createUser, { isLoading }] = (0, authApi_1.useCreateUserMutation)();
    const { register, handleSubmit, watch, formState: { errors }, } = (0, react_hook_form_1.useForm)();
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [showConfirmPassword, setShowConfirmPassword] = (0, react_1.useState)(false);
    const onSubmit = async (data) => {
        var _a, _b, _c, _d, _e;
        try {
            const res = await createUser({
                name: data.name,
                email: data.email,
                password: data.password,
                role: role,
                companyName: data.companyName,
            });
            if (((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.success) === true) {
                route.push(`/otp-verify?email=${encodeURIComponent(data.email)}&authType=createAccount`);
                sonner_1.toast.success("User created successfully");
            }
            else if (res === null || res === void 0 ? void 0 : res.error) {
                // ✅ Type narrowing
                const err = res.error;
                let errorMessage = "An error occurred";
                if ("data" in err) {
                    errorMessage =
                        (_c = (_b = err.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : errorMessage;
                }
                else if ("message" in err) {
                    errorMessage = (_d = err.message) !== null && _d !== void 0 ? _d : errorMessage;
                }
                sonner_1.toast.error(errorMessage);
            }
        }
        catch (error) {
            const apiError = error;
            sonner_1.toast.error(((_e = apiError === null || apiError === void 0 ? void 0 : apiError.data) === null || _e === void 0 ? void 0 : _e.message) || "Something went wrong");
            console.log("error", apiError);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "space-y-1 text-center", children: (0, jsx_runtime_1.jsx)("h1", { className: "!text-3xl font-semibold tracking-tight", children: "Sign up" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mb-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex  !rounded-lg overflow-hidden", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: () => setRole("applicant"), className: `px-6 py-2 font-medium transition-colors !rounded-none hover:bg-green-500 hover:text-white ${role === "applicant"
                                ? "bg-green-200 text-green-900"
                                : "bg-white text-gray-700"}`, children: "Job Seeker" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: () => setRole("recruiter"), className: `px-6 py-2 font-medium transition-colors !rounded-none hover:bg-green-500 hover:text-white ${role === "recruiter"
                                ? "bg-green-200 text-green-900"
                                : "bg-white text-gray-700"}`, children: "Company" })] }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "fullName", className: "text-lg", children: "Full Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "fullName", type: "text", placeholder: "John", className: "p-5 rounded-lg !text-lg text-black" }, register("name", { required: "First name is required" }))), errors.name && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.name.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", className: "text-lg", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "email", type: "email", placeholder: "example@gmail.com", className: "p-5 rounded-lg !text-lg text-black" }, register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format",
                                },
                            }))), errors.email && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.email.message }))] }), role === "recruiter" && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "companyName", className: "text-lg", children: "Company Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "companyName", type: "text", placeholder: "Enter your company name", className: "p-5 rounded-lg !text-lg text-black" }, register("companyName", {
                                required: "Company name is required",
                            }))), errors.companyName && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.companyName.message }))] })), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1 relative", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", className: "text-lg", children: "Password" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "password", type: showPassword ? "text" : "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "p-5 rounded-lg !text-lg text-black" }, register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            }))), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-9 bg-transparent hover:bg-transparent text-gray-600", children: showPassword ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { size: 20 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { size: 20 }) }), errors.password && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.password.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1 relative", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "confirmPassword", className: "text-lg", children: "Confirm password" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "confirmPassword", type: showConfirmPassword ? "text" : "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "p-5 rounded-lg !text-lg text-black" }, register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) => value === watch("password") || "Passwords do not match",
                            }))), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "absolute right-3 top-9 bg-transparent hover:bg-transparent text-gray-600", children: showConfirmPassword ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { size: 20 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { size: 20 }) }), errors.confirmPassword && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.confirmPassword.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, Object.assign({ id: "terms" }, register("agreeToTerms", {
                                required: "You must agree to the terms",
                            }))), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "terms", className: "text-sm font-normal", children: "I have read and agree to roqit's Terms and conditions" })] }), errors.agreeToTerms && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.agreeToTerms.message })), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: !watch("agreeToTerms"), className: "w-full mt-4 bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-xl font-medium rounded-lg", children: isLoading ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader, { className: "animate-spin size-8" }) : "Sign up" })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-center", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-base text-muted-foreground", children: ["Already have an account?", " ", (0, jsx_runtime_1.jsx)(link_1.default, { href: "/login", className: "text-green-900 hover:underline", children: "Sign in" })] }) })] }));
}
