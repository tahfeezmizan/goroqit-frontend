"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetProfileQuery = exports.baseApi = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const react_1 = require("@reduxjs/toolkit/query/react");
const baseURL = process.env.NEXT_PUBLIC_BASEURL;
exports.baseApi = (0, react_1.createApi)({
    reducerPath: "api",
    baseQuery: (0, react_1.fetchBaseQuery)({
        baseUrl: `${baseURL}/api/v1`,
        prepareHeaders: (headers, { getState }) => {
            const userData = getState().user.user;
            if (userData) {
                // Extract the accessToken from the user data
                const token = typeof userData === 'object' && userData.accessToken ?
                    userData.accessToken :
                    userData; // Fallback to the entire token if it's not an object
                headers.set("Authorization", `Bearer ${token}`);
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
        getProfile: builder.query({
            query: () => "/profile",
        }),
    }),
});
exports.useGetProfileQuery = exports.baseApi.useGetProfileQuery;
