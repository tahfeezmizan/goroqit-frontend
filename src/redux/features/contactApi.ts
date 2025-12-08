import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => "/public/contact/all",
    }),

    addContact: builder.mutation({
      query: (newContact) => ({
        url: "/public/contact",
        method: "POST",
        body: newContact,
      }),
    }),
  }),
});

export const { useGetContactsQuery, useAddContactMutation } = contactApi;
