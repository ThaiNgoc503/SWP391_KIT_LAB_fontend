import React from "react";
import { Link } from "react-router-dom";

const Card = ({ productName, productPrice, productId, imagePath }) => {
  return (
    <div className="m-1 inline-block h-[7rem] w-[5rem] space-y-4 overflow-hidden rounded-md bg-slate-50 hover:border-[1px] hover:border-solid hover:border-cyan-700 md:h-[12rem] md:w-[6.5rem] lg:h-[15rem] lg:w-[10rem] xl:h-[18rem] xl:w-[12.5rem]">
      <Link to={`/product-list/${productId}`}>
        <img
          src={imagePath}
          alt="anh"
          className="h-[5rem] w-full rounded-t-md md:h-[9rem] lg:h-[12rem] xl:h-[14.5rem]"
        />

        <h2 className="w-[10] overflow-hidden text-ellipsis whitespace-nowrap px-2 text-xs text-cyan-700 md:text-sm lg:text-base xl:text-lg">
          {productName}
        </h2>
        <div className="pl-2 text-red-400">
          <p className="text-xs md:text-sm lg:text-base xl:text-lg">
            {productPrice}&#8363;
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
