/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { RootState } from "../store";

const baseURL = process.env.NEXT_PUBLIC_BASEURL as string;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
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

      if (token && typeof token === "string" && token !== "null" && token !== "undefined") {
        const cleanToken = token.startsWith("Bearer ")
          ? token.slice(7)
          : token;
        headers.set("Authorization", `Bearer ${cleanToken}`);
      }

      return headers;
    },
  }),
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
