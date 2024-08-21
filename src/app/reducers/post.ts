import { createSlice } from "@reduxjs/toolkit"
import { downvotePost, upvotePost } from "../thunks/post"
import { PostInitialStateType } from "../../utils/types"

const initialState: PostInitialStateType = {
  posts: null,
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // userExists(state, action) {
    //   state.user = action.payload
    //   state.loader = false
    // },
    // userDoesntExist(state) {
    //   state.user = null
    //   state.loader = false
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(upvotePost.fulfilled, (state, action) => {
        const targetPostIndex = state.posts?.findIndex(
          (post) => post.id === action.payload.post.id
        )

        if (targetPostIndex !== -1) {
          state.posts![targetPostIndex as number] = action.payload.post
        }
      })
      .addCase(downvotePost.fulfilled, (state, action) => {
        const targetPostIndex = state.posts?.findIndex(
          (post) => post.id === action.payload.post.id
        )

        if (targetPostIndex !== -1) {
          state.posts![targetPostIndex as number] = action.payload.post
        }
      })
  },
})

export default postSlice
