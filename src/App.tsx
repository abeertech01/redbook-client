import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Profile from "./pages/Profile"
import Chat from "./pages/Chat"
import Inbox from "./pages/Inbox"
import Login from "./pages/Login"

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
