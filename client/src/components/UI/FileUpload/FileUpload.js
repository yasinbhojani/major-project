import styles from "./FileUpload.module.css";
import { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const FileUpload = (props) => {
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState();
  const [activeUpload, setActiveUpload] = useState(false);
  const [status, setStatus] = useState("Upload");
  const fileInputChangeHandler = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      setActiveUpload(false);
      setStatus("Upload");
    }
  };
  // File Upload Require state updating function <FileUpload setUrl={ #Your state updation function# }>
  //Url will be stored in state which you passed to fileupload
  // specify folder name as profile for profile photos and posts for posts
  const uploadButtonClickHandler = () => {
    setStatus("Loading...");
    if (props.folder === "profile") {
      // Write Code Here For Low Resoultion
      const imageRef = ref(storage, `/profile/${image.name}`);
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef).then((imgUrl) => {
          setUploadedImage(imgUrl); //This Show Demo Image
          props.setUrl(imgUrl); //This Returs Hosted URL of img from setUrl state function
          setActiveUpload(true); //Afterd uplodding This desebles the button
          setStatus("Uploaded"); //This chages text that is insied of the button
        });
      });
    }
    if (props.folder === "posts") {
      const imageRef = ref(storage, `/posts/${image.name}`);
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef).then((imgUrl) => {
          setUploadedImage(imgUrl);
          props.setUrl(imgUrl);
          setActiveUpload(true);
          setStatus("Uploaded");
        });
      });
    }
  };
  return (
    <>
      {uploadedImage && (
        <img src={uploadedImage} alt="" className={styles.uploadedImage} />
      )}
      <div>
        <input
          type="file"
          className={styles.fileUpload}
          accept="image/png, image/jpeg"
          onChange={fileInputChangeHandler}
        />
        <button
          className={styles.uploadBtn}
          onClick={uploadButtonClickHandler}
          disabled={activeUpload}
        >
          {status}
        </button>
      </div>
    </>
  );
};
export default FileUpload;
