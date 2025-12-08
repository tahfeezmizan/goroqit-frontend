"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateCompnayProfileMutation = exports.useUpdateWorkExperienceMutation = exports.useAddWorkExperienceMutation = exports.useDeleteEducationMutation = exports.useDeleteWorkExperienceMutation = exports.useUpdateProfileMutation = exports.useGetAllUserQuery = exports.useGetAllTalentQuery = exports.useGetMeQuery = exports.useUpdateMeMutation = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const baseApi_1 = require("./baseApi");
const userApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /** ======================
         *  USER MANAGEMENT
         * =====================*/
        // Get all users (with optional pagination & role filter)
        getAllUser: builder.query({
            query: ({ page = 1, limit = 10, role, }) => {
                const query = new URLSearchParams();
                query.append("page", String(page));
                query.append("limit", String(limit));
                if (role)
                    query.append("role", role);
                return {
                    url: `/user?${query.toString()}`,
                    method: "GET",
                };
            },
        }),
        // Get all talents/applicants
        getAllTalent: builder.query({
            query: () => ({
                url: "/user/applicants",
                method: "GET",
            }),
            providesTags: ["Auth"],
            transformResponse: (response) => {
                var _a;
                return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data;
            },
        }),
        // Get current logged-in user details
        getMe: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["Auth"],
            transformResponse: (response) => {
                return response === null || response === void 0 ? void 0 : response.data;
            },
        }),
        /** ======================
         *  PROFILE MANAGEMENT
         * =====================*/
        // Update logged-in user's basic info
        UpdateMe: builder.mutation({
            query: ({ body }) => {
                console.log("UpdateMe body:", body);
                return {
                    url: "/user/update-me",
                    method: "PATCH",
                    body,
                };
            },
        }),
        // Update company profile
        UpdateCompnayProfile: builder.mutation({
            query: ({ body }) => {
                console.log("UpdateMe body:", body);
                return {
                    url: "/user/profile",
                    method: "PATCH",
                    body,
                };
            },
        }),
        // Update general user profile
        UpdateProfile: builder.mutation({
            query: ({ body }) => {
                console.log("UpdateProfile body:", body);
                return {
                    url: "/user/profile",
                    method: "PATCH",
                    body,
                };
            },
        }),
        /** ======================
         *  WORK EXPERIENCE
         * =====================*/
        // Add new work experience
        AddWorkExperience: builder.mutation({
            query: ({ body }) => {
                console.log("AddWorkExperience body:", body);
                return {
                    url: "/user/profile/work-experience",
                    method: "POST",
                    body,
                };
            },
        }),
        // Delete specific work experience by index
        DeleteWorkExperience: builder.mutation({
            query: ({ index }) => ({
                url: `/user/profile/work-experience/${index}`,
                method: "DELETE",
            }),
        }),
        // Update specific work experience by index
        UpdateWorkExperience: builder.mutation({
            query: ({ index, body }) => {
                console.log("UpdateWorkExperience index:", index, "body:", body);
                return {
                    url: `/user/profile/work-experience/${index}`,
                    method: "PUT",
                    body,
                };
            },
        }),
        /** ======================
         *  EDUCATION
         * =====================*/
        // Delete specific education by index
        DeleteEducation: builder.mutation({
            query: ({ index }) => {
                console.log("DeleteEducation index:", index);
                return {
                    url: `/user/profile/education/${index}`,
                    method: "DELETE",
                };
            },
        }),
    }),
});
exports.useUpdateMeMutation = userApi.useUpdateMeMutation, exports.useGetMeQuery = userApi.useGetMeQuery, exports.useGetAllTalentQuery = userApi.useGetAllTalentQuery, exports.useGetAllUserQuery = userApi.useGetAllUserQuery, exports.useUpdateProfileMutation = userApi.useUpdateProfileMutation, exports.useDeleteWorkExperienceMutation = userApi.useDeleteWorkExperienceMutation, exports.useDeleteEducationMutation = userApi.useDeleteEducationMutation, exports.useAddWorkExperienceMutation = userApi.useAddWorkExperienceMutation, exports.useUpdateWorkExperienceMutation = userApi.useUpdateWorkExperienceMutation, exports.useUpdateCompnayProfileMutation = userApi.useUpdateCompnayProfileMutation;
