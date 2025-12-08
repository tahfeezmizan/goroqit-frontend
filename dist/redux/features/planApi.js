"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeletePlanMutation = exports.useUpdatePlanMutation = exports.useCreatePlanMutation = exports.useGetPlanByIdQuery = exports.useGetPlansQuery = exports.planApi = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const baseApi_1 = require("./baseApi");
exports.planApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET all plans
        getPlans: builder.query({
            query: () => ({ url: "/plan", method: "GET" }),
            transformResponse: (response) => { var _a; return (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : []; },
        }),
        // GET plan by ID
        getPlanById: builder.query({
            query: (id) => ({
                url: `/plan/${id}`,
                method: "GET",
            }),
            transformResponse: (response) => response === null || response === void 0 ? void 0 : response.data,
            providesTags: ["Plan"],
        }),
        // POST create plan
        createPlan: builder.mutation({
            query: (body) => ({
                url: "/plan",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Plan"],
        }),
        // PATCH update plan
        updatePlan: builder.mutation({
            query: ({ id, data }) => ({
                url: `/plan/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Plan"],
        }),
        // DELETE plan
        deletePlan: builder.mutation({
            query: (id) => ({
                url: `/plan/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Plan"],
        }),
    }),
    overrideExisting: false,
});
exports.useGetPlansQuery = exports.planApi.useGetPlansQuery, exports.useGetPlanByIdQuery = exports.planApi.useGetPlanByIdQuery, exports.useCreatePlanMutation = exports.planApi.useCreatePlanMutation, exports.useUpdatePlanMutation = exports.planApi.useUpdatePlanMutation, exports.useDeletePlanMutation = exports.planApi.useDeletePlanMutation;
