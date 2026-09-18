"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";
import { useLazyGetRewardSsoUrlQuery } from "@/redux/features/userApi";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [getRewardSsoUrl] = useLazyGetRewardSsoUrlQuery();

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

      // Check if user came from clicking Roqit Rewards button
      const isRewardsIntent =
        typeof window !== "undefined" &&
        sessionStorage.getItem("redirectAfterAuth") === "rewards";

      if (isRewardsIntent) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("redirectAfterAuth");
        }
        getRewardSsoUrl(undefined, false)
          .unwrap()
          .then((ssoRes) => {
            const redirectSsoUrl =
              typeof ssoRes === "string"
                ? ssoRes
                : ssoRes?.data?.url ||
                  ssoRes?.data?.ssoUrl ||
                  ssoRes?.data?.sso_url ||
                  ssoRes?.data?.redirectUrl ||
                  ssoRes?.data?.link ||
                  (typeof ssoRes?.data === "string" ? ssoRes.data : null) ||
                  ssoRes?.url ||
                  ssoRes?.ssoUrl ||
                  ssoRes?.sso_url;

            if (redirectSsoUrl && typeof redirectSsoUrl === "string") {
              window.location.href = redirectSsoUrl;
            } else {
              router.push("/");
            }
          })
          .catch((err) => {
            console.error("Failed to redirect to rewards in OAuth callback:", err);
            router.push("/");
          });
        return;
      }

      // Redirect applicant to homepage
      router.push("/");
    }

    if (error) {
      console.error("❌ Google login error:", error);
    }
  }, [searchParams, dispatch, router, getRewardSsoUrl]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Processing login...</h1>
      <p>Please wait while we complete the login process.</p>
    </div>
  );
}
