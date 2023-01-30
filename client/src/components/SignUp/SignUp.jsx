import React, { useState } from "react";import styles from "../Login/Login.module.css";

import minipc from "../../assets/minipc.png";
import BrandName from "../Login/BrandName";


const SignUp = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [passInput, setPassInput] = useState("");
  const [confPassInput, setConfPassInput] = useState("");

  const [otp, setOtp] = useState("");

  const onVerificationFormSubmitHandler = (event) => {
    event.preventDefault();
    console.log(nameInput);
    console.log(emailInput);
    console.log(passInput);
    console.log(confPassInput);
    console.log(otp);
  };

  return (
    <main className={styles.maindiv}>
      <section className={styles["side-image"]}>
        <img src={minipc} className={styles.image} alt="side banner" />
      </section>

      <section className={`${styles.login} container`}>
        <BrandName />
        <h2>Sign Up</h2>
        <p>Create Your Free Account Now !</p>
        {/* {currentPage === 1 && (
          <Signup1
            setCurrentPage={setCurrentPage}
            setNameInput={setNameInput}
            setEmailInput={setEmailInput}
          />
        )}
        {currentPage === 2 && (
          <Signup2
            passInput={passInput}
            setPassInput={setPassInput}
            setConfPassInput={setConfPassInput}   
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 3 && (
          <Signup3
            setOtp={setOtp}
            onVerificationFormSubmitHandler={onVerificationFormSubmitHandler}
          />
        )} */}
        <footer className={styles.footer}>
          <p>
            Already have an account?{" "}
            <a href="https://github.com/yasinbhojani/major-project">Log In</a>
          </p>
          <p>{currentPage === 1 && "1 of 3"}</p>
          <p>{currentPage === 2 && "2 of 3"}</p>
          <p>{currentPage === 3 && "3 of 3"}</p>
        </footer>
      </section>
    </main>
  );
};

export default SignUp;
