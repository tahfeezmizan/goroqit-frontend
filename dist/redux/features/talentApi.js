"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetSingleTalentQuery = exports.useGetFilteredTalentsQuery = void 0;
// In talentApi.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
const baseApi_1 = require("./baseApi");
const talentApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFilteredTalents: builder.query({
            query: (filters) => {
                const params = new URLSearchParams();
                if (filters === null || filters === void 0 ? void 0 : filters.searchTerm)
                    params.append("searchTerm", filters.searchTerm);
                if (filters === null || filters === void 0 ? void 0 : filters.location)
                    params.append("location", filters.location);
                if (filters === null || filters === void 0 ? void 0 : filters.gender)
                    params.append("gender", filters.gender);
                if (filters === null || filters === void 0 ? void 0 : filters.skills)
                    params.append("skills", filters.skills);
                if (filters === null || filters === void 0 ? void 0 : filters.page)
                    params.append("page", filters.page.toString());
                if (filters === null || filters === void 0 ? void 0 : filters.limit)
                    params.append("limit", filters.limit.toString());
                return {
                    url: `/user/applicants${params.toString() ? `?${params.toString()}` : ""}`,
                    method: "GET",
                };
            },
            providesTags: ["Talents"],
            transformResponse: (response) => {
                return response === null || response === void 0 ? void 0 : response.data;
            },
        }),
        // Get all talents/applicants
        getSingleTalent: builder.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: "GET",
            }),
            providesTags: ["Auth"],
            transformResponse: (response) => {
                return response === null || response === void 0 ? void 0 : response.data;
            },
        }),
    }),
});
exports.useGetFilteredTalentsQuery = talentApi.useGetFilteredTalentsQuery, exports.useGetSingleTalentQuery = talentApi.useGetSingleTalentQuery;
