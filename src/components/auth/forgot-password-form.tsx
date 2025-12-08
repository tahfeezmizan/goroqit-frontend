"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSetNewPasswordMutation } from "@/redux/features/authApi";
import { ApiError } from "@/types/types";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginFormData = {
  newPassword: string;
  confirmPassword: string;
};

export default function SetNewPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>();

  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const newPassword = watch("newPassword");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [setNewPassword] = useSetNewPasswordMutation();

  const onSubmit = async (data: LoginFormData) => {
    try {
      // ✅ Pass token and body correctly
      const res = await setNewPassword({
        token,
        body: {
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message || "Password reset successfully");
        route.push("/login");
      } else {
        const err = res.error as ApiError;
        toast.error(err?.data?.message || "Something went wrong");
      }
    } catch {
      // console.log("Catch Error", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Set New Password
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-lg">
            Enter new password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              className="p-5 rounded-lg !text-xl text-black"
              placeholder="••••••••"
              {...register("newPassword", {
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-lg">
            Confirm password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              className="p-5 rounded-lg !text-xl text-black"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match", // 👈 match validation
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-lg"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}
