import React, { useEffect, useRef, useState } from "react";
import { logoutAPI } from "../api/Auth";
import { Link, useNavigate } from "react-router-dom";
import { Cart } from "./CartIcon";
import { SlArrowDown } from "react-icons/sl";

const Logout = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
   
  }, []);

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
    <ul className="flex gap-6 font-medium text-sm pt-3">
      <li>
        <Cart />
      </li>
      <li ref={menuRef}>
        <button
          className="bg-slate-200 p-2 pr-6 rounded-full flex"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[6rem] md:w-full">
            Welcome, Thái Ngọc
          </p>
          <SlArrowDown className="mt-2 ml-3" />
        </button>
        {openMenu && (
          <div className="border-solid border-2 border-slate-600 mt-1 absolute z-50 bg-white w-[12rem] rounded-md">
            <ul>
              <Link to="/profile">
                <li className="p-2 border-solid border-b-2 border-slate-800 hover:bg-slate-300 hover:rounded-t-sm">
                  Profile
                </li>
              </Link>
              <li
                onClick={() => handleLogout()}
                className=" hover:bg-slate-300 p-2 cursor-pointer hover:rounded-b-sm"
              >
                <button>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ul>
  );
};

export default Logout;
