import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  srchUserModalOpen: false,
}

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    changeSrchUserModalOpen(state, action) {
      state.srchUserModalOpen = action.payload
    },
  },
})

export default miscSlice
export const { changeSrchUserModalOpen } = miscSlice.actions
