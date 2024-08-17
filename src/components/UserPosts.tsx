import React from "react"
import { useGetUserPostsQuery } from "../app/api/api"
import PostCard from "./PostCard"

type UserPostsProps = {}

const UserPosts: React.FC<UserPostsProps> = () => {
  const { data: postsData, isLoading: _, isError: __ } = useGetUserPostsQuery()
  return (
    <>
      <h1 className="text-[1.4rem] font-bold mb-4 underline">Posts</h1>

      {/* Posts */}
      <ul className="flex flex-col gap-5">
        {postsData?.posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </>
  )
}
export default UserPosts
