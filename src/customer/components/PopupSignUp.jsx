import React, { useState } from "react";
import { MdCancelPresentation } from "react-icons/md";
import { registerAPI } from "../../api/AuthAPI";

const PopupSignUp = ({ closePopupRegister }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 align-middle">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-[30rem] rounded-md bg-red-200">
          <div className="relative flex justify-center">
            <button
              onClick={closePopupRegister}
              className="absolute left-0 pl-3 pt-3 text-3xl"
            >
              <MdCancelPresentation />
            </button>
            <h2 className="pt-2 text-center text-3xl font-bold">Sign up</h2>
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
                  className="rounded-md p-2 pl-5"
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
                  className="rounded-md p-2 pl-5"
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
                  className="rounded-md p-2 pl-5"
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
                  className="rounded-md p-2 pl-5"
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
                  className="rounded-md p-2 pl-5"
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
                  className="rounded-md p-2 pl-5"
                />
              </div>

              <input
                type="hidden"
                name="role"
                id="role"
                value="Customer"
                className="rounded-md p-2 pl-5"
              />
            </div>
            <div className="ml-6 flex gap-1">
              <p>Already have an account? </p>
              <button
                type="button"
                className="pr-2 text-base text-cyan-400 ease-in-out hover:underline"
              >
                Sign in
              </button>
            </div>
            <button
              type="submit"
              className="m-5 w-[27rem] rounded-md bg-white p-2 hover:bg-yellow-100"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupSignUp;
