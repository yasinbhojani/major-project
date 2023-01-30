import logo from "../../assets/shell-logo.png";
import styles from "./Login.module.css";
const BrandName = () => {
  return (
    <>
      <div className={styles.head}>
        <img src={logo} style={{ width: "50px", height: "50px" }} alt="logo" />
        <span>
          Welcome To <h1>Shell</h1>
        </span>
      </div>
    </>
  );
};
export default BrandName;
