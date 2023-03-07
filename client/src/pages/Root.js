import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

import { io } from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_API_ENDPOINT);

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/about");
    }

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
    </section>
  );
};

export default Root;
