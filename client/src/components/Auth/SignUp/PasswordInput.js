import Input from "../../UI/Input/Input";
import btnstyles from "../../../css/button.module.css";

const PasswordInput = (props) => {
  const passChangeHandler = (event) => props.setPassInput(event.target.value);
  const confPassChangeHandler = (event) => {
    if (props.passInput === event.target.value) {
      props.setConfPassInput(props.passInput);
    }
  };
  const passwordFormSubmitHandler = (event) => {
    event.preventDefault();
    props.setCurrentPage(3);
  };
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
        />
        <button type="submit" className={`${btnstyles.btn} ${btnstyles.login}`}>
          NEXT
        </button>
      </form>
    </>
  );
};
export default PasswordInput;
