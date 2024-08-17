export interface User {
  id: string
  name: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthResult {
  sucess: boolean
  user: User
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

export interface InboxMessage {
  id: string
  text: string
  createdAt: Date
  authorId: string
  chatId: string
}

export interface MessagesData {
  success: boolean
  messages: [InboxMessage]
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

export interface AuthInitialStateType {
  user: User | null
  loader: boolean
}

export interface PostInitialStateType {
  posts: [Post] | null
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

export interface Post {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  content: string
  upvote: number
  downvote: number
  authorId: string
  author: User
}

export interface FetchedPosts {
  success: boolean
  posts: [Post]
}

export interface CREATE_POST_INPUTS {
  title: string
  content: string
}
