import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  Comment,
  CREATE_POST_REQ_BODY,
  FetchedChats,
  FetchedCommentResponse,
  FetchedCommentsResponse,
  FetchedPostResponse,
  FetchedPosts,
  FetchedVotedPost,
  MessagesData,
  Post,
  ProfileData,
  SearchedUsers,
  VOTE_COMMENT_PAYLOAD,
} from "../../utils/types"
import { RootState } from "../store"
import { downvoteHelper, upvoteHelper } from "../../utils/helper"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
  }),
  tagTypes: [
    "Profile",
    "Chats",
    "SearchUser",
    "Messages",
    "Post",
    "Posts",
    "UserPosts",
    "Comments",
  ],

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
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
    getUserPosts: builder.query<FetchedPosts, string>({
      query: (authorId) => ({
        url: `/post/user-posts/${authorId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["UserPosts"],
    }),
    getPost: builder.query<FetchedPostResponse, string>({
      query: (postId) => ({
        url: `/post/get-post/${postId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Post"],
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
    deletePost: builder.mutation<FetchedPostResponse, string>({
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

        const patchGetPosts = dispatch(
          api.util.updateQueryData("getPosts", undefined, (draft) => {
            const postIndex = draft.posts.findIndex(
              (post) => post.id === postId
            )
            // upvote helper
            upvoteHelper<Post>(draft.posts, postIndex, authorId)
          })
        )

        const patchGetUserPosts = dispatch(
          api.util.updateQueryData("getUserPosts", authorId, (draft) => {
            const postIndex = draft.posts.findIndex(
              (post) => post.id === postId
            )
            // upvote helper
            upvoteHelper<Post>(draft.posts, postIndex, authorId)
          })
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchGetPosts.undo()
          patchGetUserPosts.undo()
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

        const patchGetPosts = dispatch(
          api.util.updateQueryData("getPosts", undefined, (draft) => {
            const postIndex = draft.posts.findIndex(
              (post) => post.id === postId
            )
            // downvote helper
            downvoteHelper<Post>(draft.posts, postIndex, authorId)
          })
        )
        const patchGetUserPosts = dispatch(
          api.util.updateQueryData("getUserPosts", authorId, (draft) => {
            const postIndex = draft.posts.findIndex(
              (post) => post.id === postId
            )
            // downvote helper
            downvoteHelper<Post>(draft.posts, postIndex, authorId)
          })
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchGetPosts.undo()
          patchGetUserPosts.undo()
        }
      },
    }),
    getPostComments: builder.query<FetchedCommentsResponse, string>({
      query: (postId) => ({
        url: `/post/post-comments/${postId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation<any, any>({
      query: (newComment) => ({
        url: `/post/add-comment`,
        method: "POST",
        body: newComment,
        credentials: "include",
      }),
      invalidatesTags: ["Comments"],
    }),
    upvoteComment: builder.mutation<
      FetchedCommentResponse,
      VOTE_COMMENT_PAYLOAD
    >({
      query: (ids) => ({
        url: `/post/comment/upvote/${ids.commentId}`,
        method: "PUT",
        credentials: "include",
      }),
      async onQueryStarted(
        { postId, commentId },
        { dispatch, queryFulfilled, getState }
      ) {
        const state = getState() as RootState
        const authorId = state.auth.user?.id as string

        const result = dispatch(
          api.util.updateQueryData("getPostComments", postId, (draft) => {
            const commentIndex = draft.comments.findIndex(
              (comment) => comment.id === commentId
            )
            // upvote helper
            upvoteHelper<Comment>(draft.comments, commentIndex, authorId)
          })
        )

        try {
          await queryFulfilled
        } catch (error) {
          result.undo()
        }
      },
    }),
    downvoteComment: builder.mutation<
      FetchedCommentResponse,
      VOTE_COMMENT_PAYLOAD
    >({
      query: (ids) => ({
        url: `/post/comment/downvote/${ids.commentId}`,
        method: "PUT",
        credentials: "include",
      }),
      async onQueryStarted(
        { postId, commentId },
        { dispatch, queryFulfilled, getState }
      ) {
        const state = getState() as RootState
        const authorId = state.auth.user?.id as string

        const result = dispatch(
          api.util.updateQueryData("getPostComments", postId, (draft) => {
            const commentIndex = draft.comments.findIndex(
              (comment) => comment.id === commentId
            )
            // downvote helper
            downvoteHelper<Comment>(draft.comments, commentIndex, authorId)
          })
        )

        try {
          await queryFulfilled
        } catch (error) {
          result.undo()
        }
      },
    }),
    deleteComment: builder.mutation<FetchedCommentResponse, string>({
      query: (commentId) => ({
        url: `/post/delete-comment/${commentId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Comments"],
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
  useGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpvotePostMutation,
  useDownvotePostMutation,
  useGetPostCommentsQuery,
  useAddCommentMutation,
  useUpvoteCommentMutation,
  useDownvoteCommentMutation,
  useDeleteCommentMutation,
} = api
