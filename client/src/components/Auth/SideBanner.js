import styles from "../Auth/Login/Login.module.css";
const SideBanner = (props) => {
  return (
    <>
      <section className={styles["side-image"]}>
        <img src={props.src} className={styles.image} alt="side banner" />
      </section>
    </>
  );
};
export default SideBanner;
