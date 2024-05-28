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
    setUser(state, action) {
      state.user = action.payload
    },
    setLoader(state, action) {
      state.loader = action.payload
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
export const { setUser, setLoader } = authSlice.actions
