"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResetPasswordForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const authApi_1 = require("@/redux/features/authApi");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const sonner_1 = require("sonner");
function ResetPasswordForm() {
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)();
    const route = (0, navigation_1.useRouter)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [forgetPasswordSendOTP] = (0, authApi_1.useForgetPasswordSendOTPMutation)();
    const onSubmit = async (data) => {
        var _a, _b, _c;
        console.log("Login form data:", data);
        setIsLoading(true); // Start loading
        try {
            const res = await forgetPasswordSendOTP({ email: data.email });
            if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.success) {
                route.push(`/otp-verify?email=${encodeURIComponent(data.email)}&authType=createAccount`);
                sonner_1.toast.success((_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data);
            }
            else if (res === null || res === void 0 ? void 0 : res.error) {
                // ✅ type narrowing for FetchBaseQueryError
                const err = res.error;
                const errorMessage = ((_c = err.data) === null || _c === void 0 ? void 0 : _c.message) || "Something went wrong";
                sonner_1.toast.error(errorMessage);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-semibold text-foreground", children: "Login to your account." }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", className: "text-lg", children: "Enter your email to reset password" }), (0, jsx_runtime_1.jsx)("div", { className: "relative", children: (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "email", type: "text", className: "p-5 rounded-lg !text-xl text-black", placeholder: "example@gmail.com" }, register("email", {
                                    required: "email is required",
                                    minLength: {
                                        value: 6,
                                        message: "email must be at least 6 characters",
                                    },
                                }))) }), errors.email && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.email.message }))] }), (0, jsx_runtime_1.jsx)("p", { className: "text-md", children: "We will send an email to reset your password" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg", children: isLoading ? "Sending OTP..." : "Send OTP" })] })] }));
}
