import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { AxiosError, SIGNUP_USER_PAYLOAD, User } from "../../utils/types"

function isAxiosError(error: any): error is AxiosError {
  return (
    error.response &&
    error.response.data &&
    typeof error.response.data.message === "string"
  )
}

const loginUser = createAsyncThunk("auth/login", async (body, _) => {
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/v1/auth/login`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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
})

const signupUser = createAsyncThunk<User, SIGNUP_USER_PAYLOAD>(
  "auth/signup",
  async (body, _) => {
    try {
      console.log(body)
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/auth/register`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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
