"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetStatisticsQuery = exports.dashboardApi = void 0;
const baseApi_1 = require("./baseApi");
exports.dashboardApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStatistics: builder.query({
            query: ({ year } = {}) => ({
                url: "/dashboard/statistics",
                method: "GET",
                params: Object.assign({}, (year && { year })),
            }),
            providesTags: ["DashboardStatistics"],
        }),
    }),
    overrideExisting: false,
});
exports.useGetStatisticsQuery = exports.dashboardApi.useGetStatisticsQuery;
