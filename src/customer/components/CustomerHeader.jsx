import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./PopupLogin";
import Logout from "./Logout";
import logo from "../../assets/logo.svg";

import { getAllSubcategories } from "../../api/SubcategoriesAPI";
const CustomerHeader = () => {
  const [hasToken, setHasToken] = useState(false);
  const menuRef = useRef();
  const token = localStorage.getItem("jwt");
  const [openMenuCategory, setOpenMenuCategory] = useState(false);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    tokenTest();
  }, [token]);

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuCategory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  //kiểm tra nếu có token sẽ ẩn logout và ngược lại
  const tokenTest = () => {
    setHasToken(!!token);
  };

  const fetchAPI = async () => {
    const response = await getAllSubcategories();
    setSubcategories(response);
  };

  return (
    <div className="flex justify-between border-b-[1px] border-solid border-slate-100 bg-gradient-to-r from-green-300 via-teal-300 to-cyan-200 py-3 pl-9 pr-24">
      <img
        src={logo}
        className="mt-2 inline-block h-14 w-14 bg-gradient-to-br from-purple-500 via-green-500 to-cyan-400"
      />
      <ul className="text-md flex gap-3 pt-2 font-semibold text-slate-100 md:gap-5 md:text-lg">
        <li>
          {" "}
          <Link to="/">
            <p className="ease-in-outs rounded-[50%_30%_50%_30%] from-cyan-500 via-green-400 to-green-300 px-2 py-1 transition-all hover:-translate-y-1 hover:bg-gradient-to-br">
              Home
            </p>
          </Link>
        </li>
        <li ref={menuRef}>
          <button onClick={() => setOpenMenuCategory(!openMenuCategory)}>
            <p
              className={
                openMenuCategory
                  ? "ease-in-outs rounded-[50%_30%_50%_30%] bg-gradient-to-br from-cyan-500 via-green-400 to-green-300 px-2 py-1 transition-all hover:-translate-y-1"
                  : "ease-in-outs rounded-[50%_30%_50%_30%] from-cyan-500 via-green-400 to-green-300 px-2 py-1 transition-all hover:-translate-y-1 hover:bg-gradient-to-br"
              }
            >
              Category
            </p>
          </button>
          {openMenuCategory && (
            <div className="absolute z-50 mt-1 w-[10rem] rounded-md bg-gradient-to-t from-green-400 via-green-300 to-cyan-300 transition-all ease-in-out md:w-[12rem]">
              <ul className="h-52 overflow-x-scroll text-black [&::-webkit-scrollbar]:hidden">
                {subcategories.map((subcategories, index) => (
                  <Link
                    to={`subcategories/${subcategories.subcategoryName}/${subcategories.subcategoryId}`}
                  >
                    <li
                      key={index}
                      className="bg-opacity-50 p-2 text-base font-semibold text-slate-100 hover:rounded-t-sm hover:bg-gradient-to-r hover:from-green-300 hover:via-green-200 hover:to-cyan-100 hover:text-white"
                    >
                      {subcategories.subcategoryName}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </li>
        <li>
          <Link to="/product-list">
            <p className="ease-in-outs rounded-[50%_30%_50%_30%] from-cyan-500 via-green-400 to-green-300 px-2 py-1 transition-all hover:-translate-y-1 hover:bg-gradient-to-br">
              Product
            </p>
          </Link>
        </li>
      </ul>
      {hasToken ? <Logout /> : <Login />}
    </div>
  );
};

export default CustomerHeader;
