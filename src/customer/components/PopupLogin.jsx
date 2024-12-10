import React, { useEffect, useState } from "react";
import { loginAPI } from "../../api/AuthAPI";
import { MdCancelPresentation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Register from "./PopupSignUp";
import { FaUser } from "react-icons/fa";
import Loader from "./Loader";
import { useFormik } from "formik";
import * as yup from "yup";
import Notification from "./Notification";

const PopupLogin = () => {
  const [popup, setPopup] = useState(false);
  const [setUsername] = useState("");
  const [setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);
  const [notification2, setNotification2] = useState(false);

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
          const tokenData = {
            TOKEN: response.data.token,
            ROLE: response.data.roles[0].trim(),
            REFRESH_TOKEN: response.data.refreshToken,
          };

          localStorage.setItem("jwt", JSON.stringify(tokenData));
          if (tokenData.ROLE === "Manager") {
            navigate("manager/user");
          } else {
            navigate("/");
            window.location.reload();
          }
        } else {
          throw new Error(response.data.message || "Something went wrong");
        }
      } catch (error) {
        if (error.message) {
          setNotification(true);
        } else {
          setNotification2(true);
        }
        setTimeout(() => {
          setNotification(false);
          setNotification2(false);
        }, 3000);
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
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40 align-middle">
          <div className="flex min-h-screen items-center justify-center">
            <div className="w-[30rem] rounded-md bg-gradient-to-br from-purple-100 via-slate-200 to-slate-300">
              <div className="relative flex justify-center">
                <button
                  onClick={() => closePopup()}
                  className="absolute left-0 pl-3 pt-3 text-3xl text-black"
                >
                  <MdCancelPresentation />
                </button>
                <h2 className="pb-2 pt-2 text-center text-3xl font-semibold text-black">
                  Login
                </h2>
              </div>
              <form
                onSubmit={Formik.handleSubmit}
                className="flex flex-col gap-y-3 p-5 text-black"
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
      {notification2 && (
        <Notification notificationMessage={"An unexpected error occurred."} />
      )}
      {notification && (
        <Notification
          notificationMessage={
            "user name or password is wrong or user is banned please enter again."
          }
        />
      )}
    </div>
  );
};

export default PopupLogin;
