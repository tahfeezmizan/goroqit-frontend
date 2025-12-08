// src/redux/features/chatApi.js
import { baseApi } from "./baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create chat
    createChat: builder.mutation({
      query: (body) => ({
        url: "/chat",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chat"],
    }),

    //  Get all chats
    getChats: builder.query({
      query: () => ({
        url: "/chat",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),

    // // Get messages for a specific chat
    // getMessages: builder.query({
    //   query: (chatId: string) => ({
    //     url: `/message/${chatId}`,
    //     method: "GET",
    //   }),
    //   providesTags: (result, error, chatId) => [
    //     { type: "Message", id: chatId },
    //     { type: "Chat", id: chatId }
    //   ],
        // }),
//     getMessages: builder.query({
//   query: ({ chatId, page, limit }: { chatId: string; page?: number; limit?: number }) => ({
//     url: `/message/${chatId}?page=${page}&limit=${limit}`,
//     method: "GET",
//   }),
//   providesTags: (result, error, { chatId }) => [
//     { type: "Message", id: chatId },
//     { type: "Chat", id: chatId }
//   ],
// }),
getMessages: builder.query({
  query: ({ chatId, page = 1, limit = 20 }: { chatId: string; page?: number; limit?: number }) => ({
    url: `/message/${chatId}?page=${page}&limit=${limit}`,
    method: "GET",
  }),
  providesTags: (result, error, { chatId }) => [
    { type: "Message", id: chatId },
    { type: "Chat", id: chatId }
  ],
  // Add this to merge incoming pages with existing data
  serializeQueryArgs: ({ queryArgs }) => {
    return queryArgs.chatId; // Use only chatId for cache key
  },
  // Merge new results with existing data
  merge: (currentCache, newData) => {
    if (newData.data) {
      // Prepend new messages to existing ones
      currentCache.data.messages = [
        ...newData.data.messages,
        ...currentCache.data.messages,
      ];
      // Update pagination info
      currentCache.data.hasMore = newData.data.hasMore;
      currentCache.data.currentPage = newData.data.currentPage;
    }
  },
  // Refetch when page changes
  forceRefetch({ currentArg, previousArg }) {
    return currentArg?.page !== previousArg?.page;
  },
}),

    // Send a new message
    sendMessage: builder.mutation({
      query: ({ chatId, text, type = "TEXT", sender }) => ({
        url: "/message",
        method: "POST",
        body: { chatId, text, type, sender },
      }),
      // Invalidate the messages cache for this specific chat
    //   invalidatesTags: (result, error, { chatId }) => [
    //     // { type: "Message", id: chatId },
    //     // { type: "Chat", id: chatId },
    //  //   "Chat" // Also invalidate general chat list
    //   ],
    }),
  }),
});

export const { 
  useCreateChatMutation, 
  useGetChatsQuery, 
  useGetMessagesQuery, 
  useSendMessageMutation 
} = chatApi;