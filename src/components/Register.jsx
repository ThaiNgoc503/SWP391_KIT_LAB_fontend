import React, { useState } from "react";
import { MdCancelPresentation } from "react-icons/md";
import { registerAPI } from "../axios/Auth";

const Register = ({ closePopupRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role] = useState("Customer");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email,
      fullName: fullName,
      phone: phone,
      address: address,
      role: role,
    };
    console.log(data);
    await registerAPI(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center align-middle items-center">
      <div className="min-h-screen justify-center items-center flex">
        <div className="w-[30rem] rounded-md bg-red-200">
          <div className="flex justify-center relative">
            <button
              onClick={closePopupRegister}
              className="text-3xl absolute left-0 pl-3 pt-3"
            >
              <MdCancelPresentation />
            </button>
            <h2 className="font-bold text-3xl text-center pt-2">Sign up</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2 p-5">
              <div>
                <label htmlFor="username" className="text-lg font-semibold">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="p-2 rounded-md pl-5"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-lg font-semibold">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="p-2 rounded-md pl-5"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-lg font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="p-2 rounded-md pl-5"
                />
              </div>

              <div>
                <label htmlFor="fullName" className="text-lg font-semibold">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="p-2 rounded-md pl-5"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-lg font-semibold">
                  Phone:
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="p-2 rounded-md pl-5"
                />
              </div>

              <div>
                <label htmlFor="address" className="text-lg font-semibold">
                  Address:
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="p-2 rounded-md pl-5"
                />
              </div>

              <input
                type="hidden"
                name="role"
                id="role"
                value="Customer"
                className="p-2 rounded-md pl-5"
              />
            </div>
            <div className="flex gap-1 ml-6">
              <p>Already have an account? </p>
              <button
                type="button"
                className="text-cyan-400 text-base hover:underline ease-in-out pr-2"
              >
                Sign in
              </button>
            </div>
            <button
              type="submit"
              className="bg-white rounded-md p-2 m-5 w-[27rem] hover:bg-yellow-100"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
