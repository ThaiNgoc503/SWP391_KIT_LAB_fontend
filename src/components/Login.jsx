import React, { useEffect, useState } from "react";
import { loginAPI } from "../axios/Auth";
import { MdCancelPresentation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

const Login = () => {
  const [popup, setPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const getUsernameAndPassword = async (e) => {
    e.preventDefault();
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
          navigate("/admin");
        } else {
          navigate("/");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
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
    <>
      <ul className="flex gap-4 font-semibold text-xl pt-3">
        <li>
          <button onClick={() => setPopup(!popup)}>Login</button>
        </li>
      </ul>
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center align-middle items-center">
          <div className="min-h-screen justify-center items-center flex">
            <div className="w-[30rem]  rounded-md bg-red-200">
              <div className="flex justify-center relative">
                <button
                  onClick={() => closePopup()}
                  className="text-3xl absolute left-0 pl-3 pt-3"
                >
                  <MdCancelPresentation />
                </button>
                <h2 className="font-bold text-3xl text-center pt-2">Login</h2>
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
                  className="p-2 rounded-md pl-5"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="p-2 rounded-md pl-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-between">
                  <a href="">forgot password</a>
                  <a className="flex gap-1">
                    <p>don't have account? </p>
                    <button
                      onClick={handleRegister}
                      className="text-cyan-400 text-base hover:underline ease-in-out pr-2"
                    >
                      Sign up
                    </button>
                  </a>
                </div>
                <button
                  type="submit"
                  className="bg-white hover:bg-orange-100 rounded-md p-2"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showRegister && (
        <Register closePopupRegister={() => setShowRegister(false)}/>
      )}
    </>
  );
};

export default Login;
