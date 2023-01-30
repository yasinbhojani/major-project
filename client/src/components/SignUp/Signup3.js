import Input from "../UI/Input/Input";
import btnstyles from "../../css/button.module.css";

const Signup3 = (props) => {
  const optChangeHandler = (event) => {
    props.setOtp(event.target.value);
  };
  return (
    <>
      <form onSubmit={props.onVerificationFormSubmitHandler}>
        <Input
          id="otp"
          type="password"
          label="Enter OTP"
          placeholder="Enter OTP Sent To Your Mail"
          onchange={optChangeHandler}
        />
        <button type="submit" className={`${btnstyles.btn} ${btnstyles.login}`}>
          VERIFY
        </button>
      </form>
    </>
  );
};
export default Signup3;
