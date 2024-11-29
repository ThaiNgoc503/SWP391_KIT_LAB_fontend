import React from "react";
import { logoutAPI } from "../axios/Auth";
import { useNavigate } from "react-router-dom";
import { Cart } from "./CartIcon";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const token = JSON.parse(jwt);
      const refreshToken = token.REFRESH_TOKEN;
      try {
        await logoutAPI(refreshToken);
      } catch (error) {
        console.log("error logout: " + error);
      } finally {
        localStorage.removeItem("jwt");
        navigate("/");
        window.location.reload();
      }
    }
  };

  return (
    <ul className="flex gap-4 font-semibold text-xl pt-3">
      <li>
        <button onClick={() => handleLogout()}>Logout</button>
      </li>
      <Cart />
    </ul>
  );
};

export default Logout;
