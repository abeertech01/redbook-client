import { useSelector } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { useGetProfileQuery } from "./app/api/api"
import { RootState } from "./app/store"
import Chat from "./pages/Chat"
import Home from "./pages/Home"
import Inbox from "./pages/Inbox"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Profile from "./pages/Profile"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/:username",
    element: <Profile />,
    errorElement: <NotFound />,
  },
  {
    path: "/chat",
    element: <Chat />,
    errorElement: <NotFound />,
    children: [
      {
        path: ":chatId",
        element: <Inbox />,
        errorElement: <NotFound />,
      },
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
