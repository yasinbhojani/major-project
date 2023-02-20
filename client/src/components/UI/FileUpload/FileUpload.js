import styles from "./FileUpload.module.css";
import { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const FileUpload = (props) => {
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState();
  const fileInputChangeHandler = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const uploadButtonClickHandler = () => {
    const imageRef = ref(storage, `/images/${image.name}`);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((imgUrl) => {
        setUploadedImage(imgUrl);
        props.setUrl(imgUrl);
      });
    });
  };
  return (
    <>
      <img src={uploadedImage} alt="" className={styles.uploadedImage} />
      <div>
        <input
          type="file"
          className={styles.fileUpload}
          accept="image/png, image/jpeg"
          onChange={fileInputChangeHandler}
        />
        <button className={styles.uploadBtn} onClick={uploadButtonClickHandler}>
          Upload
        </button>
      </div>
    </>
  );
};
export default FileUpload;
