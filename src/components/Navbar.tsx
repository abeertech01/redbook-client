import React from "react"
import { isAxiosError } from "../utils/helper"
import axios from "axios"
import { useDispatch } from "react-redux"
import { userDoesntExist } from "../app/reducers/auth"
import { useLocation, useNavigate } from "react-router"
import { AppDispatch } from "../app/store"
import { Link } from "react-router-dom"

type NavbarProps = {}

const Navbar: React.FC<NavbarProps> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()

  const logout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/api/v1/user/logout`, {
        withCredentials: true,
      })

      dispatch(userDoesntExist())

      navigate("/login")
      // give a toast message
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response.data.message)
      } else {
        // Handle other types of errors
        throw new Error("An unknown error occurred")
      }
    }
  }

  return (
    <div className="navbar bg-base-100 bg-gradient-to-r from-red-500 to-pink-500">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl text-white">
          RedBook
        </Link>
      </div>
      <div className="flex-none gap-2">
        {location.pathname !== "/chat" && (
          <>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto bg-red-400 text-white placeholder-white"
              />
            </div>
            <Link to={"/chat"} className="btn btn-secondary text-white">
              Chat
            </Link>
          </>
        )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F024%2F183%2F502%2Fnon_2x%2Fmale-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg&f=1&nofb=1&ipt=4a1ff16d454684097e36264e34ac945a012cf952721b445349c010a173cc1857&ipo=images"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-red-400 text-white"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            {/* <li>
              <a>Settings</a>
            </li> */}
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Navbar
