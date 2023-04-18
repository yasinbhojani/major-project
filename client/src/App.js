/**
 * Welcome to Shell This Code was written and Maintained by @SohamGanmote & @yasinbhojani
 */

import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Chats from "./pages/Chats/Chats";
import Bookmark from "./pages/Bookmark/Bookmark";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import Career from "./pages/Career/Career";
import ExpandedPearl from "./pages/Pearl/ExpandedPearl";
import Settings from "./pages/Settings/Settings";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound/NotFound";

import AuthRoot from "./pages/Auth/AuthRoot";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";

import PrivateChats from "./components/Chats/PrivateChats";

import DashboardRoot from "./pages/DashboardRoot";

import Analytics from "./pages/Dashboard/Analytics/Analytics";
import Storage from "./pages/Dashboard/Storage/Storage";
import Tables from "./pages/Dashboard/Tables/Tables";
import SQLW from "./pages/Dashboard/SQLWorkbench/SQLW";

const App = () => {
  const router = createBrowserRouter([
    // Users Routes
    {
      path: "",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "/news", element: <News /> },
        { path: "/chats", element: <Chats /> },
        { path: "/bookmark", element: <Bookmark /> },
        { path: "/notification", element: <Notification /> },
        { path: "/profile/:user_id", element: <Profile /> },
        { path: "/profile/update/:user_id", element: <UpdateProfile /> },
        { path: "/settings", element: <Settings /> },
        { path: "/pearl/:post_id", element: <ExpandedPearl /> },

        // Some Extra Chats Routes
        {
          path: "/chats/private/:senderID/:reciverID",
          element: <PrivateChats />,
        },
      ],
    },

    // Login and SignUp Routes
    {
      path: "/auth",
      element: <AuthRoot />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
      ],
    },

    // Shell main pahe Route
    { path: "/about", element: <About /> },
    { path: "/career", element: <Career /> },

    // Admin Dashboard Routes
    {
      path: "/admin",
      element: <DashboardRoot />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Analytics /> },
        { path: "Storage", element: <Storage /> },
        { path: "Tables", element: <Tables /> },
        { path: "SQLW", element: <SQLW /> },
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
