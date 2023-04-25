import React, { useEffect, useState } from "react";

import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import PearlFileUpload from "../../UI/PearlFileUpload/PearlFileUpload";

import styles from "./NewPearl.module.css";
import verified from "../../../assets/Profile/verified.svg";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const NewPearl = (props) => {
  const redirect = useNavigate();

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pearlDraft, setPearlDraft] = useState("");
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [mediaURL, setMediaURL] = useState("");

  useEffect(() => {
    let token;
    if (localStorage.getItem("accessToken")) {
      token = jwt_decode(localStorage.getItem("accessToken"));
    }

    if (token) {
      // Fetch request to retrive user data
      setIsLoading(true);
      setIsError(false);

      fetch(
        process.env.REACT_APP_API_ENDPOINT +
          "/api/profile/openProfile/" +
          token.user_id,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.profileData);
        })
        .catch((err) => {
          alert("An error occured, please try again later: " + err.message);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const pearlChangeHandler = (e) => {
    if (e.target.value.trim().length === 0) {
      setSubmitIsDisabled(true);
    }
    if (e.target.value.trim().length > 280) {
      setSubmitIsDisabled(true);
    } else {
      setSubmitIsDisabled(false);
    }
    setPearlDraft(e.target.value);
  };

  const postSubmitHandler = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/pearl/post", {
      method: "POST",
      body: JSON.stringify({
        pearlContent: pearlDraft.trim(),
        mediaURL: mediaURL,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.message);
        }
        redirect(0);
      })
      .catch((err) => console.error(err));

    props.onClose();
  };

  const redirectToProfileHandler = () => {
    props.onClose();
    redirect(`/profile/${userData.user_id}`);
  };

  let content = (
    <form className={styles.form} onSubmit={postSubmitHandler}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <img
            src={userData.avatar_url}
            alt="profile avatar"
            className={styles.avatar_url}
            onClick={redirectToProfileHandler}
          />
          <div>
            <p className={styles.username}>
              {userData.username}
              {userData.followers > 20 && (
                <img
                  src={verified}
                  className={styles.verified}
                  alt="verify check"
                />
              )}
            </p>
            <p className={styles.user_id}>@{userData.user_id}</p>
          </div>
        </div>
        <div
          className={
            pearlDraft.trim().length > 280
              ? `${styles.counter} ${styles.red}`
              : styles.counter
          }
        >
          {pearlDraft.trim().length}/280
        </div>
      </div>
      <textarea
        className={styles.textarea}
        placeholder={
          Math.random() >= 0.5 ? "What's in your mind?" : "Share your thoughts"
        }
        onChange={pearlChangeHandler}
        value={pearlDraft}
      ></textarea>
      {mediaURL && <img className={styles.media} src={mediaURL} alt="media" />}
      <div className={styles.btncontainer}>
        <div>
          <PearlFileUpload setMediaURL={setMediaURL} />
        </div>
        <Button
          text="Post"
          type="submit"
          className={styles.btn}
          disabled={submitIsDisabled}
        />
      </div>
    </form>
  );

  if (isLoading) {
    content = <p className={styles.message}>Loading...</p>;
  }

  if (isError) {
    content = (
      <p className={styles.message}>
        An Error Occured, Please try again later.
      </p>
    );
  }

  return (
    <Modal onClose={props.onClose} title="New Pearl">
      {content}
    </Modal>
  );
};

export default NewPearl;
