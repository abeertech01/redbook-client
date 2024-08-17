import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  srchUserModalOpen: false,
  postSearchBox: true,
}

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    changeSrchUserModalOpen(state, action) {
      state.srchUserModalOpen = action.payload
    },
    changePostSearchBox(state, action) {
      state.postSearchBox = action.payload
    },
  },
})

export default miscSlice
export const { changeSrchUserModalOpen, changePostSearchBox } =
  miscSlice.actions
