import clsx from "clsx"
import React from "react"
import upArrow from "../assets/icons/arrow-up-plain.png"
import { formatNumber } from "../utils/helper"
import downArrow from "../assets/icons/arrow-down-plain.png"
import {
  useDownvoteCommentMutation,
  useUpvoteCommentMutation,
} from "../app/api/api"
import { Comment } from "../utils/types"
import TimeAgo from "javascript-time-ago"

type CommentProps = {
  comment: Comment
}

const CommentComp: React.FC<CommentProps> = ({ comment }) => {
  const timeAgo = new TimeAgo("en-US")
  const [upvoteComment, { isLoading: upvoting }] = useUpvoteCommentMutation()
  const [downvoteComment, { isLoading: downvoting }] =
    useDownvoteCommentMutation()

  const upvoteThisComment = async () => {
    await upvoteComment({ postId: comment.postId, commentId: comment.id })
  }

  const downvoteThisComment = async () => {
    await downvoteComment({ postId: comment.postId, commentId: comment.id })
  }

  const timeDiff = timeAgo.format(new Date(comment.createdAt))

  return (
    <li className="p-4 bg-base-100 rounded-xl mt-4">
      <div className="flex gap-2 items-center rounded-md mb-2">
        <div className="w-8 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F024%2F183%2F502%2Fnon_2x%2Fmale-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg&f=1&nofb=1&ipt=4a1ff16d454684097e36264e34ac945a012cf952721b445349c010a173cc1857&ipo=images"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="overflow-hidden">
          <h1 className="text-[1rem]">
            {comment.author?.name} • <small>{timeDiff}</small>
          </h1>
        </div>
      </div>
      <p className="text-[0.9rem]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
        dignissimos sed. Maiores optio sit asperiores.
      </p>
      <div className="flex justify-start items-center space-x-4 mt-2">
        <span className="flex justify-between gap-1 items-center bg-gray-700 text-white rounded-full px-2 py-[5px]">
          <button
            onClick={upvoteThisComment}
            disabled={upvoting}
            className={clsx(
              "flex items-center gap-1 text-[0.8rem] px-2 py-1 rounded-xl",
              comment.upvoteIds.includes(comment.authorId as string) &&
                "bg-[#ebebeb7f] shadow-sm shadow-[#eaeaea6a]"
            )}
          >
            <img src={upArrow} alt="" className="h-[17px] inline-block" />
            {formatNumber(comment.upvoteIds.length as number)}
          </button>
          |
          <button
            onClick={downvoteThisComment}
            disabled={downvoting}
            className={clsx(
              "flex items-center gap-1 text-[0.8rem] px-2 py-1 rounded-xl",
              comment.downvoteIds.includes(comment.authorId as string) &&
                "bg-[#ebebeb42] shadow-sm shadow-[#eaeaea6a]"
            )}
          >
            <img src={downArrow} alt="" className="h-[17px] inline-block" />
            {formatNumber(comment.downvoteIds.length as number)}
          </button>
        </span>
        {/* <span className="flex justify-between gap-2 items-center bg-gray-800 text-white rounded-full px-4 py-2">
      <button className="flex items-center gap-2 text-[0.9rem]">
        <img
          src={commentIcon}
          alt=""
          className="h-[20px] inline-block"
        />
        4.1K
      </button>
    </span> */}
      </div>
    </li>
  )
}
export default CommentComp
