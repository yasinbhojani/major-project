import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Chats from "./pages/Chats/Chats";
import Profile from "./pages/Profile/Profile";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound/NotFound";

import AuthRoot from "./pages/Auth/AuthRoot";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import FileUpload from "./components/UI/FileUpload/FileUpload";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "/news", element: <News /> },
        { path: "/chats", element: <Chats /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthRoot />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
