import { useState } from "react";
const useInput = (validationFn) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validationFn(value);
  const inputHasError = !isValid && isTouched;

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    inputHasError,
    onChangeHandler,
    onBlurHandler,
    reset,
  };
};

export default useInput;
