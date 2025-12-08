"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetApplicationQuery = exports.useApplyJobMutation = void 0;
const baseApi_1 = require("./baseApi");
const applicationApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
            transformResponse: (response) => {
                var _a;
                return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data;
            },
        }),
    }),
});
exports.useApplyJobMutation = applicationApi.useApplyJobMutation, exports.useGetApplicationQuery = applicationApi.useGetApplicationQuery;
