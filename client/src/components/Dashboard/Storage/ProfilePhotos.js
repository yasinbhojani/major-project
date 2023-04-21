import { useEffect, useState } from "react";
import styles from "./Gallary.module.css";
import Modal from "../../UI/Modal/Modal";
const ProfilePhotos = () => {
  const [imagesList, setImageList] = useState([]);
  const [show, setShow] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/dashboard/storage/avatar`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        setImageList(details);
      })
      .catch((err) => {
        alert("An error occured, please try again later: " + err.message);
      });
  }, []);
  const showModel = (url) => {
    setShow(true);
    setCurrentUrl(url);
  };
  return (
    <>
      <div className={styles.gallary}>
        <h1>Profile Photos Bucket</h1>
        <div className={styles.pictures}>
          {imagesList.length > 0 &&
            imagesList.map((url) => {
              return (
                <div
                  key={Math.random().toString()}
                  onClick={() => showModel(url.avatar_url)}
                >
                  <img src={url.avatar_url} alt="" className={styles.profile}/>
                  <h1>{url.username}</h1>
                </div>
              );
            })}
        </div>
      </div>
      {show && (
        <Modal
          children={<img src={currentUrl} alt="" width={"100%"} />}
          onClose={() => setShow(false)}
        />
      )}
    </>
  );
};
export default ProfilePhotos;
