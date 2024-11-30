import React from "react";
import { Link } from "react-router-dom";

const Card = ({ productName, productPrice, productId, imagePath }) => {
  return (
    <div>
      <Link
        to={`/product-list/${productId}`}
        className="space-y-2 rounded-full px-4 text-base font-bold text-cyan-600"
      >
        <div className="h-[24rem] w-[17rem] space-y-4 rounded-xl border-2 border-solid border-slate-100 bg-slate-200 shadow-xl">
          <div>
            <img
              src={imagePath}
              alt="anh"
              className="h-[15rem] w-full rounded-t-xl"
            />
          </div>

          <div className="text-center">
            <h2 className="overflow-hidden text-ellipsis whitespace-nowrap">
              {productName}
            </h2>
            <div className="flex justify-center text-red-600">
              <p className="pt-[2px] font-semibold">$</p>
              <p className="text-lg font-extrabold">{productPrice}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
