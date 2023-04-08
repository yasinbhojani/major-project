import React, { useEffect, useState } from "react";
import styles from "./AccountData.module.css";
import verified from "../../../assets/Profile/verified.svg";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const AccountData = () => {
  const redirect = useNavigate();

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
          setUserData(data);
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  let content = (
    <>
      <img
        alt="profile avatar"
        src={userData.avatar_url}
        data-tooltip-id="profile"
        data-tooltip-content="Profile"
        onClick={() => {
          redirect(`/profile/${userData.user_id}`);
        }}
      />
      <Tooltip id="profile" />
      <div
        className={styles.text}
        onClick={() => {
          redirect(`/profile/${userData.user_id}`);
        }}
      >
        <b>
          {userData.username}
          {userData.followers > 20 && (
            <img
              src={verified}
              className={styles.verified}
              alt="verify check"
            />
          )}
        </b>
        <p>@{userData.user_id}</p>
      </div>
    </>
  );

  if (isError) {
    content = <p>An Error Occured</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return <div className={styles.account}>{content}</div>;
};

export default AccountData;
