import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NameAndEmailInput from "../../components/Auth/SignUp/NameAndEmailInput";
import PasswordInput from "../../components/Auth/SignUp/PasswordInput";
import OTPVerification from "../../components/Auth/SignUp/OTPVerification";

import minipc from "../../assets/minipc.png";
import WellcomeText from "../../components/Auth/WellcomeText";
import SideBanner from "../../components/Auth/SideBanner";
import backarrow from "../../assets/arrow_back.svg";

import styles from "../../components/Auth/Login/Login.module.css";

const SignUp = (props) => {
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [confPassInput, setConfPassInput] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const onVerifyRequestHandler = async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/otp/send`, {
        method: "POST",
        body: JSON.stringify({
          name: nameInput,
          email: emailInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await data.json();

      if (!response.ok) {
        throw new Error(response.message);
      }

      setMessage(response.message);
    } catch (e) {
      setIsError(true);
      setMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerificationFormSubmitHandler = async (event) => {
    event.preventDefault();

    setIsError(false);
    setIsLoading(true);
    try {
      const data = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/register`, {
        body: JSON.stringify({
          name: nameInput,
          email: emailInput,
          password: passInput,
          otp: enteredOTP,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await data.json();

      if (response.ok === false) {
        throw new Error(response.message);
      }

      localStorage.setItem("username", response.payload.username);
      localStorage.setItem("is_admin", response.payload.is_admin);
      localStorage.setItem("accessToken", response.payload.accessToken);

      setMessage("Registration Successful You will be redirected shortly");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (e) {
      setIsError(true);
      setMessage(e.message);
    } finally {
      setIsLoading(false);
    }
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
            setIsLoading={setIsLoading}
            setIsError={setIsError}
            setMessage={setMessage}
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
            setIsError={setIsError}
            setMessage={setMessage}
          />
        )}
        {currentPage === 3 && (
          <OTPVerification
            setOtp={setEnteredOTP}
            onVerificationFormSubmitHandler={onVerificationFormSubmitHandler}
          />
        )}
        <section>
          {!isLoading && isError ? (
            <p style={{ color: "red" }}>{message}</p>
          ) : (
            <p style={{ fontWeight: "bold" }}>{message}</p>
          )}
        </section>
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
