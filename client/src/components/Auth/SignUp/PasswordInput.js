import Input from "../../UI/Input/Input";
import btnstyles from "../styles/button.module.css"
import { useRef, useState } from "react";

import styles from "../Login/Login.module.css";

const PasswordInput = (props) => {
  const [passwordIsMatched, setPasswordIsMatched] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const timeoutId = useRef();
  // Minimum eight characters, at least one letter and one number:
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;

  const passChangeHandler = (event) => {
    const isValid = regex.test(event.target.value.trim());
    if (!isValid) {
      props.setIsError(true);
      props.setMessage(
        "Passoword must atleast contain, eight characters, one letter and one number"
      );
    } else {
      props.setIsError(false);
      props.setMessage("");
    }
    props.setPassInput(event.target.value);
  };

  const setTouched = () => {
    setIsTouched(true);
  };

  const confPassChangeHandler = (event) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setTouched();
      props.setConfPassInput(props.passInput);

      const isValid = regex.test(event.target.value.trim());
      if (!isValid) {
        props.setIsError(true);
        props.setMessage("Invalid Format");
        return;
      } else {
        props.setIsError(false);
        props.setMessage("");
      }

      if (props.passInput === event.target.value) {
        setPasswordIsMatched(true);
      } else {
        setPasswordIsMatched(false);
      }
    }, 500);
  };

  const passwordFormSubmitHandler = (event) => {
    event.preventDefault();
    props.onVerifyRequestHandler();
    props.setCurrentPage(3);
  };

  let passwordErrorMessage =
    !passwordIsMatched && isTouched ? "Password mismatch" : "";

  return (
    <>
      <form onSubmit={passwordFormSubmitHandler} className={styles.LoginForm}>
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your Password"
          onChange={passChangeHandler}
        />
        <Input
          id="re-password"
          type="password"
          label="Confirm Password"
          placeholder="Re-Enter your Password"
          onChange={confPassChangeHandler}
          onBlur={setTouched}
          errorMessage={passwordErrorMessage}
        />
        <button
          type="submit"
          className={`${btnstyles.btn} ${btnstyles.login}`}
          disabled={!passwordIsMatched}
        >
          NEXT
        </button>
      </form>
    </>
  );
};
export default PasswordInput;
