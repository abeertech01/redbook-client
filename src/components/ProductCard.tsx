import React from "react"

type ProductCardProps = {}

const ProductCard: React.FC<ProductCardProps> = () => {
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
        <h1 className="text-xl font-medium mb-2">
          Shoes
          <span className="text-[12px] bg-[#EE4560] font-light px-3 inline-block leading-normal ml-2 rounded-full">
            Used!
          </span>
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="absolute w-[calc(100%-3rem)] bottom-6 flex gap-x-3 items-center">
          <div className="flex-1">
            <span className="float-left font-semibold text-xl">$100</span>
          </div>
          <div className="flex-1">
            <button className="bg-[#EE4560] px-6 py-2 font-semibold rounded-lg float-right">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductCard
