import React, { useEffect } from "react"
import Comment from "./Comment"
import { useGetPostCommentsQuery } from "../app/api/api"

type CommentsProps = {
  userId: string
  postId: string
  incCommentNum: (commentNum: number) => void
}

const Comments: React.FC<CommentsProps> = ({
  userId,
  postId,
  incCommentNum,
}) => {
  const { data, isLoading: _, isError: __ } = useGetPostCommentsQuery(postId)

  useEffect(() => {
    incCommentNum(data?.comments ? (data?.comments.length as number) : 0)
  }, [data])

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
