import logo from "../../assets/shell-logo.png";
import styles from "./Login.module.css";
const BrandName = () => {
  return (
    <>
      <div className={styles.head}>
        <img src={logo} style={{ width: "50px", height: "50px" }} alt="logo" />
        <h1>
          Welcome To <span>Shell</span>
        </h1>
      </div>
    </>
  );
};
export default BrandName;
