import React, { useState } from "react";

const CartItems = ({productName, initQuantity, price, totalPrice}) => {
  const [quantity, setQuantity] = useState(initQuantity);

  return (
    <div className="p-5">
      <div className="w-[full] mx-5 h-[2px] rounded-full bg-slate-500"></div>
      <div className="grid grid-cols-1 md:grid-cols-6 space-y-3">
        <div className="justify-items-center md:justify-items-start">
          <img
            className="w-[12rem] h-[12rem] md:w-[5rem] md:h-[5rem]  mx-5 my-2"
            src="https://images.pexels.com/photos/29554749/pexels-photo-29554749/free-photo-of-tuy-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>

        <div className="ml-5 mr-5">
          <p className="text-center md:text-start font-bold text-base whitespace-nowrap text-ellipsis overflow-hidden  max-w-30">
           {productName}
          </p>
        </div>
        <div className="text-center md:text-start space-y-4">
          <p className="font-semibold text-xl md:text-base">Each</p>
          <p className="text-red-500 text-base font-bold">{price}</p>
        </div>
        <div className="text-center md:text-start space-y-4">
          <p className="font-semibold text-xl md:text-base">Quantity</p>

          <input
            type="number"
            className="w-20 bg-slate-100 border-solid border-2 border-slate-200"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={0}
            max={100}
          />
        </div>
        <div className="space-y-3 pb-10 text-center md:text-start">
          <p className="font-semibold text-xl md:text-base">Total</p>
          <p className="text-red-500 text-xl font-bold">{totalPrice}</p>
        </div>
        <div className="flex justify-center pb-10 h-20 md:w-20">
          <button type="submit" className="bg-red-400 hover:bg-red-600  w-full py-2 text-center rounded-full">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
