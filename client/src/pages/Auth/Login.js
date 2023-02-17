import styles from "../../components/Auth/Login/Login.module.css";

import macintosh from "../../assets/macintosh.jpg";
import WellcomeText from "../../components/Auth/WellcomeText";
import SideBanner from "../../components/Auth/SideBanner";

import LoginForm from "../../components/Auth/Login/LoginForm";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <main className={styles.maindiv}>
      <SideBanner src={macintosh} />
      <section className={`${styles.login} container`}>
        <WellcomeText />
        <h2>Log In</h2>
        <p>Enter you Email and Password to Login on Shell</p>
        <LoginForm />
        <footer className={styles.footer}>
          <p>
            Dont have an account? <Link to="/auth/signup">Sign Up</Link>
          </p>
          <p>
            <a href="https://github.com/yasinbhojani/major-project">
              Forgot Password?
            </a>
          </p>
        </footer>
      </section>
    </main>
  );
};

export default Login;
