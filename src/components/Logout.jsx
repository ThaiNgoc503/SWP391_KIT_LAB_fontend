import React from "react";
import { logoutAPI } from "../axios/Auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const token = JSON.parse(jwt);
      const refreshToken = token.REFRESH_TOKEN;
      await logoutAPI(refreshToken);
      localStorage.removeItem("jwt");
      navigate("/");
    }
  };

  return (
    <ul className="flex gap-4 font-semibold text-xl pt-3">
      <li>
        <button onClick={() => handleLogout()}>Logout</button>
      </li>
    </ul>
  );
};

export default Logout;
