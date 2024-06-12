import React, { FormEvent, useEffect, useState } from "react"
import paperplane from "../assets/paperplane.png"
import { useGetMessagesQuery } from "../app/api/api"
import { useLocation } from "react-router"
import { getSocket } from "../socket"
import { NEW_MESSAGE } from "../constants/events"
import { useSocketEvents } from "../hooks/hook"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { InboxMessage } from "../utils/types"

type InboxProps = {}

const Inbox: React.FC<InboxProps> = () => {
  const { pathname } = useLocation()
  const [message, setMessage] = useState("")
  const socket = getSocket()
  const { user } = useSelector((state: RootState) => state.auth)

  const chatId = pathname.match(/\/chat\/(.*)/)![1]

  const { data, isError, isLoading, refetch } = useGetMessagesQuery(chatId)

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //Emitting the message to the server
    socket?.emit(NEW_MESSAGE, {
      chatId,
      message,
    })

    setMessage("")
  }

  useEffect(() => {
    refetch()
  }, [])

  const eventHandler = {
    [NEW_MESSAGE]: (_: unknown) => refetch(),
  }

  useSocketEvents(socket!, eventHandler)

  return (
    <>
      <div className="flex-1 flex items-end p-4">
        {!isLoading && (
          <ul className="w-full flex flex-col gap-3">
            {data?.messages &&
              (data.messages.length as number) !== 0 &&
              data.messages.map((msg: InboxMessage) => (
                <li key={msg.id}>
                  <div
                    className={clsx(
                      "message-style",
                      msg.authorId === user?.id
                        ? "float-right !bg-red-500 !text-white"
                        : ""
                    )}
                  >
                    {msg.text}
                  </div>
                </li>
              ))}
            {/* <li>
            <div className="message-style">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
              reiciendis!
            </div>
          </li>
          <li>
            <div className="message-style float-right !bg-red-500 !text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
              reiciendis!
            </div>
          </li>
          <li>
            <div className="message-style">Lorem ipsum dolor</div>
          </li> */}
          </ul>
        )}
      </div>
      <form
        onSubmit={sendMessage}
        className="h-[80px] bg-slate-950 px-4 py-2 flex items-center gap-4"
      >
        <input
          type="text"
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input input-bordered input-primary w-full flex-1"
        />
        <button type="submit" className="btn btn-primary">
          <img src={paperplane} alt="Send" className="w-6 h-6" />
        </button>
      </form>
    </>
  )
}
export default Inbox
