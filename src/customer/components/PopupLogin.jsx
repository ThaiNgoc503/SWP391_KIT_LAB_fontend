import React, { useEffect, useState } from "react";
import { loginAPI } from "../../api/AuthAPI";
import { MdCancelPresentation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Register from "./PopupSignUp";
import { FaUser } from "react-icons/fa";
import Loader from "./Loader";
import { GiArchiveRegister } from "react-icons/gi";
import { useFormik } from "formik";
import * as yup from "yup";

const PopupLogin = () => {
  const [popup, setPopup] = useState(false);
  const [setUsername] = useState("");
  const [setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const Formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required("Username is required, please enter data"),
      password: yup
        .string()
        .required("Password is required, please enter data"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const data = {
          emailOrUsername: values.username,
          password: values.password,
        };
        const response = await loginAPI(data);
        if (response.data.message === "Login successful.") {
          console.log(response.data.message);
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
      } finally {
        setIsLoading(false);
      }
    },
  });

  const closePopup = () => {
    setPopup(false);
    setPassword("");
    setUsername("");
  };

  const handleRegister = () => {
    setShowRegister(true);
    setPopup(false);
  };

  const handleLoginOpen = () => {
    setShowRegister(false);
    setPopup(true);
  };

  return (
    <div>
      <ul className="flex gap-4 pt-3 text-base font-medium">
        <li>
          <button onClick={() => setPopup(!popup)} className="flex text-base">
            <FaUser className="mr-2 text-base" />
            <p className="text-sm">SIGN IN</p>
          </button>
        </li>
      </ul>
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 align-middle">
          <div className="flex min-h-screen items-center justify-center">
            <div className="w-[30rem] rounded-md bg-gradient-to-br from-purple-400 via-green-200 to-cyan-200">
              <div className="relative flex justify-center">
                <button
                  onClick={() => closePopup()}
                  className="absolute left-0 pl-3 pt-3 text-3xl"
                >
                  <MdCancelPresentation />
                </button>
                <h2 className="bg-gradient-to-tr from-yellow-400 via-orange-300 to-red-400 bg-clip-text pb-2 pt-2 text-center text-3xl font-semibold text-transparent">
                  Login
                </h2>
              </div>
              <form
                onSubmit={Formik.handleSubmit}
                className="flex flex-col gap-y-3 p-5 text-slate-100"
              >
                <p>User Name</p>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="rounded-md p-2 pl-5 text-black"
                  value={Formik.values.username}
                  onChange={Formik.handleChange}
                />
                {Formik.errors.username && (
                  <p className="text-red-400">{Formik.errors.username}</p>
                )}
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="rounded-md p-2 pl-5 text-black"
                  value={Formik.values.password}
                  onChange={Formik.handleChange}
                />
                {Formik.errors.password && (
                  <p className="text-red-400">{Formik.errors.password}</p>
                )}

                <ul className="flex justify-between">
                  <li>
                    <a href="">forgot password</a>
                  </li>
                  <li className="flex gap-1">
                    <p>don't have account? </p>
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="pr-2 text-base text-blue-600 ease-in-out hover:underline"
                    >
                      Sign up
                    </button>
                  </li>
                </ul>
                <button
                  type="submit"
                  className="rounded-md bg-gradient-to-r from-green-400 to-green-300 p-2"
                >
                  Login
                </button>
                <p className="text-red-500">{errorMessage}</p>
              </form>
            </div>
          </div>
        </div>
      )}
      {showRegister && (
        <Register
          closePopupRegister={() => setShowRegister(false)}
          handleLoginOpen={handleLoginOpen}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default PopupLogin;
