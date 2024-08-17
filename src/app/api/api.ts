import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  FetchedChats,
  FetchedPosts,
  MessagesData,
  ProfileData,
  SearchedUsers,
} from "../../utils/types"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
  }),
  tagTypes: ["Profile", "Chats", "SearchUser", "Messages", "Posts"],

  endpoints: (builder) => ({
    getProfile: builder.query<ProfileData, void>({
      query: () => ({
        url: "/user/profile",
        credentials: "include",
      }),
      providesTags: ["Profile"],
    }),
    getChats: builder.query<FetchedChats, void>({
      query: () => ({
        url: "/chat/chats",
        credentials: "include",
      }),
      providesTags: ["Chats"],
    }),
    searchUsers: builder.query<SearchedUsers, string>({
      query: (name = "") => ({
        url: `/user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["SearchUser"],
    }),
    getMessages: builder.query<MessagesData, string>({
      query: (chatId) => ({
        url: `/chat/messages/${chatId}`,
        credentials: "include",
      }),
      providesTags: ["Messages"],
    }),
    getPosts: builder.query<FetchedPosts, void>({
      query: () => ({
        url: "/post/all-posts",
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
  }),
})

export { api }
export const {
  useGetProfileQuery,
  useGetChatsQuery,
  useSearchUsersQuery,
  useGetMessagesQuery,
  useGetPostsQuery,
} = api
