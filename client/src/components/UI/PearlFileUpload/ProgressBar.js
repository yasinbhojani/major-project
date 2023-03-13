const ProgressBar = ({ percent }) => {
  const containerStyles = {
    height: "6px",
    width: "200px",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: "0px 30px"
  };

  const fillerStyles = {
    height: "100%",
    width: `${percent}%`,
    backgroundColor: "#7076FE",
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 1s linear"
  };


  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
