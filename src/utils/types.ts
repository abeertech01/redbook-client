export interface User {
  id: string
  name: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface FetchedUser {
  success: boolean
  message: string
  user: User
}

export interface SIGNUP_USER_PAYLOAD {
  name: string
  username: string
  email: string
  password: string
}

export interface LOGIN_USER_PAYLOAD {
  userAddress: string
  password: string
}

export interface InitialStateType {
  user: User | null
  loader: boolean
}

export interface AxiosError {
  response: {
    data: {
      message: string
    }
  }
}