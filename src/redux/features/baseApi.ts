/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "sonner";

import { removeUser } from "../slice/userSlice";
import { RootState } from "../store";

const baseURL = process.env.NEXT_PUBLIC_BASEURL as string;

export const getStoredToken = (getState?: () => unknown): string | null => {
  let token: string | null | undefined = null;

  if (getState) {
    const userData = (getState() as RootState).user?.user;
    if (userData) {
      token =
        typeof userData === "object" && userData?.accessToken
          ? userData.accessToken
          : userData;
    }
  }

  if (!token) {
    token =
      Cookies.get("token") ||
      (typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null);
  }

  if (
    token &&
    typeof token === "string" &&
    token !== "null" &&
    token !== "undefined"
  ) {
    return token.startsWith("Bearer ") ? token.slice(7) : token;
  }

  return null;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${baseURL}/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = getStoredToken(getState);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

let isHandlingSessionExpiry = false;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const hadToken = Boolean(getStoredToken(api.getState));

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;
    const errorData = result.error.data as { message?: string } | undefined;
    const errorMessage =
      typeof errorData?.message === "string"
        ? errorData.message.toLowerCase()
        : "";

    // A session is only expired if a token was sent and rejected (401/403),
    // or if the server explicitly states the token expired or is invalid.
    const isTokenExpired =
      (hadToken && (status === 401 || status === 403)) ||
      errorMessage.includes("jwt expired") ||
      errorMessage.includes("token expired") ||
      errorMessage.includes("jwt malformed") ||
      errorMessage.includes("invalid token");

    if (isTokenExpired && !isHandlingSessionExpiry) {
      isHandlingSessionExpiry = true;
      console.warn("⚠️ Token expired or invalid. Logging out automatically...");

      // 1️⃣ Clear Redux user state, cookies, and localStorage
      api.dispatch(removeUser());

      // 2️⃣ Notify user with fixed toast ID so toasts never stack
      if (typeof window !== "undefined") {
        toast.error("Session expired. Please log in again.", {
          id: "session-expired",
        });

        // 3️⃣ Redirect client to login if not already on login or home
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/"
        ) {
          const currentPath = window.location.pathname;
          window.location.href = `/login?redirect=${encodeURIComponent(
            currentPath
          )}`;
        }
      }

      setTimeout(() => {
        isHandlingSessionExpiry = false;
      }, 3000);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Product",
    "Jobs",
    "Chat",
    "Message",
    "Application",
    "Category",
    "Plan",
    "DashboardStatistics",
    "Talents",
    "RecruiterDashboardStatistics",
  ],
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => "/profile",
    }),
  }),
});

export const { useGetProfileQuery } = baseApi;
