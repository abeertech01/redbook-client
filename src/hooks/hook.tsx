import { useEffect } from "react"
import { Socket } from "socket.io-client"
import { SocketEventHandler } from "../utils/types"

const useSocketEvents = (socket: Socket, handlers: SocketEventHandler) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler)
    })

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler)
      })
    }
  }, [socket, handlers])
}

export { useSocketEvents }
