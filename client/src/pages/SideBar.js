import Search from "../components/Search/Search";
import WhatsHappening from "../components/WhatsHappening/WhatsHappening";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";

const SideBar = () => {
  const sideBarStyels = {
    margin: "20px",
    marginTop: "0px",
    marginLeft: "989px",
    paddingBottom: "10px",
    position: "fixed",
  };
  return (
    <div style={sideBarStyels}>
      <Search />
      <WhatsHappening />
      <WhoToFollow />
    </div>
  );
};
export default SideBar;
