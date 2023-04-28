import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const ChangePassword = (props) => {
  console.log("component reload");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const passwordIsMatched = newPassword === confNewPassword;

  // Minimum eight characters, at least one letter and one number:
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;

  const oldPasswordChangeHandler = (e) => {
    setOldPassword(e.target.value);
  };

  const newPasswordChangeHandler = (e) => {
    const isValid = regex.test(e.target.value.trim());
    if (!isValid) {
      setIsError(true);
      setMessage(
        "New passoword must atleast contain, eight characters, one letter and one number"
      );
    } else {
      setIsError(false);
      setMessage("");
    }

    setNewPassword(e.target.value);
    setIsButtonDisabled(!passwordIsMatched || isError);
  };

  const confNewPasswordChangeHandler = (e) => {
    setConfNewPassword(e.target.value);
    setIsButtonDisabled(!passwordIsMatched || isError);
  };

  return (
    <form className={styles.passwordcontainer}>
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
