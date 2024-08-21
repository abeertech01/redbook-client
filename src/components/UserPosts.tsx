import React from "react"
import { useGetUserPostsQuery } from "../app/api/api"
import PostCard from "./PostCard"

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
      <h1 className="text-[1.4rem] font-bold mb-4 underline">Posts</h1>

      {/* Posts */}
      <ul className="flex flex-col gap-5">
        {postsData?.posts?.map((post) => (
          <PostCard key={post.id} post={post} userId={userId} />
        ))}
      </ul>
    </>
  )
}
export default UserPosts
