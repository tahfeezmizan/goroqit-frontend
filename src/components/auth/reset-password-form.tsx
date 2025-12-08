"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgetPasswordSendOTPMutation } from "@/redux/features/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginFormData = {
  email: string;
};

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [forgetPasswordSendOTP] = useForgetPasswordSendOTPMutation();

  const onSubmit = async (data: LoginFormData) => {
    // console.log("Login form data:", data);
    setIsLoading(true); // Start loading

    try {
      const res = await forgetPasswordSendOTP({ email: data.email });

      if (res?.data?.success) {
        route.push(
          `/otp-verify?email=${encodeURIComponent(
            data.email
          )}&authType=createAccount`
        );
        toast.success(res?.data?.data);
      } else if (res?.error) {
        // ✅ type narrowing for FetchBaseQueryError
        const err = res.error as FetchBaseQueryError;
        const errorMessage =
          (err.data as { message?: string })?.message || "Something went wrong";

        toast.error(errorMessage);
      }
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Login to your account.
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-lg">
            Enter your email to reset password
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="text"
              className="p-5 rounded-lg !text-xl text-black"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "email is required",
                minLength: {
                  value: 6,
                  message: "email must be at least 6 characters",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <p className="text-md">We will send an email to reset your password</p>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg"
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>
    </div>
  );
}
