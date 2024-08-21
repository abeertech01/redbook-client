import { createAsyncThunk } from "@reduxjs/toolkit"

import axios from "axios"
import { isAxiosError } from "../../utils/helper"
import { axiosConfig } from "../../constants/config"
import { FetchedVotedPost, Post } from "../../utils/types"

const upvotePost = createAsyncThunk<FetchedVotedPost, { id: string }>(
  "post/upvotePost",
  async (body, _) => {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/post/upvote/${body.id}`,
        {},
        axiosConfig
      )

      return result.data
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response.data.message)
      } else {
        throw new Error("An unknown error occurred")
      }
    }
  }
)

const downvotePost = createAsyncThunk<
  { success: boolean; post: Post },
  { id: string }
>("post/downvotePost", async (body, _) => {
  try {
    const { id } = body
    const result = await axios.put(
      `${import.meta.env.VITE_SERVER}/api/v1/post/downvote/${id}`,
      {},
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
})

export { upvotePost, downvotePost }
