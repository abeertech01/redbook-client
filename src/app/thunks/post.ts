import { createAsyncThunk } from "@reduxjs/toolkit"

import axios from "axios"
import { isAxiosError } from "../../utils/helper"
import { axiosConfig } from "../../constants/config"
import { CREATE_POST_INPUTS, FetchedPosts } from "../../utils/types"

const createPost = createAsyncThunk<FetchedPosts, CREATE_POST_INPUTS>(
  "post/createPost",
  async (body, _) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/post/create-post`,
        body,
        axiosConfig
      )

      return result.data
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response.data.message)
      } else {
        // Handle other types of errors
        throw new Error("An unknown error occurred")
      }
    }
  }
)

export { createPost }
