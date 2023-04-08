import styles from "./DNavBar.module.css";

import logo from "../../../assets/shell-logo.png";
import DNavLinks from "./DNavLink";

import Chart from "../../components/NavBar/icons/Chart.svg";
import Database from "../../components/NavBar/icons/Database.svg";
import Table from "../../components/NavBar/icons/Table.svg";

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const accessToDashboard = ["sohamganmote", "yasinbhojani333"];

const DNavBar = (props) => {
  const redirect = useNavigate();

  let decodedToken;

  if (localStorage.getItem("accessToken")) {
    decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  }

  useEffect(() => {
    if (!accessToDashboard.includes(decodedToken.user_id)) {
      redirect("/");
    }
  }, [decodedToken, redirect]);

  return (
    <nav className={styles.NavBar}>
      <div>
        <a href="/admin">
          <button className={styles.NavBarLogo}>
            <img src={logo} alt="logo" />
            <h3>Dashboard</h3>
          </button>
        </a>
        <DNavLinks path="/admin" iconSource={Chart} page="Analytics" />
        <DNavLinks
          path="/admin/Storage"
          iconSource={Database}
          page="Storage Bucket"
        />
        <DNavLinks path="/admin/Tables" iconSource={Table} page="Database" />
        <DNavLinks path="/admin/SQLW" page="SQL Workbench" />
      </div>
    </nav>
  );
};
export default DNavBar;
