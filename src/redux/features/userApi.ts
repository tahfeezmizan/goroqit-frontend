/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** ======================
     *  USER MANAGEMENT
     * =====================*/

    // Get all users (with optional pagination & role filter)
    getAllUser: builder.query({
      query: ({
        page = 1,
        limit = 10,
        role,
      }: {
        page?: number;
        limit?: number;
        role?: string;
      }) => {
        const query = new URLSearchParams();
        query.append("page", String(page));
        query.append("limit", String(limit));
        if (role) query.append("role", role);

        return {
          url: `/user?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Auth"],
    }),

    // Get all talents/applicants
    getAllTalent: builder.query({
      query: () => ({
        url: "/user/applicants",
        method: "GET",
      }),
      providesTags: ["Auth"],
      transformResponse: (response: any) => {
        return response?.data?.data;
      },
    }),

    // Get current logged-in user details
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
      transformResponse: (response: any) => {
        return response?.data;
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

    AddPortfolio: builder.mutation({
      query: ({ body }) => ({
        url: "/user/applicants/portfolio",
        method: "POST",
        body,
      }),
    }),

    /** ======================
     *  EDUCATION
     * =====================*/

    addEducation: builder.mutation({
      query: ({ body }) => {
        console.log("addEducations", body);
        return {
          url: `/user/applicants/education`,
          method: "POST",
          body,
        };
      },
    }),

    // Delete specific education by index
    deleteEducation: builder.mutation({
      query: ({ title }) => {
        console.log("DeleteEducation title:", title);
        return {
          url: `/user/applicants/education/${title}`,
          method: "DELETE",
        };
      },
    }),

    // Delete specific education by index
    deletePortfolio: builder.mutation({
      query: ({ title }) => {
        console.log("DeleteEducation title:", title);
        return {
          url: `/user/applicants/portfolio/${title}`,
          method: "DELETE",
        };
      },
    }),

    deleteUser: builder.mutation<void, void>({
      query: () => ({
        url: "/user/me",
        method: "DELETE",
      }),
    }),
    deleteSingleUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useUpdateMeMutation,
  useGetMeQuery,
  useGetAllTalentQuery,
  useGetAllUserQuery,
  useAddPortfolioMutation,
  useUpdateProfileMutation,
  useAddEducationMutation,
  useDeleteWorkExperienceMutation,
  useAddWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
  useUpdateCompnayProfileMutation,
  useDeleteUserMutation,
  useDeleteEducationMutation,
  useDeleteSingleUserMutation,
  useDeletePortfolioMutation,
} = userApi;
