import React, { useState } from "react"
import Navbar from "../components/Navbar"
// import cart from "../assets/shopping-cart.png"
import profileAvatar from "../assets/icons/human-avatar.png"

import { useNavigate } from "react-router"
import { useGetPostsQuery } from "../app/api/api"
import { Button } from "react-daisyui"
import CreatePostModal from "../components/modals/CreatePostModal"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import Posts from "../components/Posts"
import { Post } from "../utils/types"
import { useEffect } from "react"
import { themeChange } from "theme-change"

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [CPModalOpen, setCPModalOpen] = useState(false)
  const { data: postsData, isLoading: _, isError: __ } = useGetPostsQuery()
  const navigate = useNavigate()

  const toggleCreatePostModal = () => {
    setCPModalOpen((prev) => !prev)
  }

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  return (
    <div>
      <Navbar />
      {CPModalOpen && (
        <CreatePostModal toggleCreatePostModal={toggleCreatePostModal} />
      )}
      <div className="_3cols">
        <div className="flex-1 h-full flex flex-col">
          <button
            onClick={() => navigate("/profile")}
            className="hover:bg-[#EE466E] bg-base-200 hover:text-white w-[320px] py-3 px-3 text-left rounded-lg"
          >
            <img
              src={profileAvatar}
              alt="profile avatar"
              className="w-6 inline-block mr-2"
            />
            {user?.name}
          </button>

          {/* Marketplace - will make it after completing posting */}
          {/* <button
            onClick={() => navigate("/marketplace")}
            className="hover:bg-[#EE466E] text-white w-[320px] py-3 px-3 text-left rounded-lg"
          >
            <img
              src={cart}
              alt="shopping cart"
              className="w-6 inline-block mr-2"
            />
            Marketplace
          </button> */}
        </div>
        <div className="mid-col">
          <Button
            onClick={toggleCreatePostModal}
            className="bg-base-200 w-full flex justify-start text-lg border-2 border-zinc-700 cursor-text mb-4"
          >
            Write what's on your mind!
          </Button>

          <Posts
            posts={postsData?.posts as Post[]}
            userId={user?.id as string}
          />

          {/* <ul className="flex flex-col gap-5 pb-4">
            {postsData?.posts?.map((post) => (
              <PostCard key={post.id} post={post} userId={user?.id} />
            ))}
          </ul> */}
        </div>
        <div className="flex-1 h-full flex justify-end">
          <select
            className="select select-bordered w-full max-w-xs"
            data-choose-theme
          >
            <option value="" selected>
              Light
            </option>
            <option value="dark">Dark</option>
            <option value="retro">Retro</option>
            <option value="lemonade">Lemonade</option>
            <option value="cupcake">Cupcake</option>
          </select>
        </div>
      </div>
    </div>
  )
}
export default Home
