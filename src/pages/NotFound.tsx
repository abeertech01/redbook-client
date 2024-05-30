import React from "react"
import { Link } from "react-router-dom"

type NotFoundProps = {}

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div className="flex flex-col gap-2">
      404 Not Found
      <Link to={"/"}>Home from Link</Link>
      <a href="/">Home from A</a>
    </div>
  )
}
export default NotFound
