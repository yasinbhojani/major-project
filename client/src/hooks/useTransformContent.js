import { useNavigate } from "react-router-dom";

const useTransformContent = () => {
  const navigate = useNavigate();

  const transform = (content) => {
    const regex = /(\s+|\n+)/;
    const words = content.split(regex);
    const userClickHandler = (e) => {
      e.stopPropagation();
      const user = e.target.innerText.split("@")[1];
      navigate("/profile/" + user);
    };

    const temp_content = words.map((word, i) => {
      if (word.startsWith("@")) {
        return (
          <span
            key={Math.random()}
            style={{ color: "#4952ff", cursor: "pointer" }}
            onClick={userClickHandler}
          >
            {word}
          </span>
        );
      } else if (word.startsWith("#")) {
        return (
          <span key={Math.random()} style={{ color: "#4952ff" }}>
            {word}
          </span>
        );
      } else {
        return word;
      }
    });

    return temp_content;
  };

  return transform;
};

export default useTransformContent;
