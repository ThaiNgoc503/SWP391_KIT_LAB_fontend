import React, { useEffect, useState } from "react";
import { getCurrentUserAddItemsAPI } from "../axios/Cart";
import CartItems from "../components/CartItems";

const CartPage = () => {
  const [cartItem, setCartItems] = useState([]);
  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const response = await getCurrentUserAddItemsAPI();
    setCartItems(response.items);
  };

  return (
    <div>
      <h2 className="text-center">My Cart</h2>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          {cartItem.map((items) => (
            <CartItems productName={items.productName} initQuantity={items.quantity} price={items.price} totalPrice={items.totalPrice} />
          ))}
        </div>
        <div className="text-center pt-5">
          <div className="w-[full] mx-5 h-[2px] rounded-full bg-slate-500 mb-5"></div>
          <p className="font-bold text-xl">Total Amount</p>
          <p className="text-lg font-semibold text-red-500">7999.99</p>
          <div className="w-[full] mx-5 h-[2px] mt-5 rounded-full bg-slate-500"></div>
          <button className="hover:bg-slate-800 hover:text-white mt-5 bg-slate-400 w-full py-3 text-center rounded-full">
            Checkout
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
