import { useState } from "react";

import Input from "../../UI/Input/Input";
import btnstyles from "../../../css/button.module.css";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

const LoginForm = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const LoginFormSubmitHandler = async (event) => {
    event.preventDefault();

    setIsError(false);
    setIsLoading(true);

    try {
      const data = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
          }),
        }
      );

      const response = await data.json();

      if (response.ok === false) {
        throw new Error(response.message);
      }

      localStorage.setItem("username", response.payload.username);
      localStorage.setItem("is_admin", response.payload.is_admin);
      localStorage.setItem("accessToken", response.payload.accessToken);
      localStorage.setItem("notifications", "true");

      setMessage("Login Successful, You will be redirected shortly");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const emailChangeHandler = (event) => setEmailInput(event.target.value);
  const passwordChangeHandler = (event) => setPasswordInput(event.target.value);

  return (
    <>
      <form onSubmit={LoginFormSubmitHandler} className={styles.LoginForm}>
        <Input
          id="email"
          value={emailInput}
          type="email"
          label="Email"
          placeholder="Enter your Email"
          onChange={emailChangeHandler}
        />
        <Input
          id="password"
          value={passwordInput}
          type="password"
          label="Password"
          placeholder="Enter your Password"
          onChange={passwordChangeHandler}
        />
        <button
          type="submit"
          className={`${btnstyles.btn} ${btnstyles.login}`}
          disabled={isLoading}
        >
          LOG IN
        </button>
        <section>
          {!isLoading && isError ? (
            <p style={{ color: "red" }}>{message}</p>
          ) : (
            <p style={{ fontWeight: "bold" }}>{message}</p>
          )}
        </section>
      </form>
    </>
  );
};
export default LoginForm;
