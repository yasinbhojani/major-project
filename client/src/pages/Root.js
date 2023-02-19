import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/auth/login");
    }
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
