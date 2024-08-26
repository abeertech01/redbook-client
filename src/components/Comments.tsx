import React from "react"
import Comment from "./Comment"
import { useGetPostCommentsQuery } from "../app/api/api"

type CommentsProps = {
  userId: string
  postId: string
}

const Comments: React.FC<CommentsProps> = ({ userId, postId }) => {
  const { data, isLoading: _, isError: __ } = useGetPostCommentsQuery(postId)

  return (
    <>
      <ul className="flex flex-col gap-2">
        {data?.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} userId={userId} />
        ))}
      </ul>
    </>
  )
}
export default Comments
