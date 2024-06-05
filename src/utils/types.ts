export interface User {
  id: string
  name: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface ProfileData {
  success: boolean
  user: User
}

export interface FetchedChats {
  success: boolean
  chats: [Chat]
}

export interface Chat {
  id: string
  createdAt: Date
  updatedAt: Date
  creatorId: string
  members: [User]
  theOtherUserIndex: number
}

export interface SearchedUsers {
  success: boolean
  users: [SearchedUser]
}

export interface SearchedUser {
  id: string
  name: string
  username: string
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

export interface SocketEventHandler {
  [key: string]: (...args: any) => void
}
