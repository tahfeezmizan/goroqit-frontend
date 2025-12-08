"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetAppliedJobsQuery = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const baseApi_1 = require("./baseApi");
const applicationApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //get applied jobs
        getAppliedJobs: builder.query({
            query: () => ({
                url: "/application",
                method: "GET",
            }),
            transformResponse: (response) => {
                var _a;
                return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data;
            },
        }),
        applyJob: builder.mutation({
            query: (data) => ({
                url: `/application`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Application"],
        }),
        getApplication: builder.query({
            query: () => ({
                url: "/application",
                method: "GET",
            }),
            providesTags: ["Application"],
            //   transformResponse: (response: any) => {
            //     return response?.data?.data;
            //   },
        }),
    }),
});
exports.useGetAppliedJobsQuery = applicationApi.useGetAppliedJobsQuery;
