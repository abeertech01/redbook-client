import React from "react"
import Comment from "./Comment"
import { useGetPostCommentsQuery } from "../app/api/api"

type CommentsProps = {
  postId: string
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const { data, isLoading: _, isError: __ } = useGetPostCommentsQuery(postId)

  return (
    <>
      <ul className="flex flex-col gap-2">
        {data?.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </>
  )
}
export default Comments
