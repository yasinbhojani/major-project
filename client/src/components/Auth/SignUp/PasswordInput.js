import Input from "../../UI/Input/Input";
import btnstyles from "../../../css/button.module.css";
import { useRef, useState } from "react";

const PasswordInput = (props) => {
  const [passwordIsMatched, setPasswordIsMatched] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const timeoutId = useRef();

  const passChangeHandler = (event) => props.setPassInput(event.target.value);

  const setTouched = () => {
    setIsTouched(true);
  };

  const confPassChangeHandler = (event) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setTouched();
      props.setConfPassInput(props.passInput);
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
      <form onSubmit={passwordFormSubmitHandler}>
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
