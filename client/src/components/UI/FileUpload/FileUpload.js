import styles from "./FileUpload.module.css";
import { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Sample Component     <FileUpload setUrl={setimgUrl} folder="profile" type="image" />
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
    // Checking Type of File User Want To Upload
    if (props.type === "image") {
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
    }
    // This Code is Responsible to upload Video And Plz Ignor Name I can't do anything about it i am lezzy : )
    if (props.type === "video") {
      if (props.folder === "videos") {
        if (image.size < 1.6e7) {
          const imageRef = ref(storage, `/videos/${image.name}`);
          uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((imgUrl) => {
              setUploadedImage(imgUrl);
              props.setUrl(imgUrl);
              setActiveUpload(true);
              setStatus("Uploaded");
            });
          });
        } else {
          setActiveUpload(false);
          setStatus("Upload Error");
        }
      }
    }
  };
  return (
    <>
      {uploadedImage && props.type === "image" && (
        <img src={uploadedImage} alt="" className={styles.uploadedImage} />
      )}
      {uploadedImage && props.type === "video" && (
        <>
          <video width="320" controls>
            <source src={uploadedImage} type="video/mp4" />
          </video>
        </>
      )}
      <div>
        {props.type === "image" ? (
          // This is Image File Uplode
          <input
            type="file"
            className={styles.fileUpload}
            accept="image/png, image/jpeg"
            onChange={fileInputChangeHandler}
          />
        ) : (
          // Video File Upload
          <input
            type="file"
            className={styles.fileUpload}
            onChange={fileInputChangeHandler}
            accept=".mp4"
          />
        )}
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
