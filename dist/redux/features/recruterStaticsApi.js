"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetRecruiterStatisticsQuery = exports.recruiterDashboardApi = void 0;
const baseApi_1 = require("./baseApi");
exports.recruiterDashboardApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecruiterStatistics: builder.query({
            query: () => ({
                url: "/dashboard/recruter-statistics",
                method: "GET",
            }),
            providesTags: ["RecruiterDashboardStatistics"],
        }),
    }),
    overrideExisting: false,
});
exports.useGetRecruiterStatisticsQuery = exports.recruiterDashboardApi.useGetRecruiterStatisticsQuery;
