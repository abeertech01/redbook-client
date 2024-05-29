import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FetchedUser } from "../../utils/types"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
  }),
  tagTypes: ["Profile"],

  endpoints: (builder) => ({
    getProfile: builder.query<FetchedUser, void>({
      query: () => ({
        url: "/auth/profile",
        credentials: "include",
      }),
      providesTags: ["Profile"],
    }),
  }),
})

export { api }
export const { useGetProfileQuery } = api
