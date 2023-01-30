import BrandName from "../../Login/BrandName";

import styles from "../../Login/Login.module.css";

const Header = () => {
    return(
        <section className={`${styles.login} container`}>
        <BrandName />
        <h2>Sign Up</h2>
        <p>Create Your Free Account Now !</p>
        {/* Diffrent Forms Here */}
        <footer className={styles.footer}>
          <p>
            Already have an account?{" "}
            <a href="https://github.com/yasinbhojani/major-project">Log In</a>
          </p>
          <p>{currentPage === 1 && "1 of 3"}</p>
          <p>{currentPage === 2 && "2 of 3"}</p>
          <p>{currentPage === 3 && "3 of 3"}</p>
        </footer>
        </section>
    )
}