import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {
  AuthResult,
  LOGIN_USER_PAYLOAD,
  SIGNUP_USER_PAYLOAD,
} from "../../utils/types"
import { axiosConfig } from "../../constants/config"
import { isAxiosError } from "../../utils/helper"

const loginUser = createAsyncThunk<AuthResult, LOGIN_USER_PAYLOAD>(
  "auth/login",
  async (body, _) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/login`,
        body,
        axiosConfig
      )

      console.log(result.data)

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

const signupUser = createAsyncThunk<AuthResult, SIGNUP_USER_PAYLOAD>(
  "auth/signup",
  async (body, _) => {
    try {
      console.log(body)
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/register`,
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

export { loginUser, signupUser }
