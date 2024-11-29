import React from "react";
import { Link } from "react-router-dom";

const Card = ({ productName, productPrice, productId }) => {
  return (
    <div>
      <Link
        to={`/product-list/${productId}`}
        className="space-y-2 rounded-full px-4  text-base font-bold text-cyan-600"
      >
        <div className="w-[17rem] h-[24rem] bg-slate-200 rounded-xl shadow-xl border-solid border-slate-100 border-2 space-y-4">
          <div>
            <img
              src="https://images.pexels.com/photos/29542292/pexels-photo-29542292/free-photo-of-d-ng-mon-trong-r-ng-mua-thu-s-ng-mu-v-i-anh-sang-m-t-tr-i.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="hinh"
              className="w-full h-[15rem] rounded-t-xl"
            />
          </div>

          <div className="text-center">
            <h2 className="whitespace-nowrap	overflow-hidden text-ellipsis">
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
