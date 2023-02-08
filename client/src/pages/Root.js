import React from "react";

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const Root = () => {
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
