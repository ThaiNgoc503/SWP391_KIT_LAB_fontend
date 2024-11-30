import React, { useEffect, useState } from "react";
import { loginAPI } from "../../api/AuthAPI";
import { MdCancelPresentation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Register from "./PopupSignUp";
import { FaUser } from "react-icons/fa";
import Loader from "./Loader";

const PopupLogin = () => {
  const [popup, setPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getUsernameAndPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const credentials = { emailOrUsername: username, password: password };
      const response = await loginAPI(credentials);
      if (response.data.message === "Login successful.") {
        const data = {
          TOKEN: response.data.token,
          ROLE: response.data.roles[0].trim(),
          REFRESH_TOKEN: response.data.refreshToken,
        };

        localStorage.setItem("jwt", JSON.stringify(data));
        console.log("Login success");
        if (data.ROLE === "Manager") {
          navigate("manager/user");
        } else {
          navigate("/");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setPopup(false);
    setPassword("");
    setUsername("");
  };

  const handleRegister = () => {
    setPopup(false);
    setShowRegister(true);
  };

  return (
    <div>
      <ul className="flex gap-4 pt-3 text-base font-semibold">
        <li>
          <button onClick={() => setPopup(!popup)} className="flex">
            <FaUser className="mr-2 mt-1 text-xl" /> LOGIN/SIGN UP
          </button>
        </li>
      </ul>
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 align-middle">
          <div className="flex min-h-screen items-center justify-center">
            <div className="w-[30rem] rounded-md bg-red-200">
              <div className="relative flex justify-center">
                <button
                  onClick={() => closePopup()}
                  className="absolute left-0 pl-3 pt-3 text-3xl"
                >
                  <MdCancelPresentation />
                </button>
                <h2 className="pt-2 text-center text-3xl font-bold">Login</h2>
              </div>
              <form
                onSubmit={getUsernameAndPassword}
                className="flex flex-col gap-y-3 p-5"
              >
                <p>User Name</p>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="rounded-md p-2 pl-5"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="rounded-md p-2 pl-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-between">
                  <a href="">forgot password</a>
                  <a className="flex gap-1">
                    <p>don't have account? </p>
                    <button
                      onClick={handleRegister}
                      className="pr-2 text-base text-cyan-400 ease-in-out hover:underline"
                    >
                      Sign up
                    </button>
                  </a>
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-white p-2 hover:bg-orange-100"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showRegister && (
        <Register closePopupRegister={() => setShowRegister(false)} />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default PopupLogin;
