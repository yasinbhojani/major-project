import Input from "../../UI/Input/Input";
import btnstyles from "../../../css/button.module.css";
import styles from "../Login/Login.module.css";
import { useEffect, useState } from "react";
const OTPVerification = (props) => {
  const [optBTN, setOtpBTN] = useState(true);
  const optChangeHandler = (event) => {
    props.setOtp(event.target.value);
  };
  useEffect(() => {
    setTimeout(() => setOtpBTN(false), 35000);
  }, []);
  const resendOTPHandler = () => {
    setOtpBTN(true);
    setTimeout(() => setOtpBTN(false), 35000);
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
export default OTPVerification;