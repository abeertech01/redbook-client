import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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

  // extraReducers: (builder) => {},
})

export default authSlice
export const { userExists, userDoesntExist } = authSlice.actions
