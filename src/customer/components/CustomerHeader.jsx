import React, { useEffect, useState } from "react";
import logo from "../../assets/kitlab_logo.webp";
import { Link } from "react-router-dom";
import Login from "./PopupLogin";
import Logout from "./Logout";
const CustomerHeader = () => {
  const [hasToken, setHasToken] = useState(false);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    tokenTest();
  }, [token]);

  //kiểm tra nếu có token sẽ ẩn logout và ngược lại
  const tokenTest = () => {
    setHasToken(!!token);
  };

  return (
    <div className="mx-0 flex justify-between bg-slate-400 pb-3 pl-9 pr-24 pt-3">
      <img src={logo} className="h-14 w-14" />
      <ul className="flex gap-5 pt-2 text-2xl font-bold">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Contact</Link>
        </li>
        <li>
          <Link to="/product-list">Product</Link>
        </li>
      </ul>
      {hasToken ? <Logout /> : <Login />}
    </div>
  );
};

export default CustomerHeader;
