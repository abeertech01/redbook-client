import React, { useEffect } from "react"
import { useGetProfileQuery } from "../app/api/api"
import Navbar from "../components/Navbar"

type ProfileProps = {}

const Profile: React.FC<ProfileProps> = () => {
  const { data, isLoading, isError, refetch } = useGetProfileQuery()

  useEffect(() => {
    refetch()
  }, [])

  return (
    <div>
      <Navbar />
      <h1>Profile</h1>
      <p>
        name: {data?.user?.name} <br />
        username: {data?.user?.username} <br />
        email: {data?.user?.email} <br />
      </p>
    </div>
  )
}
export default Profile
