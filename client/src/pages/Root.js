import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import jwt_decode from "jwt-decode";

import { io } from "socket.io-client";
import SideBar from "./SideBar";
const socket = io.connect(process.env.REACT_APP_API_ENDPOINT);

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/about");
    }

    token = jwt_decode(token);
    socket.emit("online", { userId: token.user_id });
  }, [navigate]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <NavBar />
      <Outlet />
      <SideBar />
    </section>
  );
};

export default Root;
