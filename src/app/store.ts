import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api/api"
import authSlice from "./reducers/auth"

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
