import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  CREATE_POST_REQ_BODY,
  FetchedChats,
  FetchedPostResponse,
  FetchedPosts,
  FetchedVotedPost,
  MessagesData,
  ProfileData,
  SearchedUsers,
} from "../../utils/types"
import { RootState } from "../store"

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
    getUserPosts: builder.query<FetchedPosts, string>({
      query: (authorId) => ({
        url: `/post/all-posts?authorId=${authorId}`,
        credentials: "include",
      }),
    }),
    /**
     * FIXME:
     * createPost invalidates posts.
     * This can be a bad idea if there is a huge number of useers.
     * optimistic update is a good way
     * But it's not working for some reason.
     * HINT: manually place the created post in the first place of news feed. (not sure, optional)
     */
    createPost: builder.mutation<FetchedPostResponse, CREATE_POST_REQ_BODY>({
      query: (newPost) => ({
        url: "/post/create-post",
        method: "POST",
        body: newPost,
        credentials: "include",
      }),
      invalidatesTags: ["Posts"],
    }),
    /**
     * FIXME: same as createPost
     */
    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/post/delete-post/${postId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Posts"],
    }),
    upvotePost: builder.mutation<FetchedVotedPost, string>({
      query: (postId) => ({
        url: `/post/upvote/${postId}`,
        method: "PUT",
        credentials: "include",
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState
        const authorId = state.auth.user?.id as string

        const patchResult = dispatch(
          api.util.updateQueryData("getPosts", undefined, (draft) => {
            const postIndex = draft.posts.findIndex(
              (post) => post.id === postId
            )
            if (postIndex !== -1) {
              if (!draft.posts[postIndex].upvoteIds.includes(authorId)) {
                draft.posts[postIndex].upvoteIds.push(authorId)

                if (draft.posts[postIndex].downvoteIds.includes(authorId)) {
                  draft.posts[postIndex].downvoteIds.splice(
                    draft.posts[postIndex].downvoteIds.indexOf(authorId),
                    1
                  )
                }
              } else {
                draft.posts[postIndex].upvoteIds.splice(
                  draft.posts[postIndex].upvoteIds.indexOf(authorId),
                  1
                )
              }
            }
          })
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
    }),
    downvotePost: builder.mutation<FetchedVotedPost, string>({
      query: (authorId) => ({
        url: `/post/downvote/${authorId}`,
        method: "PUT",
        credentials: "include",
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState
        const authorId = state.auth.user?.id as string

        const patchResult = dispatch(
          api.util.updateQueryData("getPosts", undefined, (draft) => {
            const postIndex = draft.posts.findIndex(
              (post) => post.id === postId
            )
            if (postIndex !== -1) {
              if (!draft.posts[postIndex].downvoteIds.includes(authorId)) {
                draft.posts[postIndex].downvoteIds.push(authorId)

                if (draft.posts[postIndex].upvoteIds.includes(authorId)) {
                  draft.posts[postIndex].upvoteIds.splice(
                    draft.posts[postIndex].upvoteIds.indexOf(authorId),
                    1
                  )
                }
              } else {
                draft.posts[postIndex].downvoteIds.splice(
                  draft.posts[postIndex].downvoteIds.indexOf(authorId),
                  1
                )
              }
            }
          })
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
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
  useGetUserPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpvotePostMutation,
  useDownvotePostMutation,
} = api
