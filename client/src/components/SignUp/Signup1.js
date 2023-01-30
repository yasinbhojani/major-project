import Input from "../UI/Input/Input";
import btnstyles from "../../css/button.module.css";

const Signup1 = (props) => {
  const nameChangeHandler = (event) => props.setNameInput(event.target.value);
  const emailChangeHandler = (event) => props.setEmailInput(event.target.value);
  const nameAndEmailSubmitHandler = (event) => {
    event.preventDefault();
    props.setCurrentPage(2);
  };
  return (
    <>
      <form onSubmit={nameAndEmailSubmitHandler}>
        <Input
          id="name"
          type="name"
          label="Name"
          placeholder="Enter your Name"
          onChange={nameChangeHandler}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your Email"
          onChange={emailChangeHandler}
        />
        <button className={`${btnstyles.btn} ${btnstyles.login}`}>NEXT</button>
      </form>
    </>
  );
};
export default Signup1;
