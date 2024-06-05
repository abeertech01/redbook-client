import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FetchedChats, SearchedUsers } from "../../utils/types"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
  }),
  tagTypes: ["Profile", "Chats", "SearchUser"],

  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
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
  }),
})

export { api }
export const { useGetProfileQuery, useGetChatsQuery, useSearchUsersQuery } = api
