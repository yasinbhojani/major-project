import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const Avatar = ({ src, alt }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const styles = {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "50%",
  };

  useEffect(() => {
    let token;
    if (localStorage.getItem("accessToken")) {
      token = jwt_decode(localStorage.getItem("accessToken"));
    }

    if (token) {
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
          setImageUrl(data.avatar_url);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return <img src={src ? src : imageUrl} alt={alt} style={styles} />;
};

export default Avatar;
