import React, { ChangeEvent, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useGetChatsQuery } from "../app/api/api"
import SearchUserModal from "../components/modals/SearchUserModal"
import { useDebounce } from "@uidotdev/usehooks"
import LayoutLoader from "../components/LayoutLoader"
import { useSocketEvents } from "../hooks/hook"
import { NEW_CHAT } from "../constants/events"
import { getSocket } from "../socket"
import { Outlet, useLocation, useNavigate } from "react-router"

type ChatProps = {}

const Chat: React.FC<ChatProps> = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [userName, setUserName] = useState<string>("")
  const [isInboxPage, setIsInboxPage] = useState(false)
  const [inboxChatId, setInboxChatId] = useState("")
  const deferredNameQuery = useDebounce(userName, 500)
  const { data, isError: _, isLoading, refetch } = useGetChatsQuery()
  const socket = getSocket()

  const inputUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const selectConversation = (chatId: string) => {
    setInboxChatId(chatId)
    navigate(`/chat/${chatId}`)
  }

  const closeSearchUserModal = () => {
    setUserName("")
  }

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (pathname !== "/chat") {
      setIsInboxPage(true)
    } else {
      setIsInboxPage(false)
    }
  }, [pathname, inboxChatId])

  const eventHandler = {
    [NEW_CHAT]: (_: string) => refetch(),
  }

  useSocketEvents(socket!, eventHandler)

  return (
    <div>
      <Navbar />
      <div className="flex h8-minus-navbar">
        <div className="w-[25%] bg-[#171c22]">
          <div className="relative m-4">
            <label className="relative input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                onChange={inputUserName}
                value={userName}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            {deferredNameQuery && (
              <SearchUserModal
                name={deferredNameQuery}
                closeSearchUserModal={closeSearchUserModal}
              />
            )}
          </div>

          {/* All the chats */}
          {isLoading ? (
            <div className="w-full h-full">
              <LayoutLoader />
            </div>
          ) : (
            <ul className="w-full flex flex-col">
              {/* Chats */}
              {data?.chats.map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => selectConversation(chat.id)}
                  className="grid grid-cols-[3rem_auto] gap-x-4 p-2 mx-4 items-center hover:bg-[#252d37] hover:cursor-pointer [&:not(:first-child)]:mt-4 rounded-md"
                >
                  <div className="w-12 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F024%2F183%2F502%2Fnon_2x%2Fmale-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg&f=1&nofb=1&ipt=4a1ff16d454684097e36264e34ac945a012cf952721b445349c010a173cc1857&ipo=images"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h1>
                      {chat?.members[chat.theOtherUserIndex]?.name} @
                      {chat?.members[chat.theOtherUserIndex]?.username}
                    </h1>
                    <div className="w-[60%] text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Laboriosam atque esse nam accusamus minima. Nemo!
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Message section */}
        <div className="w-[50%] h-[calc(100vh-66px)] flex flex-col">
          <div className="w-full h-full text-2xl font-medium flex justify-center items-center">
            {!isInboxPage && (
              <h1 className="text-center">
                Start A<br />
                Conversation
              </h1>
            )}
          </div>
          <Outlet />
        </div>
        <div className="w-[25%] bg-[#171c22]"></div>
      </div>
    </div>
  )
}

export default Chat
