import { get } from "lodash";
import { baseApi } from "./baseApi";

const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewsletter: builder.mutation({
      query: (data) => ({
        url: "/newsletter",
        method: "POST",
        body: data,
      }),
    }),

    getNewsletters: builder.query({
      query: () => ({
        url: "/newsletter",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
});

export const { useCreateNewsletterMutation, useGetNewslettersQuery } =
  newsletterApi;
