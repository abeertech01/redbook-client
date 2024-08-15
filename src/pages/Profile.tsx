import React, { useEffect } from "react"
import { useGetProfileQuery } from "../app/api/api"
import Navbar from "../components/Navbar"
import upArrow from "../assets/icons/arrow-up-plain.png"
import downArrow from "../assets/icons/arrow-down-plain.png"
import commentIcon from "../assets/icons/comment-plain.png"
import shareIcon from "../assets/icons/share-plain.png"

type ProfileProps = {}

const Profile: React.FC<ProfileProps> = () => {
  const { data, isLoading, isError, refetch } = useGetProfileQuery()

  useEffect(() => {
    refetch()
  }, [])

  return (
    <div className="pb-4">
      <Navbar />
      <div className="w-[700px] mx-auto bg-base-100">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapersmug.com%2Fdownload%2F1920x1080%2F81db8b%2Fhouses-winter-landscape-sunst.jpg&f=1&nofb=1&ipt=7f48003355431c022516bc28db7af842f8c4c745b347d6a1bbc9afe8b043caf4&ipo=images"
          alt=""
          className="w-full aspect-[9/3] object-cover border-b-2 border-r-2 border-l-2 border-b-zinc-500 border-l-zinc-500 border-r-zinc-500 rounded-b-lg shadow-md shadow-gray-800"
        />
        <div className="flex items-center gap-4 -translate-y-[20%]">
          <div className="w-[160px] h-[160px] ml-[3rem] shadow-lg">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F024%2F183%2F502%2Fnon_2x%2Fmale-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg&f=1&nofb=1&ipt=4a1ff16d454684097e36264e34ac945a012cf952721b445349c010a173cc1857&ipo=images"
              className="w-full h-full rounded-full inline-block"
            />
          </div>
          <h1 className="inline-block text-[2rem] font-bold leading-7">
            {" "}
            {data?.user?.name}
            <br />
            <span className="text-[1.2rem] font-normal">100 posts</span>
          </h1>
        </div>

        {/* Bio */}
        <div className="w-[700px] mx-auto mb-8 flex flex-col gap-2">
          <div className="username">
            <strong>Username:</strong> @{data?.user?.username}
          </div>

          <div className="email">
            <strong>Email:</strong> @{data?.user?.email}
          </div>

          <div className="email">
            <strong>Bio:</strong> Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quod, debitis molestiae. Eum repudiandae animi
            tempore eligendi voluptate enim architecto velit ut in reiciendis,
            quae eos veniam labore quas ipsam quisquam!
          </div>
        </div>

        <hr className="mb-8 text-yellow-400 border-zinc-500" />

        {/* Posts */}
        <ul className="flex flex-col gap-5">
          <div className="card bg-base-300 w-full shadow-sm z-20">
            <div className="card-body">
              <div className="flex gap-2 items-center rounded-md mb-2">
                <div className="w-12 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F024%2F183%2F502%2Fnon_2x%2Fmale-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg&f=1&nofb=1&ipt=4a1ff16d454684097e36264e34ac945a012cf952721b445349c010a173cc1857&ipo=images"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="overflow-hidden">
                  <h1 className="text-[1.2rem]">Demo Name</h1>
                  <h3 className="text-[0.8rem]">@username • 2h ago</h3>
                </div>
              </div>
              <h2 className="card-title">Card title!</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                explicabo qui quos esse cupiditate. Nihil molestias nesciunt
                cumque, incidunt placeat tempora dolore, quam et aut
                perferendis, magni suscipit? Obcaecati, explicabo!
              </p>
              <div className="card-actions mt-2">
                <div className="flex justify-center items-center space-x-4">
                  <span className="flex justify-between gap-2 items-center bg-gray-800 text-white rounded-full px-4 py-2">
                    <button className="flex gap-1 text-[0.9rem]">
                      <img
                        src={upArrow}
                        alt=""
                        className="h-[20px] inline-block"
                      />
                      5.5k
                    </button>
                    |
                    <button className="flex gap-1 text-[0.9rem]">
                      <img
                        src={downArrow}
                        alt=""
                        className="h-[20px] inline-block"
                      />
                      4k
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
            </div>
          </div>
        </ul>
      </div>
    </div>
  )
}
export default Profile

{
  /* <h1>Profile</h1>
      <p>
        name: {data?.user?.name} <br />
        username: {data?.user?.username} <br />
        email: {data?.user?.email} <br />
      </p> */
}
