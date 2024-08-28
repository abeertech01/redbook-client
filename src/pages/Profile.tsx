import React, { useEffect } from "react"
import { useGetProfileQuery } from "../app/api/api"
import Navbar from "../components/Navbar"
import UserPosts from "../components/UserPosts"

type ProfileProps = {}

const Profile: React.FC<ProfileProps> = () => {
  const { data, isLoading: _, isError: __, refetch } = useGetProfileQuery()

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
          <div className="w-[160px] h-[160px] ml-[3rem]">
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
            <strong>Email:</strong> {data?.user?.email}
          </div>

          <div className="email">
            <strong>Bio:</strong> Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quod, debitis molestiae. Eum repudiandae animi
            tempore eligendi voluptate enim architecto velit ut in reiciendis,
            quae eos veniam labore quas ipsam quisquam!
          </div>
        </div>

        <hr className="mb-8 text-yellow-400 border-zinc-500" />

        <h1 className="text-[1.4rem] font-bold mb-4 underline">Posts</h1>
        <UserPosts userId={data?.user?.id} />
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
