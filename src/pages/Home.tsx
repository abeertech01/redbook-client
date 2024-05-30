import React from "react"
import Navbar from "../components/Navbar"

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <Navbar />
      Home Page
    </div>
  )
}
export default Home
