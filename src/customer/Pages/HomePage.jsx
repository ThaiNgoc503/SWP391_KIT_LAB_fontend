import React from "react";
import { Link } from "react-router-dom";
import robotics from "../../assets/robotics_v2.svg";

const HomePage = () => {
  return (
    <div>
      <div className="h-[22rem] w-full bg-gradient-to-r from-green-300 via-teal-300 to-cyan-200 p-10 text-left md:h-[24rem]">
        <div className="space-y-4 lg:pl-10">
          <div className="space-y-2">
            <p className="text-4xl font-semibold md:text-6xl">WELCOM TO </p>
            <h1 className="inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent md:text-4xl">
              STEMPEDE KIT LAB SHOP
            </h1>
          </div>
          <div className="space-y-1 text-lg font-light">
            <p>Many kit</p>
            <p>Lower price</p>
            <p>Good Lab</p>
            <p>Good Support</p>
          </div>
          <div className="relative inline-block h-[55px] overflow-hidden">
            <Link
              to="product-list"
              className="rounded-lg bg-gradient-to-tr from-purple-400 via-purple-300 to-violet-400 px-5 pb-4 text-center font-bold before:absolute before:-left-[100%] before:top-0 before:inline-block before:h-[40px] before:w-[100%] before:rounded-lg before:bg-gradient-to-bl before:from-cyan-600 before:via-cyan-300 before:to-green-300 before:transition-all before:ease-in-out before:content-['Buy_Now'] hover:before:left-0 hover:before:transition-all hover:before:ease-in-out"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <div className="absolute -right-40 top-24 z-0 w-[30rem] lg:right-10 lg:top-24">
          <img
            src={robotics}
            alt="anh"
            className="h-[15rem] rounded-b-full rounded-tl-full md:h-[18rem] lg:h-[20rem]"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default HomePage;
