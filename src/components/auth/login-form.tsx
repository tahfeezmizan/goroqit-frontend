"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/redux/features/authApi";
import { setUser } from "@/redux/slice/userSlice";
import { ApiError } from "@/types/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import GoogleLogin from "../shared/social-login/google-login";

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [showPassword, setShowPassword] = useState(false);

  // Get the redirect URL from query parameters
  const redirectUrl = searchParams.get("redirect") || "/profile";

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (res?.data?.success) {
        dispatch(
          setUser({
            data: {
              accessToken: res.data?.data?.accessToken,
              role: res.data?.data?.role,
            },
          })
        );

        const role = res?.data?.data?.role;

        // Redirect to the saved URL or role-based default
        let targetPath = redirectUrl;

        // If no specific redirect was saved, use role-based routing
        if (redirectUrl === "/profile") {
          switch (role) {
            case "admin":
              targetPath = "/admin";
              break;
            case "recruiter":
              targetPath = "/recruiter/company";
              break;
            case "applicant":
              targetPath = "/profile";
              break;
            default:
              targetPath = "/";
          }
        }

        router.push(targetPath);
        toast.success("Login Successful");
      } else if (res?.error) {
        // ✅ type narrowing for FetchBaseQueryError
        const err = res.error as FetchBaseQueryError;
        const errorMessage =
          (err.data as { message?: string })?.message || "Something went wrong";

        toast.error(errorMessage);
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      // ✅ show toast from caught error
      toast.error(apiError?.data?.message || "Login failed");
      // console.log("Errors:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Login to your account.
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* email */}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-lg">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            className="p-5 rounded-lg !text-xl text-black"
            placeholder="Enter your email"
            {...register("email", { required: "email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <Label htmlFor="password" className="text-lg">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="p-5 rounded-lg !text-xl text-black"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" {...register("rememberMe")} />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
          <Link
            href={"/forgot-password"}
            className="px-0 text-blue-600 hover:text-blue-800"
          >
            Forgot password ?
          </Link>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-xl font-medium rounded-lg"
        >
          {isLoading ? <Loader className="animate-spin size-8" /> : "Login"}
        </Button>
      </form>

      {/* Signup + Social Login */}
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Don&apos;t have an account?{" "}
          </p>
          <Link href={"/sign-up"}>
            <Button className="bg-transparent text-black hover:bg-transparent border shadow-none outline-none rounded-lg">
              Sign up
            </Button>
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">OR</span>
          </div>
        </div>

        <GoogleLogin />
      </div>
    </div>
  );
}
