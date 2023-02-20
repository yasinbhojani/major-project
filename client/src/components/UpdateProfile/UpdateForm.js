import Input from "../UI/Input/Input";
import FileUpload from "../UI/FileUpload/FileUpload";
import Button from "../UI/Button/Button";
import styles from "./UpdateForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const UpdateForm = (props) => {
  const redirect = useNavigate();
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [imgUrl, setimgUrl] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [location, setLocation] = useState();
  const nameChangeHandler = (e) => setName(e.target.value);
  const bioChangeHandler = (e) => setBio(e.target.value);
  const phoneNoChangeHandler = (e) => setPhoneNo(e.target.value);
  const locationChangeHandler = (e) => setLocation(e.target.value);
  const cancelHandler = () => redirect(`/profile/${props.userDetails.user_id}`);
  const updateProfileHandler = () => {
    fetch(`http://localhost:8080/profile/update/${props.userDetails.user_id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        bio: bio,
        imgUrl: imgUrl,
        phoneNo: phoneNo,
        location: location,
      }),
    });
    redirect(`/profile/${props.userDetails.user_id}`);
  };
  return (
    <>
      <div className={styles.ProfileUpdateForm}>
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
        <FileUpload setUrl={setimgUrl} />
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
          <Button text="Update" onClick={updateProfileHandler} />
          <Button text="Cancel" onClick={cancelHandler} />
        </div>
      </div>
    </>
  );
};
export default UpdateForm;
