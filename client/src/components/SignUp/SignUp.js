import React, { useState } from "react";

import styles from "../Login/Login.module.css";

import minipc from "../../assets/minipc.png";
import logo from "../../assets/shell-logo.png";

import Signup1 from "./Signup1";
import Signup2 from "./Signup2";
const SignUp = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [currentPage, setCurrentPage] = useState(true);

  const [passInput, setPassInput] = useState("");
  const [confPassInput, setConfPassInput] = useState("");

  const nextPage = () => setCurrentPage(false);
  const passwordFormSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Name : " + nameInput);
    console.log("Email : " + emailInput);
    console.log("Password : " + passInput);
    console.log("Confirem Password : " + confPassInput);
  };
  return (
    <main className={styles.maindiv}>
      <section className={styles["side-image"]}>
        <img src={minipc} className={styles.image} alt="side banner" />
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
        <h2>Sign Up</h2>
        <p>Create Your Free Account Now !</p>
        {currentPage ? (
          <Signup1
            nextPage={nextPage}
            setNameInput={setNameInput}
            setEmailInput={setEmailInput}
          />
        ) : (
          <Signup2
            passInput={passInput}
            setPassInput={setPassInput}
            setConfPassInput={setConfPassInput}
            passwordFormSubmitHandler={passwordFormSubmitHandler}
          />
        )}
        <footer className={styles.footer}>
          <p>
            Already have an account?{" "}
            <a href="https://github.com/yasinbhojani/major-project">Log In</a>
          </p>
          <p>{currentPage ? 1 : 2} of 2</p>
        </footer>
      </section>
    </main>
  );
};

export default SignUp;
