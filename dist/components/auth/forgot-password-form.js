"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForgotPasswordForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
function ForgotPasswordForm() {
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)();
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const onSubmit = (data) => {
        console.log("Login form data:", data);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-semibold text-foreground", children: "Set New Password" }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", className: "text-lg", children: "Enter new password" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "password", type: showPassword ? "text" : "password", className: "p-5 rounded-lg !text-xl text-black", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }, register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    }))), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent", onClick: () => setShowPassword(!showPassword), children: showPassword ? ((0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "h-4 w-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" })) })] }), errors.password && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.password.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", className: "text-lg", children: "Confirm password" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "password", type: showPassword ? "text" : "password", className: "p-5 rounded-lg !text-xl text-black", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }, register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    }))), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent", onClick: () => setShowPassword(!showPassword), children: showPassword ? ((0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "h-4 w-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" })) })] }), errors.password && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.password.message }))] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-lg", children: "Reset Password" })] })] }));
}
