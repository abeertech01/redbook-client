import React from "react"
import Navbar from "../components/Navbar"
import cart from "../assets/shopping-cart.png"
import { useNavigate } from "react-router"

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <div className="flex w-full h8-minus-navbar p-4">
        <div className="flex-1 h-full">
          <button
            onClick={() => navigate("/marketplace")}
            className="hover:bg-[#EE466E] text-white w-[320px] py-3 px-3 text-left rounded-lg"
          >
            <img
              src={cart}
              alt="shopping cart"
              className="w-6 inline-block mr-2"
            />
            Marketplace
          </button>
        </div>
        <div className="w-[700px] h-full">
          <div className="h-[300px] bg-[#EE466E] rounded-lg flex justify-center items-center">
            <h1 className="text-4xl text-white p-4">
              {"<-"} Visit Marketplace
            </h1>
          </div>
        </div>
        <div className="flex-1 h-full"></div>
      </div>
    </div>
  )
}
export default Home
