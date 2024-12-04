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
      <div className="flex justify-between border-b-[1px] border-white bg-gradient-to-br from-purple-500 via-green-300 to-cyan-300 pb-3 pl-9 pr-24 pt-3">
        <img
          src={logo}
          className="mt-2 inline-block h-14 w-14 bg-gradient-to-br from-purple-500 via-green-500 to-cyan-400"
        />
        <ul className="font-base flex gap-4 pt-2 text-lg text-slate-100 md:text-xl">
          <li className="">
            <Link to="user">User</Link>
          </li>
          <li>
            <Link to="ban-list">Ban User</Link>
          </li>
          <li>
            <Link to="product-manager">Product Manager</Link>
          </li>
        </ul>
        {hasToken ? <LogoutAdmin /> : <Login />}
      </div>
    </div>
  );
};

export default ManagerHeader;
