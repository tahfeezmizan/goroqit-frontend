"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteCategoryMutation = exports.useUpdateCategoryMutation = exports.useGetAllCategoryQuery = exports.useGetCategoryQuery = exports.useCreateCategoryMutation = void 0;
const baseApi_1 = require("./baseApi");
const categoryApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // create category endpoint
        createCategory: builder.mutation({
            query: (data) => ({
                url: "/category",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        // get category endpoint
        getAllCategory: builder.query({
            query: () => ({
                url: `/category`,
                method: "GET",
            }),
            providesTags: ["Category"],
            transformResponse: (response) => {
                var _a;
                return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data;
            },
        }),
        // get category endpoint
        getCategory: builder.query({
            query: ({ page = 1, limit = 10 } = {}) => ({
                url: `/category?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Category"],
        }),
        // Update category endpoint
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/category/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        // Delete category endpoint
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});
exports.useCreateCategoryMutation = categoryApi.useCreateCategoryMutation, exports.useGetCategoryQuery = categoryApi.useGetCategoryQuery, exports.useGetAllCategoryQuery = categoryApi.useGetAllCategoryQuery, exports.useUpdateCategoryMutation = categoryApi.useUpdateCategoryMutation, exports.useDeleteCategoryMutation = categoryApi.useDeleteCategoryMutation;
