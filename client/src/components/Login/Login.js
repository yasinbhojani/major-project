import React, { useState } from "react";
import styles from "./Login.module.css";

import macintosh from "../../assets/macintosh.jpg";
import Login1 from "./Login1";
import BrandName from "./BrandName";
const Login = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const emailAndPasswordFormSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Email : " + emailInput);
    console.log("Password : " + passwordInput);
  };
  return (
    <main className={styles.maindiv}>
      <section className={styles["side-image"]}>
        <img src={macintosh} className={styles.image} alt="side banner" />
      </section>

      <section className={`${styles.login} container`}>
        <BrandName />
        <h2>Log In</h2>
        <p>Enter you Email and Password to Login on Shell</p>
        <Login1
          setEmailInput={setEmailInput}
          setPasswordInput={setPasswordInput}
          emailAndPasswordFormSubmitHandler={emailAndPasswordFormSubmitHandler}
        />
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
