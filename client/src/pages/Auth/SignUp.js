import React, { useState } from "react";
import { Link } from "react-router-dom";

import NameAndEmailInput from "../../components/Auth/SignUp/NameAndEmailInput";
import PasswordInput from "../../components/Auth/SignUp/PasswordInput";
import OTPVerification from "../../components/Auth/SignUp/OTPVerification";

import minipc from "../../assets/minipc.png";
import WellcomeText from "../../components/Auth/WellcomeText";
import SideBanner from "../../components/Auth/SideBanner";
import backarrow from "../../assets/arrow_back.svg";

import styles from "../../components/Auth/Login/Login.module.css";

const SignUp = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const [passInput, setPassInput] = useState("");
  const [confPassInput, setConfPassInput] = useState("");

  const [otp, setOtp] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const onVerificationFormSubmitHandler = async (event) => {
    event.preventDefault();

    console.log("Name : " + nameInput);
    console.log("Email : " + emailInput);
    console.log("Password : " + passInput);
    console.log("Confirm Password : " + confPassInput);
    console.log("OTP : " + otp);

    fetch('http://localhost:8080/api/register', {
      body: JSON.stringify({
        username: nameInput,
        email: emailInput,
        password: passInput,
      })
    })
  };

  return (
    <main className={styles.maindiv}>
      <SideBanner src={minipc} />
      <section className={`${styles.login} container`}>
        {currentPage !== 1 && (
          <p
            onClick={() => {
              setCurrentPage((prevpage) => prevpage - 1);
            }}
            className={styles.back}
          >
            <img src={backarrow} />
          </p>
        )}
        <WellcomeText />
        <h2>Sign Up</h2>
        <p>Create Your Free Account Now !</p>
        {currentPage === 1 && (
          <NameAndEmailInput
            setCurrentPage={setCurrentPage}
            setNameInput={setNameInput}
            setEmailInput={setEmailInput}
            nameInput={nameInput}
            emailInput={emailInput}
          />
        )}
        {currentPage === 2 && (
          <PasswordInput
            setPassInput={setPassInput}
            setConfPassInput={setConfPassInput}
            setCurrentPage={setCurrentPage}
            passInput={passInput}
            confPassInput={confPassInput}
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
            Already have an account? <Link to="/auth/login">Log In</Link>
          </p>
          <p>{currentPage} of 3</p>
        </footer>
      </section>
    </main>
  );
};

export default SignUp;
