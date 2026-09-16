/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

export const rewardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRewardSsoUrl: builder.query<any, void>({
      query: () => ({
        url: "/rewards/sso-url",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRewardSsoUrlQuery, useLazyGetRewardSsoUrlQuery } =
  rewardsApi;
