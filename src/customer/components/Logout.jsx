import React, { useEffect, useRef, useState } from "react";
import { logoutAPI } from "../../api/AuthAPI";
import { Link, useNavigate } from "react-router-dom";
import { ShowComponent } from "../../protected/ShowComponent";
import { FaUserAstronaut } from "react-icons/fa";

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
    <ul className="flex gap-4 pt-1 font-medium text-black md:pt-3 md:text-sm">
      <li ref={menuRef}>
        <button
          className="flex h-10 w-10 rounded-full bg-slate-200"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <FaUserAstronaut className="ml-2 mt-1.5 text-2xl text-cyan-700" />

          {/* <SlArrowDown className="ml-2 mt-1 pr-1" /> */}
        </button>
        {openMenu && (
          <div className="absolute right-0 z-50 mt-1 w-[8rem] rounded-md bg-slate-200 to-green-300 md:right-3 lg:right-16">
            <ul>
              <Link to="/manager">
                <ShowComponent roleRequired="Manager">
                  <li className="from-slate-300 to-slate-50 p-2 hover:rounded-t-sm hover:bg-gradient-to-l">
                    Manager Page
                  </li>
                </ShowComponent>
              </Link>
              <Link to="/profile">
                <li className="from-slate-300 to-slate-50 p-2 hover:rounded-t-sm hover:bg-gradient-to-l">
                  Profile
                </li>
              </Link>
              <li
                onClick={() => handleLogout()}
                className="from-slate-300 to-slate-50 p-2 hover:rounded-t-sm hover:bg-gradient-to-l"
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
