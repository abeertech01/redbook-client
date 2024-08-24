import clsx from "clsx"
import React from "react"
import upArrow from "../assets/icons/arrow-up-plain.png"
import { formatNumber } from "../utils/helper"
import downArrow from "../assets/icons/arrow-down-plain.png"

type CommentProps = {
  name: string
  upvoting: boolean
  upvoteThisPost: () => void
  upvoteIds: string[]
  authorId: string
  downvoteThisPost: () => void
  downvoting: boolean
  downvoteIds: string[]
}

const Comment: React.FC<CommentProps> = ({
  name,
  upvoting,
  upvoteThisPost,
  upvoteIds,
  authorId,
  downvoteThisPost,
  downvoting,
  downvoteIds,
}) => {
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
            {name} • <small>2 hours ago</small>
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
            onClick={upvoteThisPost}
            disabled={upvoting}
            className={clsx(
              "flex items-center gap-1 text-[0.8rem] px-2 py-1 rounded-xl",
              upvoteIds.includes(authorId as string) &&
                "bg-[#ebebeb7f] shadow-sm shadow-[#eaeaea6a]"
            )}
          >
            <img src={upArrow} alt="" className="h-[17px] inline-block" />
            {formatNumber(upvoteIds.length as number)}
          </button>
          |
          <button
            onClick={downvoteThisPost}
            disabled={downvoting}
            className={clsx(
              "flex items-center gap-1 text-[0.8rem] px-2 py-1 rounded-xl",
              downvoteIds.includes(authorId as string) &&
                "bg-[#ebebeb42] shadow-sm shadow-[#eaeaea6a]"
            )}
          >
            <img src={downArrow} alt="" className="h-[17px] inline-block" />
            {formatNumber(downvoteIds.length as number)}
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
export default Comment
