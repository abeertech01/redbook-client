import React from "react"

type LayoutLoaderProps = {}

const LayoutLoader: React.FC<LayoutLoaderProps> = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <span className="loading loading-spinner text-error"></span>
    </div>
  )
}
export default LayoutLoader
