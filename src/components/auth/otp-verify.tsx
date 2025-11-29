// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   useResendOTPMutation,
//   useVerifyUserMutation,
// } from "@/redux/features/authApi";
// import { setUser } from "@/redux/slice/userSlice";
// import { ApiError } from "@/types/types";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "sonner";

// export default function OtpVerify() {
//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const [isLoading, setIsLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   const route = useRouter();
//   const dispatch = useDispatch();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");
//   const authType = searchParams.get("authType");

//   const [verifyUser] = useVerifyUserMutation();
//   const [resendOTP] = useResendOTPMutation();

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const handleChange = (index: number, value: string) => {
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     if (value.length > 1) {
//       value
//         .slice(0, 6 - index)
//         .split("")
//         .forEach((v, i) => (newOtp[index + i] = v));
//       setOtp(newOtp);
//       inputRefs.current[Math.min(index + value.length, 5)]?.focus();
//       return;
//     }

//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) inputRefs.current[index + 1]?.focus();
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleVerify = async () => {
//     setIsLoading(true);
//     await new Promise((r) => setTimeout(r, 2000));
//     const otpValue = otp.join("");
//     setIsLoading(false);

//     try {
//       const res = await verifyUser({
//         email,
//         oneTimeCode: otpValue,
//       });

//       const responseData = res?.data;

//       if (responseData?.data?.token) {
//         const token = responseData.data.token;
//         // ✅ Forgot password flow
//         toast.success(
//           responseData?.message || "OTP verified, please reset your password"
//         );
//         route.push(`/set-new-password?token=${token}`);
//       } else if (responseData?.data?.accessToken) {
//         // ✅ Normal login flow
//         dispatch(
//           setUser({
//             data: {
//               accessToken: responseData?.data?.accessToken,
//               role: responseData?.data?.role,
//             },
//           })
//         );

//         toast.success("OTP verification successful");
//         route.push("/");
//       } else {
//         const err = res as ApiError;
//         toast.error(err?.data?.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("OTP Verify Error:", error);
//       toast.error("Unexpected error occurred");
//     }
//   };

//   const handleResend = async () => {
//     setOtp(Array(6).fill(""));
//     setCountdown(60);
//     inputRefs.current[0]?.focus();
//     // console.log("Resending OTP...");

//     try {
//       const res = await resendOTP({
//         email: email,
//         authType: authType,
//       });
//       if (res?.data?.success === true) {
//         // console.log(res);
//         toast.success("OTP resent successfully");
//       }
//     } catch {}
//   };

//   const isComplete = otp.every(Boolean);

//   return (
//     <div className="w-full text-center">
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">
//         Please check your email
//       </h1>
//       <p className="text-gray-600 mb-6">
//         A 6-digit code has been sent to your email
//       </p>

//       <div className="flex justify-center gap-3 mb-6">
//         {otp.map((digit, i) => (
//           <Input
//             key={i}
//             ref={(el) => {
//               inputRefs.current[i] = el;
//             }}
//             type="text"
//             inputMode="numeric"
//             maxLength={1}
//             value={digit}
//             onChange={(e) => handleChange(i, e.target.value)}
//             onKeyDown={(e) => handleKeyDown(i, e)}
//             className="w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:border-green-500 focus:ring-green-500"
//           />
//         ))}
//       </div>

//       <Button
//         onClick={handleVerify}
//         disabled={!isComplete || isLoading}
//         className="w-full bg-green-900 hover:bg-green-700 text-white py-4 px-8 rounded-lg font-medium mb-4"
//       >
//         {isLoading ? "Verifying..." : "Verify OTP"}
//       </Button>

//       {countdown > 0 ? (
//         <p className="text-gray-500">Resend in {countdown}s</p>
//       ) : (
//         <>
//           <p className="text-gray-600 mb-2">Don’t receive any code</p>
//           <Button
//             onClick={handleResend}
//             className="bg-transparent text-green-900 hover:bg-transparent hover:border font-medium"
//           >
//             Resend Code
//           </Button>
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useResendOTPMutation,
  useVerifyUserMutation,
} from "@/redux/features/authApi";
import { setUser } from "@/redux/slice/userSlice";
import { ApiError } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function OtpVerify() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const route = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const authType = searchParams.get("authType");

  const [verifyUser] = useVerifyUserMutation();
  const [resendOTP] = useResendOTPMutation();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];

    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });

    setOtp(newOtp);

    // Focus on the next empty field or last field
    const nextEmptyIndex = newOtp.findIndex((val) => val === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    if (value.length > 1) {
      value
        .slice(0, 6 - index)
        .split("")
        .forEach((v, i) => (newOtp[index + i] = v));
      setOtp(newOtp);
      inputRefs.current[Math.min(index + value.length, 5)]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    const otpValue = otp.join("");
    setIsLoading(false);

    try {
      const res = await verifyUser({
        email,
        oneTimeCode: otpValue,
      });

      const responseData = res?.data;

      if (responseData?.data?.token) {
        const token = responseData.data.token;
        // ✅ Forgot password flow
        toast.success(
          responseData?.message || "OTP verified, please reset your password"
        );
        route.push(`/set-new-password?token=${token}`);
      } else if (responseData?.data?.accessToken) {
        // ✅ Normal login flow
        dispatch(
          setUser({
            data: {
              accessToken: responseData?.data?.accessToken,
              role: responseData?.data?.role,
            },
          })
        );

        toast.success("OTP verification successful");
        route.push("/");
      } else {
        const err = res as ApiError;
        toast.error(err?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("OTP Verify Error:", error);
      toast.error("Unexpected error occurred");
    }
  };

  const handleResend = async () => {
    setOtp(Array(6).fill(""));
    setCountdown(60);
    inputRefs.current[0]?.focus();
    // console.log("Resending OTP...");

    try {
      const res = await resendOTP({
        email: email,
        authType: authType,
      });
      if (res?.data?.success === true) {
        // console.log(res);
        toast.success("OTP resent successfully");
      }
    } catch {}
  };

  const isComplete = otp.every(Boolean);

  return (
    <div className="w-full text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Please check your email
      </h1>
      <p className="text-gray-600 mb-6">
        A 6-digit code has been sent to your email
      </p>

      <div className="flex justify-center gap-3 mb-6">
        {otp.map((digit, i) => (
          <Input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:border-green-500 focus:ring-green-500"
          />
        ))}
      </div>

      <Button
        onClick={handleVerify}
        disabled={!isComplete || isLoading}
        className="w-full bg-green-900 hover:bg-green-700 text-white py-4 px-8 rounded-lg font-medium mb-4"
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>

      {countdown > 0 ? (
        <p className="text-gray-500">Resend in {countdown}s</p>
      ) : (
        <>
          <p className="text-gray-600 mb-2">Don&apos;t receive any code</p>
          <Button
            onClick={handleResend}
            className="bg-transparent text-green-900 hover:bg-transparent hover:border font-medium"
          >
            Resend Code
          </Button>
        </>
      )}
    </div>
  );
}
