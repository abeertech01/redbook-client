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
import TimeAgo from "javascript-time-ago"

type InboxProps = {}

const Inbox: React.FC<InboxProps> = () => {
  const { pathname } = useLocation()
  const [message, setMessage] = useState("")
  const socket = getSocket()
  const { user } = useSelector((state: RootState) => state.auth)
  const timeAgo = new TimeAgo("en-US")

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

  const timeDiff = (time: Date) => timeAgo.format(new Date(time))

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
                      "flex flex-col gap-1",
                      msg.authorId === user?.id ? "items-end" : "items-start"
                    )}
                  >
                    <span
                      className={clsx(
                        "rounded-lg text-base bg-amber-200 text-black px-4 py-2 max-w-[70%]",
                        msg.authorId === user?.id
                          ? "!bg-red-500 !text-white"
                          : ""
                      )}
                    >
                      {msg.text}
                    </span>
                    <small>{timeDiff(msg.createdAt)}</small>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
      <form
        onSubmit={sendMessage}
        className="h-[80px] bg-primary-content px-4 py-2 flex items-center gap-4"
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
