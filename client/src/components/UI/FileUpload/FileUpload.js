import styles from "./FileUpload.module.css";
import { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const FileUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(""); //This Thing Holds URL for the image
  const fileInputChangeHandler = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const uploadButtonClickHandler = () => {
    const imageRef = ref(storage, `/images/${image.name}`);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((imgUrl) => {
        setUrl(imgUrl);
      });
    });
  };
  console.log("Image Url : " + url);
  return (
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
  );
};
export default FileUpload;
