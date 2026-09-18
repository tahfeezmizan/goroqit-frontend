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

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${baseURL}/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const userData = (getState() as RootState).user?.user;

    let token: string | null | undefined = null;

    if (userData) {
      token =
        typeof userData === "object" && userData?.accessToken
          ? userData.accessToken
          : userData;
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
      const cleanToken = token.startsWith("Bearer ")
        ? token.slice(7)
        : token;
      headers.set("Authorization", `Bearer ${cleanToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;
    const errorData = result.error.data as { message?: string } | undefined;

    // Check if response indicates expired/invalid token (401 status or token error message)
    const isTokenExpired =
      status === 401 ||
      (typeof errorData?.message === "string" &&
        (errorData.message.toLowerCase().includes("jwt expired") ||
          errorData.message.toLowerCase().includes("token expired") ||
          errorData.message.toLowerCase().includes("invalid token") ||
          errorData.message.toLowerCase().includes("unauthorized")));

    if (isTokenExpired) {
      console.warn("⚠️ Token expired or invalid. Logging out automatically...");
      
      // 1️⃣ Clear Redux user state, cookies, and localStorage
      api.dispatch(removeUser());
      
      // 2️⃣ Reset RTK Query cache
      api.dispatch(baseApi.util.resetApiState());

      // 3️⃣ Toast alert & redirect client to login
      if (typeof window !== "undefined") {
        toast.error("Session expired. Please log in again.");
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/"
        ) {
          window.location.href = "/login";
        }
      }
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
