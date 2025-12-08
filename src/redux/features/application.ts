/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

const applicationApi = baseApi.injectEndpoints({
  // If this file is imported multiple times (e.g. in different modules),
  // RTK Query may attempt to register the same endpoint names again.
  // Setting `overrideExisting: true` prevents the runtime error:
  // "called `injectEndpoints` to override already-existing endpointName ..."
  overrideExisting: false,
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
      transformResponse: (response: any) => {
        return response?.data?.data;
      },
    }),
  }),
});

export const { useApplyJobMutation, useGetApplicationQuery } = applicationApi;
