import clsx from "clsx"
import React, { useEffect, useRef, useState } from "react"
import upArrow from "../assets/icons/arrow-up-plain.png"
import { formatNumber } from "../utils/helper"
import downArrow from "../assets/icons/arrow-down-plain.png"
import {
  useDeleteCommentMutation,
  useDownvoteCommentMutation,
  useUpvoteCommentMutation,
} from "../app/api/api"
import { Comment } from "../utils/types"
import TimeAgo from "javascript-time-ago"
import { Button, Menu } from "react-daisyui"

type CommentProps = {
  comment: Comment
  userId: string
}

const CommentComp: React.FC<CommentProps> = ({ comment, userId }) => {
  const timeAgo = new TimeAgo("en-US")
  const [deleteComment, { isLoading: deletingComment }] =
    useDeleteCommentMutation()
  const [upvoteComment, { isLoading: upvoting }] = useUpvoteCommentMutation()
  const [downvoteComment, { isLoading: downvoting }] =
    useDownvoteCommentMutation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null)
  const removeBtnRef = useRef<HTMLElement>(null)

  const upvoteThisComment = async () => {
    await upvoteComment({ postId: comment.postId, commentId: comment.id })
  }

  const downvoteThisComment = async () => {
    await downvoteComment({ postId: comment.postId, commentId: comment.id })
  }

  const timeDiff = timeAgo.format(new Date(comment.createdAt))

  const handleRemoveIcon = () => {
    setMenuOpen(!menuOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      removeBtnRef.current &&
      !removeBtnRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen])

  return (
    <li className="p-4 bg-base-100 rounded-xl mt-4">
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 items-center">
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

        {comment.authorId === userId && (
          <div className="relative flex flex-col items-end">
            <Button
              ref={removeBtnRef}
              onClick={handleRemoveIcon}
              shape="circle"
              color="ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </Button>

            {menuOpen && (
              <Menu
                ref={menuRef}
                className="absolute min-w-max bg-base-300 rounded-lg right-12"
              >
                <Menu.Item>
                  <button onClick={() => deleteComment(comment.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                    Remove
                  </button>
                </Menu.Item>
              </Menu>
            )}
          </div>
        )}
      </div>
      <p className="text-[0.9rem]">{comment.content}</p>
      <div className="flex justify-start items-center space-x-4 mt-2">
        <span className="flex justify-between gap-1 items-center bg-gray-700 text-white rounded-full px-2 py-[5px]">
          <button
            onClick={upvoteThisComment}
            disabled={upvoting}
            className={clsx(
              "flex items-center gap-1 text-[0.8rem] px-2 py-1 rounded-xl",
              comment.upvoteIds.includes(userId as string) &&
                "bg-[#ebebeb42] shadow-sm shadow-[#eaeaea6a]"
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
              comment.downvoteIds.includes(userId as string) &&
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
