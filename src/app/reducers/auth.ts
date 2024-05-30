import { createSlice } from "@reduxjs/toolkit"
import { InitialStateType } from "../../utils/types"
import { loginUser, signupUser } from "../thunks/auth"

const initialState: InitialStateType = {
  user: null,
  loader: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists(state, action) {
      state.user = action.payload
      state.loader = false
    },
    userDoesntExist(state) {
      state.user = null
      state.loader = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loader = true
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loader = false
        state.user = action.payload
      })
      .addCase(signupUser.rejected, (state) => {
        state.loader = false
      })
      .addCase(loginUser.pending, (state) => {
        state.loader = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loader = false
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state) => {
        state.loader = false
      })
  },
})

export default authSlice
export const { userExists, userDoesntExist } = authSlice.actions
