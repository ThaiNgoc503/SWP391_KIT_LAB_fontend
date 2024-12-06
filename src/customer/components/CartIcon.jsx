import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CartIcon = () => {
  return (
    <li className="relative flex pb-2 pr-2 text-black">
      <Link to="/cart">
        <div className="absolute left-4 h-4 w-4 rounded-full bg-red-400 md:left-5 md:h-5 md:w-5">
          <p className="pl-[2px] text-xs md:pl-[3px] md:pt-[1px]">20</p>
        </div>
        <button>
          <FaShoppingCart className="ml-1 mt-2 text-sm md:text-xl" />
        </button>
      </Link>
    </li>
  );
};
