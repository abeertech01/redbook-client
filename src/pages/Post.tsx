import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import {
  useAddCommentMutation,
  useDownvotePostMutation,
  useGetPostQuery,
  useUpvotePostMutation,
} from "../app/api/api"
import TimeAgo from "javascript-time-ago"
import Navbar from "../components/Navbar"
import clsx from "clsx"
import upArrow from "../assets/icons/arrow-up-plain.png"
import downArrow from "../assets/icons/arrow-down-plain.png"
import commentIcon from "../assets/icons/comment-plain.png"
import shareIcon from "../assets/icons/share-plain.png"
import { formatNumber } from "../utils/helper"
import Comments from "../components/Comments"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"

type PostProps = {}

const Post: React.FC<PostProps> = () => {
  const { id: postId } = useParams()
  const { user } = useSelector((state: RootState) => state.auth)
  const { data, isLoading, isError: __ } = useGetPostQuery(postId as string)
  const [upvotePost, { isLoading: upvoting }] = useUpvotePostMutation()
  const [downvotePost, { isLoading: downvoting }] = useDownvotePostMutation()
  const [addComment, { isLoading: adding }] = useAddCommentMutation()

  const timeAgo = new TimeAgo("en-US")
  let [timeDiff, setTimeDiff] = useState("")

  useEffect(() => {
    if (data?.success)
      setTimeDiff(timeAgo.format(new Date(data?.post?.createdAt)))
  }, [data])

  const upvoteThisPost = async () => {
    console.log("upvoted")
    await upvotePost(data?.post.id as string)
  }

  const downvoteThisPost = async () => {
    console.log("downvoted")
    await downvotePost(data?.post.id as string)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    await addComment({
      ...formData,
      postId: data?.post.id as string,
    })
  }

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className="">
      <Navbar />
      <div className="card bg-base-300 w-[700px] mx-auto shadow-sm z-20 my-4">
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
                <h1 className="text-[1.2rem]">{data?.post.author.name}</h1>
                <h3 className="text-[0.8rem]">
                  @{data?.post.author.username} • {timeDiff}
                </h3>
              </div>
            </div>
          </div>
          <h2 className="card-title">{data?.post.title}</h2>
          <p>
            {/* make post texts bigger if it has less than 100 letters */}
            {(data?.post.content as string).length < 100 ? (
              <span className="text-[1.2rem]">{data?.post.content}</span>
            ) : (
              <span>{data?.post.content}</span>
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
                    data?.post.upvoteIds.includes(
                      data?.post.authorId as string
                    ) && "bg-[#eaeaea27] shadow-sm shadow-[#eaeaea42]"
                  )}
                >
                  <img src={upArrow} alt="" className="h-[20px] inline-block" />
                  {formatNumber(data?.post.upvoteIds.length as number)}
                </button>
                |
                <button
                  onClick={downvoteThisPost}
                  disabled={downvoting}
                  className={clsx(
                    "flex gap-1 text-[0.9rem] px-2 py-1 rounded-xl",
                    data?.post.downvoteIds.includes(
                      data?.post.authorId as string
                    ) && "bg-[#eaeaea27] shadow-sm shadow-[#eaeaea42]"
                  )}
                >
                  <img
                    src={downArrow}
                    alt=""
                    className="h-[20px] inline-block"
                  />
                  {formatNumber(data?.post.downvoteIds.length as number)}
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
                  <img
                    src={shareIcon}
                    alt=""
                    className="h-[20px] inline-block"
                  />
                  4.1K
                </button>
              </span>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-4 flex items-start gap-4"
          >
            <textarea
              className="textarea textarea-bordered w-full flex-1 text-base"
              placeholder="Add a comment..."
              {...register("content")}
              rows={4}
            ></textarea>
            <button
              type="submit"
              disabled={adding}
              className="btn btn-primary float-right w-[6rem]"
            >
              {adding ? "Commenting..." : "Comment"}
            </button>
          </form>
          <hr className="border-[#676767]" />
          <div className="">
            <Comments
              userId={user?.id as string}
              postId={data?.post.id as string}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Post
