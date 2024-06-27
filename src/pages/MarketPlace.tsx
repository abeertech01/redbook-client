import React from "react"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"

type MarketPlaceProps = {}

const MarketPlace: React.FC<MarketPlaceProps> = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full h8-minus-navbar p-4">
        <div className="flex-1 w-full"></div>
        <div className="w-[700px] h-full">
          <h1 className="mp-text-gradient text-3xl font-bold text-center mb-4">
            RedBook Marketplace
          </h1>
          <div className="w-full grid grid-cols-[auto_auto] gap-6 pb-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <ProductCard key={item} />
            ))}
          </div>
        </div>
        <div className="flex-1 h-full"></div>
      </div>
    </div>
  )
}
export default MarketPlace
