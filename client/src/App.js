import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Chats from "./pages/Chats/Chats";
import Profile from "./pages/Profile/Profile";
// import Login from "./components/Auth/Login/Login";
// import SignUp from "./components/Auth/SignUp/SignUp";
import NavBar from "./components/NavBar/NavBar";
function App() {
  return (
    <div className="AppBody">
      {/* <Login /> */}
      {/* <SignUp /> */}
      <BrowserRouter>
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<h1>404</h1>} />
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
