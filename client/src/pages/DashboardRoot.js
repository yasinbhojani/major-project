import { Outlet } from "react-router-dom";
import DNavBar from "../components/Dashboard/NavBar/DNavBar";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardRoot = () => {
  const redirect = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/isadmin`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.ok) {
            throw new Error(data.message);
          }
          if (!data.is_admin) {
            throw new Error("You are not authorized to access this page");
          } else if (data.is_admin === true) {
            setIsAdmin(true);
          }
        })
        .catch((err) => {
          alert(err.message);
          redirect("/");
        });
    } else {
      redirect("/");
    }
  }, [redirect]);

  return (
    isAdmin && (
      <section>
        <DNavBar />
        <section style={{ display: "flex" }}>
          <div
            style={{
              minWidth: "260px",
              height: "100vh",
            }}
          ></div>
          <Outlet />
        </section>
      </section>
    )
  );
};
export default DashboardRoot;
