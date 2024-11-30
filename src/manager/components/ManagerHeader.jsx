import { useEffect, useState } from "react";
import logo from "../../assets/kitlab_logo.webp";
import { Link } from "react-router-dom";
import Login from "../../customer/components/PopupLogin";
import Logout from "../../customer/components/Logout";
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
      <div className="flex justify-between bg-slate-400 pb-3 pl-9 pr-24 pt-3">
        <img src={logo} className="h-14 w-14" />
        <ul className="flex gap-5 pt-2 text-2xl font-bold">
          <li>
            <Link to="user">User</Link>
          </li>
          <li>
            <Link to="ban-list">Ban User</Link>
          </li>
          <li>
            <Link to="product-manager">Product Manager</Link>
          </li>
        </ul>
        {hasToken ? <Logout /> : <Login />}
      </div>
      <div className="absolute bottom-0 h-1 w-full bg-black"></div>
    </div>
  );
};

export default ManagerHeader;
