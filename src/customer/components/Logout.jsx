import React, { useEffect, useRef, useState } from "react";
import { logoutAPI } from "../../api/AuthAPI";
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
    <ul className="flex gap-4 pt-1 font-medium md:gap-6 md:pt-3 md:text-sm">
      <li>
        <Cart />
      </li>
      <li ref={menuRef}>
        <button
          className="flex w-28 rounded-full bg-slate-200 p-1 pr-5 md:w-full md:p-2"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <p className="w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap pl-2 font-bold md:w-[7rem] lg:w-full">
            Welcome, Thái Ngọc
          </p>
          <SlArrowDown className="ml-3 mt-2" />
        </button>
        {openMenu && (
          <div className="absolute z-50 mt-1 w-[12rem] rounded-md border-2 border-solid border-slate-600 bg-white">
            <ul>
              <Link to="/profile">
                <li className="border-b-2 border-solid border-slate-800 p-2 hover:rounded-t-sm hover:bg-slate-300">
                  Profile
                </li>
              </Link>
              <li
                onClick={() => handleLogout()}
                className="cursor-pointer p-2 hover:rounded-b-sm hover:bg-slate-300"
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
