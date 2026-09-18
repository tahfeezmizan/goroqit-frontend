"use client";

import { useLazyGetRewardSsoUrlQuery } from "@/redux/features/userApi";
import Cookies from "js-cookie";
import { Gift, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RoqitRewardsButtonProps {
  className?: string;
}

export function RoqitRewardsButton({ className = "" }: RoqitRewardsButtonProps) {
  const router = useRouter();
  const [triggerGetSsoUrl, { isLoading }] = useLazyGetRewardSsoUrlQuery();

  const handleRewardsClick = async () => {
    const token =
      Cookies.get("token") ||
      (typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null);

    // 1️⃣ If user is logged out (guest), track intent & redirect to login page
    if (!token) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirectAfterAuth", "rewards");
      }
      router.push("/login?redirect=rewards");
      return;
    }

    // 2️⃣ If user is logged in, hit rewards SSO API & redirect to returned URL
    try {
      const res = await triggerGetSsoUrl(undefined, false).unwrap();
      console.log("Rewards SSO API Response:", res);

      const redirectUrl =
        typeof res === "string"
          ? res
          : res?.data?.url ||
            res?.data?.ssoUrl ||
            res?.data?.sso_url ||
            res?.data?.redirectUrl ||
            res?.data?.link ||
            (typeof res?.data === "string" ? res.data : null) ||
            res?.url ||
            res?.ssoUrl ||
            res?.sso_url ||
            res?.redirectUrl ||
            res?.link;

      if (redirectUrl && typeof redirectUrl === "string") {
        window.location.href = redirectUrl;
      } else {
        console.error("No valid URL found in API response:", res);
        toast.error("Failed to retrieve rewards link. Please try again.");
      }
    } catch (error: any) {
      console.error("Error fetching rewards SSO URL:", error);
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        error?.message ||
        "Failed to connect to Roqit Rewards.";
      toast.error(errorMessage);
    }
  };

  return (
    <button
      onClick={handleRewardsClick}
      disabled={isLoading}
      type="button"
      className={`flex items-center gap-2 bg-[#1b4e2d] hover:bg-[#153f24] text-white px-3.5 sm:px-4 py-2 rounded-full border border-white/20 transition-all duration-200 cursor-pointer text-xs sm:text-sm md:text-base font-medium disabled:opacity-70 disabled:cursor-not-allowed shadow-sm h-9 md:h-10 ${className}`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin text-white shrink-0" />
      ) : (
        <Gift className="h-4 w-4 md:h-5 md:w-5 text-white shrink-0" />
      )}
      <span className="whitespace-nowrap">Roqit Rewards</span>
    </button>
  );
}
