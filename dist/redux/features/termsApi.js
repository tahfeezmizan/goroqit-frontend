"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateTermsMutation = exports.useGetTermsQuery = exports.termsApi = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const baseApi_1 = require("./baseApi");
exports.termsApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /public/terms-and-condition
        getTerms: builder.query({
            query: () => ({
                url: "/public/terms-and-condition",
                method: "GET",
            }),
            transformResponse: (response) => response === null || response === void 0 ? void 0 : response.data,
        }),
        // POST /public
        createTerms: builder.mutation({
            query: (body) => ({
                url: "/public",
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false,
});
exports.useGetTermsQuery = exports.termsApi.useGetTermsQuery, exports.useCreateTermsMutation = exports.termsApi.useCreateTermsMutation;
