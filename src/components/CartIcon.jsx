import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Cart = () => {
  return (
    <li className="pb-2 relative flex">
      <Link to="/cart">
        <div className="w-5 h-5 text-xs absolute left-5 bg-red-400 rounded-full">
          <p className="pt-[1px] pl-[3px]">20</p>
        </div>
        <button>
          <FaShoppingCart />
        </button>
      </Link>
    </li>
  );
};
