import React from "react"
import { User } from "../utils/types"
import { Navigate, Outlet } from "react-router"

type ProtectedRouteProps = {
  children?: React.ReactNode
  user: User
  redirect?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  user,
  redirect = "/login",
}) => {
  if (!user) return <Navigate to={redirect} />

  return children ? children : <Outlet />
}
export default ProtectedRoute
