import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import Login from "../../customer/components/PopupLogin";
import LogoutAdmin from "./LogoutHeaderManager";
const ManagerHeader = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    isTest();
  }, []);

  const isTest = () => {
    //liểm tra coi có token không hiểm thị login logout
    const token = localStorage.getItem("jwt");
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
    return hasToken;
  };

  return (
    <div className="relative">
      <div className="flex justify-between border-b-[1px] border-white bg-gradient-to-br from-slate-400 via-slate-200 to-slate-300 pb-3 pl-9 pr-24 pt-3">
        <Link to="/manager">
          <img
            src={logo}
            className="mt-2 inline-block h-14 w-14 bg-gradient-to-br from-purple-200 via-green-500 to-cyan-400"
          />
        </Link>
        <ul className="font-base flex gap-4 pt-2 text-lg text-black md:text-xl">
          <li className="">
            <Link
              to="user"
              className="px-3 py-5 hover:bg-slate-50 hover:bg-opacity-25"
            >
              User
            </Link>
          </li>
          <li className="text-nowrap">
            <Link
              to="ban-list"
              className="px-3 py-5 hover:bg-slate-50 hover:bg-opacity-25"
            >
              Ban User
            </Link>
          </li>
          <li className="text-nowrap">
            <Link
              to="product-manager"
              className="px-3 py-5 hover:bg-slate-50 hover:bg-opacity-25"
            >
              Product Manager
            </Link>
          </li>
          <li className="text-nowrap">
            <Link
              to="labs-manager"
              className="px-3 py-5 hover:bg-slate-50 hover:bg-opacity-25"
            >
              labs Manager
            </Link>
          </li>
        </ul>
        {hasToken ? <LogoutAdmin /> : <Login />}
      </div>
    </div>
  );
};

export default ManagerHeader;
