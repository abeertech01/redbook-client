import { createSlice } from "@reduxjs/toolkit"
import { createPost } from "../thunks/post"
import { PostInitialStateType } from "../../utils/types"

const initialState: PostInitialStateType = {
  posts: null,
}

const authSlice = createSlice({
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
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts = action.payload.posts
    })
  },
})

export default authSlice
