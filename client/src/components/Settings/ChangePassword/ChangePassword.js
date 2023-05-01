import React, { useRef, useState } from "react";
import styles from "./ChangePassword.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";

const ChangePassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const timeoutId = useRef(null);
  const redirect = useNavigate();

  // Minimum eight characters, at least one letter and one number:
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;

  const passwordChangeFormSubmitHandler = (e) => {
    e.preventDefault();
    setIsError(false);
    setIsButtonDisabled(true);

    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/profile/changepassword", {
      method: "POST",
      body: JSON.stringify({
        oldPassword: oldPassword.trim(),
        newPassword: confNewPassword.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          setIsButtonDisabled(true);
          setIsError(true);
          throw new Error(data.message);
        }

        setOldPassword("");
        setNewPassword("");
        setConfNewPassword("");

        window.confirm(data.message);
        redirect("/");
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const oldPasswordChangeHandler = (e) => {
    setOldPassword(e.target.value);
  };

  const newPasswordChangeHandler = (e) => {
    setNewPassword(e.target.value);

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      const isValid = regex.test(e.target.value.trim());
      if (!isValid) {
        setIsError(true);
        setMessage(
          "New passoword must atleast contain, eight characters, one letter and one number"
        );
        setIsButtonDisabled(true);
      } else {
        setIsError(false);
        setMessage("");

        if (
          e.target.value.trim() !== "" &&
          confNewPassword !== "" &&
          e.target.value.trim() === confNewPassword.trim()
        ) {
          setIsButtonDisabled(false);
        }
      }
    }, 500);
  };

  const confNewPasswordChangeHandler = (e) => {
    setConfNewPassword(e.target.value);
    const passwordIsMatched = newPassword === e.target.value.trim();

    if (!passwordIsMatched || e.target.value.trim().length < 8) {
      setIsError(true);
      setMessage("Passwords don't match");
      setIsButtonDisabled(true);
    } else {
      setIsError(false);
      setMessage("");
      setIsButtonDisabled(false);
    }
  };

  return (
    <form
      className={styles.passwordcontainer}
      onSubmit={passwordChangeFormSubmitHandler}
    >
      <Input
        type="password"
        label="Enter your old password"
        value={oldPassword}
        onChange={oldPasswordChangeHandler}
      />
      <div className={styles.placeholder}></div>
      <Input
        type="password"
        label="Enter your new password"
        value={newPassword}
        onChange={newPasswordChangeHandler}
      />
      <Input
        type="password"
        label="Confirm your new password"
        value={confNewPassword}
        onChange={confNewPasswordChangeHandler}
      />
      {isError && <p className={styles.message}>{message}</p>}
      <Button text="Confirm" type="submit" disabled={isButtonDisabled} />
    </form>
  );
};
export default ChangePassword;
