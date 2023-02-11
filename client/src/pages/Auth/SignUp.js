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

  const [enteredOTP, setEnteredOTP] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const register = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        body: JSON.stringify({
          username: nameInput,
          email: emailInput,
          password: passInput,
          otp: enteredOTP,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onVerificationFormSubmitHandler = async (event) => {
    event.preventDefault();

    console.log("Name : " + nameInput);
    console.log("Email : " + emailInput);
    console.log("Password : " + passInput);
    console.log("Confirm Password : " + confPassInput);
    console.log("OTP : " + enteredOTP);

    // fetch('http://localhost:8080/api/auth/otp');

    register();
  };

  const onVerifyRequestHandler = async () => {
    console.log("Name:" + nameInput);
    console.log("Email:" + emailInput);
    fetch("http://localhost:8080/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({
        name: nameInput,
        email: emailInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("mail sent");
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
            <img src={backarrow} alt="" />
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
            onVerifyRequestHandler={onVerifyRequestHandler}
          />
        )}
        {currentPage === 3 && (
          <OTPVerification
            setOtp={setEnteredOTP}
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
