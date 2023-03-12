import React, { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import jwt_decode from "jwt-decode";
import Button from "../../UI/Button/Button";

import styles from "./NewPearl.module.css";

const NewPearl = (props) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pearlDraft, setPearlDraft] = useState("");

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
          token.user_id
      )
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          alert("An error occured, please try again later: " + err.message);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const pearlChangeHandler = (e) => {
    setPearlDraft(e.target.value);
  };

  const postSubmitHandler = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/pearl/post", {
      method: "POST",
      body: JSON.stringify({
        pearlContent: pearlDraft,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log(data);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => console.error(err));

    props.onClose();
  };

  const submitIsDisabled = pearlDraft.length === 0;

  let content = (
    <form className={styles.form} onSubmit={postSubmitHandler}>
      <div className={styles.profile}>
        <img src={userData.avatar_url} alt="profile avatar" />
        <div>
          <p className={styles.username}>{userData.username}</p>
          <p className={styles.user_id}>@{userData.user_id}</p>
        </div>
      </div>
      <textarea
        className={styles.textarea}
        placeholder="Share your thoughts"
        onChange={pearlChangeHandler}
      ></textarea>
      <div className={styles.btncontainer}>
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

  return <Modal onClose={props.onClose}>{content}</Modal>;
};

export default NewPearl;
