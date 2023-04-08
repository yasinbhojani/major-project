import { Outlet } from "react-router-dom";
import DNavBar from "../components/Dashboard/NavBar/DNavBar";

const DashboardRoot = () => {
  return (
    <section>
      <DNavBar />
      <Outlet />
    </section>
  );
};
export default DashboardRoot;
