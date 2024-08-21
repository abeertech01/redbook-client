import React, { useRef } from "react"
import upArrow from "../assets/icons/arrow-up-plain.png"
import downArrow from "../assets/icons/arrow-down-plain.png"
import commentIcon from "../assets/icons/comment-plain.png"
import shareIcon from "../assets/icons/share-plain.png"
import { Post } from "../utils/types"
import { Button, Menu } from "react-daisyui"
import {
  useDeletePostMutation,
  useDownvotePostMutation,
  useUpvotePostMutation,
} from "../app/api/api"
import TimeAgo from "javascript-time-ago"
import { formatNumber } from "../utils/helper"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"

type PostCardProps = {
  post: Post
  userId: string | undefined
}

const PostCard: React.FC<PostCardProps> = ({ post, userId }) => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [deletePost, { isLoading: _ }] = useDeletePostMutation()
  const [upvotePost, { isLoading: upvoting }] = useUpvotePostMutation()
  const [downvotePost, { isLoading: downvoting }] = useDownvotePostMutation()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const menuRef = useRef(null)

  const timeAgo = new TimeAgo("en-US")

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const timeDiff = timeAgo.format(new Date(post.createdAt))

  const upvoteThisPost = async () => {
    console.log("upvoted")
    await upvotePost(post.id)
  }

  const downvoteThisPost = async () => {
    console.log("downvoted")
    await downvotePost(post.id)
  }

  return (
    <li className="card bg-base-300 w-full shadow-sm z-20">
      <div className="card-body">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center rounded-md mb-2">
            <div className="w-12 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F024%2F183%2F502%2Fnon_2x%2Fmale-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg&f=1&nofb=1&ipt=4a1ff16d454684097e36264e34ac945a012cf952721b445349c010a173cc1857&ipo=images"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-[1.2rem]">{post.author.name}</h1>
              <h3 className="text-[0.8rem]">
                @{post.author.username} • {timeDiff}
              </h3>
            </div>
          </div>
          {post.authorId === userId && (
            <div className="relative flex flex-col items-end">
              <Button onClick={toggleMenu} shape="circle" color="ghost">
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
                  className="absolute min-w-max bg-base-100 rounded-lg right-12"
                >
                  <Menu.Item>
                    <button onClick={() => deletePost(post.id)}>
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
        <h2 className="card-title">{post.title}</h2>
        <p>
          {/* make post texts bigger if it has less than 100 letters */}
          {post.content.length < 100 ? (
            <span className="text-[1.2rem]">{post.content}</span>
          ) : (
            <span>{post.content}</span>
          )}
        </p>
        <div className="card-actions mt-2">
          <div className="flex justify-center items-center space-x-4">
            <span className="flex justify-between gap-1 items-center bg-gray-800 text-white rounded-full px-2 py-1">
              <button
                onClick={upvoteThisPost}
                disabled={upvoting}
                className={clsx(
                  "flex gap-1 text-[0.9rem] px-2 py-1 rounded-xl",
                  post.upvoteIds.includes(user?.id as string) &&
                    "bg-[#eaeaea27] shadow-sm shadow-[#eaeaea42]"
                )}
              >
                <img src={upArrow} alt="" className="h-[20px] inline-block" />
                {formatNumber(post.upvoteIds.length)}
              </button>
              |
              <button
                onClick={downvoteThisPost}
                disabled={downvoting}
                className={clsx(
                  "flex gap-1 text-[0.9rem] px-2 py-1 rounded-xl",
                  post.downvoteIds.includes(user?.id as string) &&
                    "bg-[#eaeaea27] shadow-sm shadow-[#eaeaea42]"
                )}
              >
                <img src={downArrow} alt="" className="h-[20px] inline-block" />
                {formatNumber(post.downvoteIds.length)}
              </button>
            </span>
            <span className="flex justify-between gap-2 items-center bg-gray-800 text-white rounded-full px-4 py-2">
              <button className="flex items-center gap-2 text-[0.9rem]">
                <img
                  src={commentIcon}
                  alt=""
                  className="h-[20px] inline-block"
                />
                4.1K
              </button>
            </span>
            <span className="flex justify-between gap-2 items-center bg-gray-800 text-white rounded-full px-4 py-2">
              <button className="flex items-center gap-2 text-[0.9rem]">
                <img src={shareIcon} alt="" className="h-[20px] inline-block" />
                4.1K
              </button>
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}
export default PostCard
