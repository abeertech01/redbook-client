import React from "react"

type LayoutLoaderProps = {}

const LayoutLoader: React.FC<LayoutLoaderProps> = () => {
  return (
    <>
      <span className="loading loading-spinner text-error"></span>
    </>
  )
}
export default LayoutLoader
