"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetFilterdJobsQuery = exports.useGetAllJobswithStaticsQuery = exports.useDeleteJobMutation = exports.useUpdateJobMutation = exports.useGetSingleJobQuery = exports.useGetAllJobsQuery = exports.useCreateJobMutation = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const baseApi_1 = require("./baseApi");
const jobsApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => ({
                url: "/job",
                method: "GET",
            }),
            providesTags: ["Jobs"],
            transformResponse: (response) => {
                var _a;
                return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data;
            },
        }),
        // Get single job
        getSingleJob: builder.query({
            query: ({ id }) => ({
                url: `/job/${id}`,
                method: "GET",
            }),
            providesTags: ["Jobs"],
            transformResponse: (response) => {
                return response === null || response === void 0 ? void 0 : response.data;
            },
        }),
        createJob: builder.mutation({
            query: (data) => ({
                url: "/job",
                method: "POST",
                body: data,
            }),
        }),
        updateJob: builder.mutation({
            query: ({ id, data }) => ({
                url: `/job/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
        deleteJob: builder.mutation({
            query: (id) => {
                console.log("Deleting job with ID:", id);
                return {
                    url: `/job/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["Jobs"],
        }),
        getAllJobswithStatics: builder.query({
            query: () => ({
                url: "/job",
                method: "GET",
            }),
            providesTags: ["Jobs"],
            transformResponse: (response) => {
                return response === null || response === void 0 ? void 0 : response.data;
            },
        }),
        getFilterdJobs: builder.query({
            query: (filters) => {
                const params = new URLSearchParams();
                if (filters === null || filters === void 0 ? void 0 : filters.searchTerm)
                    params.append("searchTerm", filters.searchTerm);
                if (filters === null || filters === void 0 ? void 0 : filters.jobLocation)
                    params.append("jobLocation", filters.jobLocation);
                if (filters === null || filters === void 0 ? void 0 : filters.category)
                    params.append("category", filters.category);
                if (filters === null || filters === void 0 ? void 0 : filters.type)
                    params.append("type", filters.type);
                if ((filters === null || filters === void 0 ? void 0 : filters.minSalary) !== undefined)
                    params.append("minSalary", filters.minSalary.toString());
                if ((filters === null || filters === void 0 ? void 0 : filters.maxSalary) !== undefined)
                    params.append("maxSalary", filters.maxSalary.toString());
                if (filters === null || filters === void 0 ? void 0 : filters.page)
                    params.append("page", filters.page.toString());
                if (filters === null || filters === void 0 ? void 0 : filters.limit)
                    params.append("limit", filters.limit.toString());
                return {
                    url: `/job${params.toString() ? `?${params.toString()}` : ""}`,
                    method: "GET",
                };
            },
            providesTags: ["Jobs"],
            transformResponse: (response) => {
                // Return the entire response including meta data
                return response === null || response === void 0 ? void 0 : response.data;
            },
        }),
    }),
});
exports.useCreateJobMutation = jobsApi.useCreateJobMutation, exports.useGetAllJobsQuery = jobsApi.useGetAllJobsQuery, exports.useGetSingleJobQuery = jobsApi.useGetSingleJobQuery, exports.useUpdateJobMutation = jobsApi.useUpdateJobMutation, exports.useDeleteJobMutation = jobsApi.useDeleteJobMutation, exports.useGetAllJobswithStaticsQuery = jobsApi.useGetAllJobswithStaticsQuery, exports.useGetFilterdJobsQuery = jobsApi.useGetFilterdJobsQuery;
