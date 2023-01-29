import React from "react";
import Input from "../UI/Input/Input";

import styles from "./Login.module.css";
import btnstyles from "../../css/button.module.css";

import macintosh from "../../assets/macintosh.jpg";
import logo from "../../assets/shell-logo.png";

const Login = (props) => {
  return (
    <main className={styles.maindiv}>
      <section className={styles["side-image"]}>
        <img src={macintosh} className={styles.image} alt="side banner" />
      </section>

      <section className={`${styles.login} container`}>
        <div className={styles.head}>
          <img
            src={logo}
            style={{ width: "50px", height: "50px" }}
            alt="logo"
          />
          <h1>Shell</h1>
        </div>
        <h2>Log In</h2>
        <p>Enter you Email and Password to Login on Shell</p>
        <form>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your Email"
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your Password"
          />
          <button
            type="submit"
            className={`${btnstyles.btn} ${btnstyles.login}`}
          >
            LOG IN
          </button>
        </form>
        <footer className={styles.footer}>
          <p>
            Dont have an account?{" "}
            <a href="https://github.com/yasinbhojani/major-project">Sign Up</a>
          </p>
          <p>
            <a href="https://github.com/yasinbhojani/major-project">
              Forgot Password?
            </a>
          </p>
        </footer>
      </section>
    </main>
  );
};

export default Login;
