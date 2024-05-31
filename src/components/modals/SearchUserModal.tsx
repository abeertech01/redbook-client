import React from "react"
import { useSearchUsersQuery } from "../../app/api/api"
import LayoutLoader from "../LayoutLoader"

type SearchUserModalProps = {
  name: string
}

const SearchUserModal: React.FC<SearchUserModalProps> = ({ name }) => {
  const { data, isLoading } = useSearchUsersQuery(name)

  return isLoading ? (
    <div className="w-full h-full min-h-[3rem] centering">
      <LayoutLoader />
    </div>
  ) : (
    <div className="absolute top-[105%] left-0 right-0 w-full shadow-lg p-2 rounded-lg bg-red-400 text-white">
      <ul className="flex flex-col gap-2">
        {data?.users?.map((user) => (
          <li
            key={user.id}
            className="flex gap-2 items-center p-2 bg-red-500 rounded-md"
          >
            <div className="w-12 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F024%2F183%2F502%2Fnon_2x%2Fmale-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg&f=1&nofb=1&ipt=4a1ff16d454684097e36264e34ac945a012cf952721b445349c010a173cc1857&ipo=images"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-[1.2rem]">
                {user.name} @{user.username}
              </h1>
            </div>
          </li>
        ))}
      </ul>
      {(data?.users?.length ?? 0) === 0 && (
        <>
          <hr className="my-2" />
          <p className="text-[1.2rem]">0 results</p>
        </>
      )}
    </div>
  )
}

export default SearchUserModal
