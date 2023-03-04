import styles from "./BackButton.module.css";
import backButton from "../../../assets/Profile/backButton.svg";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${styles.backButtonIcon} ${props.className}`}
        onClick={() => navigate(-1)}
      >
        <img src={backButton} alt="" />
      </div>
    </>
  );
};
export default BackButton;
