import React, { useState } from "react";
import styles from "../Login/Login.module.css";

import minipc from "../../../assets/minipc.png";
import WellcomeText from "../WellcomeText";
import SideBanner from "../SideBanner";

import NameAndEmailInput from "./NameAndEmailInput";
import PasswordInput from "./PasswordInput";
import OTPVerification from "./OTPVerification";

const SignUp = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const [passInput, setPassInput] = useState("");
  const [confPassInput, setConfPassInput] = useState("");

  const [otp, setOtp] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const onVerificationFormSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Name : " + nameInput);
    console.log("Email : " + emailInput);
    console.log("Password : " + passInput);
    console.log("Confirm Password : " + confPassInput);
    console.log("OTP : " + otp);
  };

  return (
    <main className={styles.maindiv}>
      <SideBanner src={minipc} />
      <section className={`${styles.login} container`}>
        <WellcomeText />
        <h2>Sign Up</h2>
        <p>Create Your Free Account Now !</p>
        {currentPage === 1 && (
          <NameAndEmailInput
            setCurrentPage={setCurrentPage}
            setNameInput={setNameInput}
            setEmailInput={setEmailInput}
          />
        )}
        {currentPage === 2 && (
          <PasswordInput
            passInput={passInput}
            setPassInput={setPassInput}
            setConfPassInput={setConfPassInput}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 3 && (
          <OTPVerification
            setOtp={setOtp}
            onVerificationFormSubmitHandler={onVerificationFormSubmitHandler}
          />
        )}
        <footer className={styles.footer}>
          <p>
            Already have an account?
            <a href="https://github.com/yasinbhojani/major-project">Log In</a>
          </p>
          <p>{currentPage} of 3</p>
        </footer>
      </section>
    </main>
  );
};

export default SignUp;
