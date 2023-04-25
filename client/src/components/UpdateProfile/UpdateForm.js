import Input from "../UI/Input/Input";
import FileUpload from "../UI/FileUpload/FileUpload";
import Button from "../UI/Button/Button";
import styles from "./UpdateForm.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const UpdateForm = (props) => {
  const redirect = useNavigate();
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [imgUrl, setimgUrl] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [location, setLocation] = useState();
  const [isValid, setIsValid] = useState();
  const nameChangeHandler = (e) => setName(e.target.value);
  const bioChangeHandler = (e) => setBio(e.target.value);
  const phoneNoChangeHandler = (e) => setPhoneNo(e.target.value);
  const locationChangeHandler = (e) => setLocation(e.target.value);
  useEffect(() => {
    //Validating Inputs for Each On Change
    // Chaking is empty string or is Undefined
    //for image there is preddefined empty string to compaire
    if (imgUrl !== "") {
      setIsValid(true);
    } else {
      if (
        (name === undefined &&
          bio === undefined &&
          phoneNo === undefined &&
          location === undefined) ||
        (name === "" && bio === "" && phoneNo === "" && location === "")
      ) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }, [name, bio, imgUrl, phoneNo, location]);
  const updateProfileHandler = () => {
    //Sending Request to api
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/profile/update/${props.userDetails.user_id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          name: name,
          bio: bio,
          imgUrl: imgUrl,
          phoneNo: phoneNo,
          location: location,
        }),
      }
    );

    const URL = `${process.env.REACT_APP_API_ENDPOINT}/api/profile/user`;
    fetch(URL, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user.ok) {
          throw new Error(user.message);
        }
        localStorage.setItem("user", JSON.stringify(user.user_data));
      })
      .catch((err) => console.error(err));

    redirect(`/profile/${props.userDetails.user_id}`);
  };
  // Redirectring to Profile Page
  const cancelHandler = () => redirect(-1);
  return (
    <>
      <form
        className={styles.ProfileUpdateForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h3>Basic Information</h3>
        <Input
          id="name"
          type="text"
          label="Name"
          placeholder="Enter New Name"
          onChange={nameChangeHandler}
        />
        <p>
          Help people discover your account by using the name you're known by:
          either your full name, nickname, or business name
        </p>
        <Input
          id="bio"
          type="text"
          label="Bio"
          placeholder="Enter Bio"
          onChange={bioChangeHandler}
        />
        <p>Describe yourself to others or write something describing you</p>
        <h5>Update Profile Photo</h5>
        <FileUpload setUrl={setimgUrl} folder="profile" type="image" />
        <hr />
        <h3>Personal Details</h3>
        <Input
          id="phoneNo"
          type="number"
          label="Contact Number"
          placeholder="Phone Number"
          onChange={phoneNoChangeHandler}
        />
        <Input
          id="location"
          type="text"
          label="Location"
          placeholder="Enter City / Country"
          onChange={locationChangeHandler}
        />
        <div className={styles.footerButtons}>
          <Button
            text="Update"
            onClick={updateProfileHandler}
            disabled={!isValid}
          />
          <Button text="Cancel" onClick={cancelHandler} />
        </div>
      </form>
    </>
  );
};
export default UpdateForm;
