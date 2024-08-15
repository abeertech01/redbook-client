import React from "react"
import Navbar from "./Navbar"

type AdDetailsProps = {}

const AdDetails: React.FC<AdDetailsProps> = () => {
  return (
    <div>
      <Navbar />
      <div className="_3cols">
        <div className="flex-1"></div>
        <div className="mid-col">
          <h1 className="text-3xl font-semibold text-center py-5">
            Lorem ipsum dolor sit.
          </h1>
          <div className="pic-info flex gap-4">
            <div className="h-full flex-1 flex flex-col gap-2">
              <figure className="overflow-hidden shadow-lg shadow-zinc-500/45 aspect-video">
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/hoka-zinal-13085-1643565794.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*"
                  alt="Shoes"
                  className="w-full h-full object-cover"
                />
              </figure>
              <figure className="overflow-hidden shadow-lg shadow-zinc-500/45 aspect-video">
                <img
                  src="https://runningnw.com/wp-content/uploads/2018/01/Brooks_Glycerin_15_2-1160x870.jpg"
                  alt="Shoes"
                  className="w-full h-full object-cover"
                />
              </figure>
            </div>
            <div className="flex-1">
              <p className="text-normal font-normal">
                <strong>Description:</strong> Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Dolorum dolorem accusamus minima
                est quam praesentium, unde delectus! Nam necessitatibus sint
                repudiandae. Numquam illo optio animi eos quod ipsum pariatur a
                amet, provident illum hic asperiores itaque ad ducimus dolore
                non placeat molestias ratione deleniti est libero recusandae
                ipsa, unde reprehenderit. vel.
              </p>
              <div className="mt-2">
                <span className="font-semibold">Condition:</span> Used
              </div>
              <div className="mt-2">
                <span className="font-semibold">Price:</span> $100
              </div>
              <div className="mt-2">
                <button className="btn btn-error">Buy</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  )
}
export default AdDetails
