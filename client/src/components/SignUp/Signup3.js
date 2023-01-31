import Input from "../UI/Input/Input";
import btnstyles from "../../css/button.module.css";
import styles from "../Login/Login.module.css";
import { useState } from "react";
const Signup3 = (props) => {
  const [optBTN, setOtpBTN] = useState(true);
  const optChangeHandler = (event) => {
    props.setOtp(event.target.value);
  };
  setTimeout(() => setOtpBTN(false), 5000);
  const resendOTPHandler = () => {
    setOtpBTN(true);
    setTimeout(() => setOtpBTN(false), 5000);
  };
  return (
    <>
      <form onSubmit={props.onVerificationFormSubmitHandler}>
        <Input
          id="otp"
          type="password"
          label="Enter OTP"
          placeholder="Enter OTP Sent To Your Mail"
          onChange={optChangeHandler}
        />
        <button
          disabled={optBTN}
          onClick={resendOTPHandler}
          className={styles.btnLink}
        >
          Resend OTP
        </button>
        <button className={`${btnstyles.btn} ${btnstyles.login}`}>
          VERIFY
        </button>
      </form>
    </>
  );
};
export default Signup3;
