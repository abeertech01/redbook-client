import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
  }),
  tagTypes: ["Profile"],

  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        credentials: "include",
      }),
      providesTags: ["Profile"],
    }),
  }),
})

export { api }
export const { useGetProfileQuery } = api
