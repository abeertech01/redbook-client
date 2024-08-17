import React, { useState } from "react"
import emptyBox from "../assets/icons/empty-box.png"
import checkedBox from "../assets/icons/checked-box.png"

type ProductCardProps = {}

const ProductCard: React.FC<ProductCardProps> = () => {
  const [isAdded, setIsAdded] = useState(false)

  return (
    <div className="group relative w-full rounded-lg overflow-hidden shadow-lg shadow-zinc-500/45 aspect-video">
      <figure className="h-full">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/hoka-zinal-13085-1643565794.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*"
          alt="Shoes"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="absolute bottom-0 top-0 w-full h-full bg-gradient-to-t from-[#131313e2] to-[#04040486] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 text-white">
        <div className="mb-2 flex items-start justify-between">
          <h1 className="w-7/12 leading-snug line-clamp-2 text-ellipsis text-lg font-medium">
            Lorem isum dlor si amet consectetur adipisicing elit.
          </h1>
          <div className="flex items-center gap-2">
            <div className="text-[12px] bg-[#EE4560] font-light px-3 leading-normal ml-2 rounded-full">
              Used!
            </div>
            <button
              onClick={() => setIsAdded((prev) => !prev)}
              className="inline-block"
            >
              {isAdded ? (
                <img src={checkedBox} alt="empty box" className="w-6" />
              ) : (
                <img src={emptyBox} alt="checked box" className="w-6" />
              )}
            </button>
          </div>
        </div>
        <p className="line-clamp-2 text-ellipsis text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          dolores illo. Sequi accusamus vel nemo, saepe sapiente dolorem quis
          adipisci hic deleniti commodi iure magnam facere, temporibus iste
          cumque veniam?
        </p>
        <div className="absolute w-[calc(100%-3rem)] bottom-6 flex gap-x-3 items-center">
          <div className="flex-1">
            <span className="float-left font-semibold text-xl">$100</span>
          </div>
          <div className="flex-1">
            <button className="bg-[#EE4560] text-sm px-4 py-1 font-semibold rounded-lg float-right">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductCard
