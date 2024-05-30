import React from "react"
import Navbar from "../components/Navbar"

type ChatProps = {}

const Chat: React.FC<ChatProps> = () => {
  return (
    <div>
      <Navbar />
      <h1>Chat</h1>
    </div>
  )
}
export default Chat
