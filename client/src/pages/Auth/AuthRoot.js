import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return <Outlet />;
};

export default AuthRoot;
