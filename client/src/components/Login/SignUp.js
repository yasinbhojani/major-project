import React from "react";
import Input from "./Input/Input";

import styles from "./Login.module.css";
import btnstyles from "../../css/button.module.css";

import minipc from "../../assets/minipc.png";
import logo from "../../assets/shell-logo.png";

const SignUp = (props) => {
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
        <form>
          <Input
            id="name"
            type="name"
            label="Name"
            placeholder="Enter your Name"
          />
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
          <Input
            id="password"
            type="password"
            label="Confirm Password"
            placeholder="Re-Enter your Password"
          />
          <button
            type="submit"
            className={`${btnstyles.btn} ${btnstyles.login}`}
          >
            SIGN UP
          </button>
        </form>
        <footer className={styles.footer}>
          <p>
            Already have an account?{" "}
            <a href="https://github.com/yasinbhojani/major-project">Log In</a>
          </p>
        </footer>
      </section>
    </main>
  );
};

export default SignUp;
