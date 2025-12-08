"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OtpVerify;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const authApi_1 = require("@/redux/features/authApi");
const navigation_1 = require("next/navigation");
const sonner_1 = require("sonner");
const react_redux_1 = require("react-redux");
const userSlice_1 = require("@/redux/slice/userSlice");
function OtpVerify() {
    const [otp, setOtp] = (0, react_1.useState)(Array(6).fill(""));
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [countdown, setCountdown] = (0, react_1.useState)(60);
    const inputRefs = (0, react_1.useRef)([]);
    const route = (0, navigation_1.useRouter)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const email = searchParams.get("email");
    const authType = searchParams.get("authType");
    // console.log(email, authType);
    const [verifyUser] = (0, authApi_1.useVerifyUserMutation)();
    const [resendOTP] = (0, authApi_1.useResendOTPMutation)();
    (0, react_1.useEffect)(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);
    const handleChange = (index, value) => {
        var _a, _b;
        if (!/^\d*$/.test(value))
            return;
        const newOtp = [...otp];
        if (value.length > 1) {
            value
                .slice(0, 6 - index)
                .split("")
                .forEach((v, i) => (newOtp[index + i] = v));
            setOtp(newOtp);
            (_a = inputRefs.current[Math.min(index + value.length, 5)]) === null || _a === void 0 ? void 0 : _a.focus();
            return;
        }
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5)
            (_b = inputRefs.current[index + 1]) === null || _b === void 0 ? void 0 : _b.focus();
    };
    const handleKeyDown = (index, e) => {
        var _a;
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            (_a = inputRefs.current[index - 1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    const handleVerify = async () => {
        var _a, _b, _c, _d, _e;
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 2000));
        const otpValue = otp.join("");
        setIsLoading(false);
        try {
            const res = await verifyUser({
                email: email,
                oneTimeCode: otpValue,
            });
            console.log("OTP Verify", (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.message);
            if ((_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.success) {
                dispatch((0, userSlice_1.setUser)({ data: (_d = (_c = res.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.accessToken }));
                sonner_1.toast.success("OTP verification successful");
                route.push("/");
            }
            else {
                const err = res.error;
                sonner_1.toast.error(((_e = err === null || err === void 0 ? void 0 : err.data) === null || _e === void 0 ? void 0 : _e.message) || "Something went wrong");
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const handleResend = async () => {
        var _a, _b;
        setOtp(Array(6).fill(""));
        setCountdown(60);
        (_a = inputRefs.current[0]) === null || _a === void 0 ? void 0 : _a.focus();
        console.log("Resending OTP...");
        try {
            const res = await resendOTP({
                email: email,
                authType: authType,
            });
            if (((_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.success) === true) {
                route.push("/");
            }
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    };
    const isComplete = otp.every(Boolean);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full text-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Please check your email" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-6", children: "A 6-digit code has been sent to your email" }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center gap-3 mb-6", children: otp.map((digit, i) => ((0, jsx_runtime_1.jsx)(input_1.Input, { ref: (el) => {
                        inputRefs.current[i] = el;
                    }, type: "text", inputMode: "numeric", maxLength: 1, value: digit, onChange: (e) => handleChange(i, e.target.value), onKeyDown: (e) => handleKeyDown(i, e), className: "w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:border-green-500 focus:ring-green-500" }, i))) }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleVerify, disabled: !isComplete || isLoading, className: "w-full bg-green-900 hover:bg-green-700 text-white py-4 px-8 rounded-lg font-medium mb-4", children: isLoading ? "Verifying..." : "Verify OTP" }), countdown > 0 ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-gray-500", children: ["Resend in ", countdown, "s"] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-2", children: "Don\u2019t receive any code" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleResend, className: "bg-transparent text-green-900 hover:bg-transparent hover:border font-medium", children: "Resend Code" })] }))] }));
}
