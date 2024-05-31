import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FetchedChats, SearchedUsers } from "../../utils/types"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
  }),
  tagTypes: ["Chats", "SearchUser"],

  endpoints: (builder) => ({
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
export const { useGetChatsQuery, useSearchUsersQuery } = api
