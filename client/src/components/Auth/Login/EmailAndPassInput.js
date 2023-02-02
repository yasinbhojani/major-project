import Input from "../../UI/Input/Input";
import btnstyles from "../../../css/button.module.css";
const EmailAndPassInput = (props) => {
  const emailChangeHandler = (event) => props.setEmailInput(event.target.value);
  const passwordChangeHandler = (event) =>
    props.setPasswordInput(event.target.value);
  return (
    <>
      <form onSubmit={props.emailAndPasswordFormSubmitHandler}>
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your Email"
          onChange={emailChangeHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your Password"
          onChange={passwordChangeHandler}
        />
        <button type="submit" className={`${btnstyles.btn} ${btnstyles.login}`}>
          LOG IN
        </button>
      </form>
    </>
  );
};
export default EmailAndPassInput;
