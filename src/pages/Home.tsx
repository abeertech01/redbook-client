import React from "react"
import Navbar from "../components/Navbar"
// import cart from "../assets/shopping-cart.png"
import profileAvatar from "../assets/icons/human-avatar.png"
import upArrow from "../assets/icons/arrow-up-plain.png"
import downArrow from "../assets/icons/arrow-down-plain.png"
import commentIcon from "../assets/icons/comment-plain.png"
import shareIcon from "../assets/icons/share-plain.png"
import { useNavigate } from "react-router"

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <div className="_3cols">
        <div className="flex-1 h-full">
          <button
            onClick={() => navigate("/profile")}
            className="hover:bg-[#EE466E] text-white w-[320px] py-3 px-3 text-left rounded-lg"
          >
            <img
              src={profileAvatar}
              alt="profile avatar"
              className="w-6 inline-block mr-2"
            />
            Profile
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
          <button className="card bg-base-200 w-full text-left text-lg p-4 border-2 border-zinc-700 cursor-text mb-4">
            Write what's on your mind!
          </button>

          <ul className="flex flex-col gap-5">
            <div className="card bg-base-300 w-full shadow-sm">
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
        <div className="flex-1 h-full"></div>
      </div>
    </div>
  )
}
export default Home
