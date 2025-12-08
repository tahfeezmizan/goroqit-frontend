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
  }),
});

export const { useCreateNewsletterMutation } = newsletterApi;
