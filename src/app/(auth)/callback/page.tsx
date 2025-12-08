"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("accessToken");
    const error = searchParams.get("error");
    // console.log("✅ Google login success. Token:", token);

    if (token) {
      // Save token & fixed role 'applicant' to localStorage

      // Dispatch Redux action with token and fixed role
      dispatch(
        setUser({
          data: {
            accessToken: token,
            role: "applicant",
          },
        })
      );

      // Redirect applicant to homepage
      router.push("/");
    }

    if (error) {
      console.error("❌ Google login error:", error);
    }
  }, [searchParams, dispatch, router]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Processing login...</h1>
      <p>Please wait while we complete the login process.</p>
    </div>
  );
}
