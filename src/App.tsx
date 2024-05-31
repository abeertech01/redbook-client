import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { userDoesntExist, userExists } from "./app/reducers/auth"
import { AppDispatch, RootState } from "./app/store"
import LayoutLoader from "./components/LayoutLoader"
import ProtectedRoute from "./components/ProtectedRoute"
import Chat from "./pages/Chat"
import Home from "./pages/Home"
import Inbox from "./pages/Inbox"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import { User } from "./utils/types"

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, loader } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/v1/user/profile`, {
        withCredentials: true,
      })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((_) => dispatch(userDoesntExist()))
  }, [dispatch])

  return loader ? (
    <div className="w-screen h-screen centering">
      <LayoutLoader />
    </div>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute user={user as User} />}>
          <Route path="/" element={<Home />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:chatId" element={<Inbox />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
