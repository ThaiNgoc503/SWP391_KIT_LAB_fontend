import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Cart = () => {
  return (
    <li className="relative flex pb-2 pr-2">
      <Link to="/cart">
        <div className="absolute left-5 h-5 w-5 rounded-full bg-red-400 text-xs">
          <p className="pl-[3px] pt-[1px]">20</p>
        </div>
        <button>
          <FaShoppingCart className="mt-2 text-xl" />
        </button>
      </Link>
    </li>
  );
};
