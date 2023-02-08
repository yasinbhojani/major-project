import Input from "../../UI/Input/Input";
import btnstyles from "../../../css/button.module.css";
import { useEffect, useState } from "react";

const NameAndEmailInput = (props) => {
  const [nameIsValid, setNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  useEffect(() => {
    setNameIsValid(true);
    setEmailIsValid(true);
  }, [])

  const NameErrorMessage =
    !nameIsValid && nameIsTouched ? "Name too short" : "";
  const EmailErrorMessage =
    !emailIsValid && emailIsTouched ? "Email is invalid" : "";

  const formIsValid =
    nameIsValid && nameIsTouched && emailIsValid && emailIsTouched;

  const nameChangeHandler = (event) => {
    setNameIsTouched(true);
    props.setNameInput(event.target.value);
    if (event.target.value.trim().length !== 0) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  };

  const emailChangeHandler = (event) => {
    setEmailIsTouched(true);
    props.setEmailInput(event.target.value);
    if (event.target.value.includes("gmail.com")) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const nameAndEmailSubmitHandler = (event) => {
    event.preventDefault();
    props.setCurrentPage(2);
  };

  return (
    <>
      <form onSubmit={nameAndEmailSubmitHandler}>
        <Input
          id="name"
          type="name"
          label="Name"
          placeholder="Enter your Name"
          onChange={nameChangeHandler}
          errorMessage={NameErrorMessage}
          value={props.nameInput}
          onBlur={() => {
            setNameIsTouched(true)
          }}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your Email"
          onChange={emailChangeHandler}
          errorMessage={EmailErrorMessage}
          value={props.emailInput}
          onBlur={() => {
            setEmailIsTouched(true)
          }}
        />
        <button
          className={`${btnstyles.btn} ${btnstyles.login}`}
          disabled={!formIsValid}
        >
          NEXT
        </button>
      </form>
    </>
  );
};
export default NameAndEmailInput;
