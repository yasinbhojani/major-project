import React, { useState } from "react";
import { storage } from "../FileUpload/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styles from "./PearlFileUpload.module.css";
import ProgressBar from "./ProgressBar";
import pearladd from "../../../assets/gallery-add.svg";
import { Tooltip } from "react-tooltip";

const PearlFileUpload = ({ setMediaURL }) => {
  const [percent, setPercent] = useState(0);
  const [uploading, setUploading] = useState(false);

  const fileInputChangeHandler = (event) => {
    setUploading(true);

    if (!event.target.files[0]) {
      setUploading(false);
      return;
    }

    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024; // Convert to MB
    if (fileSize > 8) {
      alert("File size exceeds 8MB limit.");
      event.target.value = ""; // Clear the file input
      setUploading(false);
      return;
    }

    const storageRef = ref(storage, `/images/${event.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => {
        console.error(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setMediaURL(url);
        });
        setUploading(false);
      }
    );
  };

  return (
    <div className={styles.container}>
      <div>
        <label
          className={styles.label}
          htmlFor="image-upload"
          data-tooltip-id="uploadmedia"
          data-tooltip-content="Media"
        >
          <Tooltip id="uploadmedia" />
          <img src={pearladd} alt="upload icon" />
        </label>
        <input
          className={styles.input}
          id="image-upload"
          disabled={uploading}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={fileInputChangeHandler}
        />
      </div>
      {uploading && <ProgressBar percent={percent} />}
    </div>
  );
};

export default PearlFileUpload;
