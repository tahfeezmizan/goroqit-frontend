"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = LoginForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const checkbox_1 = require("@/components/ui/checkbox");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const authApi_1 = require("@/redux/features/authApi");
const userSlice_1 = require("@/redux/slice/userSlice");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const react_redux_1 = require("react-redux");
const sonner_1 = require("sonner");
function LoginForm() {
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)();
    const route = (0, navigation_1.useRouter)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const [loginUser, { isLoading }] = (0, authApi_1.useLoginUserMutation)();
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const onSubmit = async (data) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        try {
            const res = await loginUser({
                email: data.email,
                password: data.password,
            });
            if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.success) {
                // Include the role in the token data for middleware to access
                dispatch((0, userSlice_1.setUser)({
                    data: {
                        accessToken: (_c = (_b = res.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.accessToken,
                        role: (_e = (_d = res.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.role
                    }
                }));
                const role = (_g = (_f = res === null || res === void 0 ? void 0 : res.data) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.role;
                switch (role) {
                    case "admin":
                        route.push("/admin");
                        break;
                    case "recruiter":
                        route.push("/recruiter");
                        break;
                    case "applicant":
                        route.push("/");
                        break;
                    default:
                        route.push("/");
                }
                sonner_1.toast.success("Login Successful");
            }
            else if (res === null || res === void 0 ? void 0 : res.error) {
                // ✅ type narrowing for FetchBaseQueryError
                const err = res.error;
                const errorMessage = ((_h = err.data) === null || _h === void 0 ? void 0 : _h.message) || "Something went wrong";
                sonner_1.toast.error(errorMessage);
            }
        }
        catch (error) {
            const apiError = error;
            // ✅ show toast from caught error
            sonner_1.toast.error(((_j = apiError === null || apiError === void 0 ? void 0 : apiError.data) === null || _j === void 0 ? void 0 : _j.message) || "Login failed");
            console.log("Errors:", error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "space-y-1", children: (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-semibold text-foreground", children: "Login to your account." }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", className: "text-lg", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "email", type: "email", className: "p-5 rounded-lg !text-xl text-black", placeholder: "Enter your email" }, register("email", { required: "email is required" }))), errors.email && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.email.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", className: "text-lg", children: "Password" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "password", type: showPassword ? "text" : "password", className: "p-5 rounded-lg !text-xl text-black", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }, register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    }))), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent", onClick: () => setShowPassword(!showPassword), children: showPassword ? ((0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "h-4 w-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" })) })] }), errors.password && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.password.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, Object.assign({ id: "remember" }, register("rememberMe"))), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "remember", className: "text-sm", children: "Remember me" })] }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/reset-password", className: "px-0 text-blue-600 hover:text-blue-800", children: "Forgot password ?" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-xl font-medium rounded-lg", children: isLoading ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader, { className: "animate-spin size-8" }) : "Login" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted-foreground mb-2", children: ["Don't have an account?", " "] }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/sing-up", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "bg-transparent text-black hover:bg-transparent border shadow-none outline-none rounded-lg", children: "sing up" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center", children: (0, jsx_runtime_1.jsx)("span", { className: "w-full border-t" }) }), (0, jsx_runtime_1.jsx)("div", { className: "relative flex justify-center text-xs uppercase", children: (0, jsx_runtime_1.jsx)("span", { className: "bg-background px-2 text-muted-foreground", children: "OR" }) })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "w-full bg-transparent text-base", type: "button", children: [(0, jsx_runtime_1.jsxs)("svg", { className: "w-4 h-4 mr-2", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })] }), "Continue with Google"] })] })] }));
}
