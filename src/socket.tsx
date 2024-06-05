import React, { createContext, useContext, useMemo } from "react"
import { Socket, io } from "socket.io-client"

type SocketProviderProps = {
  children: React.ReactNode
}

const SocketContext = createContext<Socket | null>(null)

const getSocket = () => useContext(SocketContext)

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_SERVER, {
        withCredentials: true,
      }),
    []
  )

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export { SocketProvider, getSocket }
