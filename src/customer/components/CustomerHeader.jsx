import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./PopupLogin";
import Logout from "./Logout";
import logo from "../../assets/logo.svg";
import { getAllSubcategories } from "../../api/SubcategoriesAPI";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaPhoneSquareAlt,
} from "react-icons/fa";
import { CartIcon } from "./CartIcon";
import { IoIosSearch } from "react-icons/io";

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
    <div>
      <div className="flex items-center justify-around bg-cyan-600 py-2 text-white">
        <div>
          <p className="text-base">stempedeshop@gmail.com</p>
        </div>
        <div className="flex items-center space-x-4 md:ml-[30rem]">
          <div className="flex space-x-1 pt-2">
            <a href="https://www.linkedin.com/in/kit-and-lab-stempede-39b0a9340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              <FaLinkedin className="text-lg" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61570075288398">
              <FaFacebookSquare className="text-lg" />
            </a>
            <a href="https://www.instagram.com/stem.pedeshop/?igsh=MTh2cGpqdzR2aGN1MQ%3D%3D">
              <FaInstagramSquare className="text-lg" />
            </a>
          </div>
          <div>{hasToken ? <Logout /> : <Login />}</div>
        </div>
      </div>
      <div className="] flex items-center justify-around border-b-[1px] border-solid border-slate-100 bg-slate-50 py-2">
        <Link to={"/"}>
          <img src={logo} className="mr-36 mt-2 h-14 w-14" />
        </Link>
        <ul className="text-md flex gap-3 pt-2 font-semibold md:gap-5 md:text-lg">
          <li>
            <Link to="/">
              <p className="">Home</p>
            </Link>
          </li>
          <li ref={menuRef}>
            <button onClick={() => setOpenMenuCategory(!openMenuCategory)}>
              <p className={openMenuCategory ? "" : ""}>Category</p>
            </button>
            {openMenuCategory && (
              <div className="absolute z-50 mt-1 w-[10rem] bg-slate-100 transition-all ease-in-out md:w-[12rem]">
                <ul className="h-52 overflow-x-scroll text-black [&::-webkit-scrollbar]:hidden">
                  {subcategories.map((subcategories, index) => (
                    <Link
                      to={`subcategories/${subcategories.subcategoryName}/${subcategories.subcategoryId}`}
                    >
                      <li
                        key={index}
                        className="bg-opacity-50 p-2 text-sm font-medium hover:rounded-t-sm hover:bg-gradient-to-r hover:from-slate-300 hover:via-slate-200 hover:to-slate-100 hover:text-slate-900"
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
              <p>Product</p>
            </Link>
          </li>
        </ul>
        {/* <ul>
          <li className="pr-10 ">
            <CartIcon />
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default CustomerHeader;
