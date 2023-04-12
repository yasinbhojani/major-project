import { Outlet } from "react-router-dom";
import DNavBar from "../components/Dashboard/NavBar/DNavBar";

const DashboardRoot = () => {
  return (
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
  );
};
export default DashboardRoot;
