import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import DNavBar from "../dashboard/components/NavBar/DNavBar";
import jwt_decode from "jwt-decode";

import { io } from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_API_ENDPOINT);

const Root = (props) => {
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
      {props.Nav === "admin" ? <DNavBar /> : <NavBar />}
      <Outlet />
    </section>
  );
};

export default Root;
