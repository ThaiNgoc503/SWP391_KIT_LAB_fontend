import React from "react";
import { useState } from "react";
import { loginAPI } from "../axios/Auth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const getUsernameAndPassword = async (e) => {
    e.preventDefault();

    try {
      const credentials = { emailOrUsername: username, password: password };
      const response = await loginAPI(credentials);

      if (response.data.message === "Login successful.") {
        const data = {
          TOKEN: response.data.token,
          ROLE: response.data.roles[0].trim(),
        };
        localStorage.setItem("jwt", JSON.stringify(data));
        console.log("Login success");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen justify-center items-center flex">
      <div className="w-[30rem]  rounded-md bg-red-200">
        <h2 className="font-bold text-3xl text-center pt-2">Login</h2>
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
            <a>Register</a>
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
  );
};

export default LoginPage;
