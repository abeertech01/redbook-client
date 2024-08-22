import React from "react"
import { useGetUserPostsQuery } from "../app/api/api"
import Posts from "./Posts"
import { Post } from "../utils/types"

type UserPostsProps = {
  userId: string | undefined
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
  const {
    data: postsData,
    isLoading: _,
    isError: __,
  } = useGetUserPostsQuery(userId as string)
  return (
    <>
      <Posts posts={postsData?.posts as Post[]} userId={userId as string} />
    </>
  )
}
export default UserPosts
