import React from "react"
import { Post } from "../utils/types"
import PostCard from "./PostCard"

type PostsProps = {
  posts: Post[]
  userId: string
}

const Posts: React.FC<PostsProps> = ({ posts, userId }) => {
  return (
    <ul className="flex flex-col gap-5">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} userId={userId} />
      ))}
    </ul>
  )
}
export default Posts
