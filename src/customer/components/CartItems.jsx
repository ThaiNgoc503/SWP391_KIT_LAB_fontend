import React, { useEffect, useState } from "react";
import { UpQuantity } from "../../api/CartAPI";

const CartItems = ({
  productName,
  initQuantity,
  price,
  totalPrice,
  cartItemId,
  onFetchApi,
}) => {
  const [quantity, setQuantity] = useState(initQuantity);

  const handleQuantityChange = (e) => {
    const newQuantity = Number.parseInt(e.target.value); // Lấy giá trị từ target
    setQuantity(newQuantity); // Cập nhật state số lượng
    updateData(newQuantity); // Gọi hàm cập nhật API
  };

  const updateData = async (newQuantity) => {
    await UpQuantity(newQuantity, cartItemId); // Gọi API
    onFetchApi(); // Cập nhật dữ liệu toàn bộ giỏ hàng
  };

  return (
    <div className="p-5">
      <div className="mx-5 h-[2px] w-[full] rounded-full bg-slate-500"></div>
      <div className="grid grid-cols-1 space-y-3 md:grid-cols-6">
        <div className="justify-items-center md:justify-items-start">
          <img
            className="mx-5 my-2 h-[12rem] w-[12rem] md:h-[5rem] md:w-[5rem]"
            src="https://images.pexels.com/photos/29554749/pexels-photo-29554749/free-photo-of-tuy-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>

        <div className="ml-5 mr-5">
          <p className="max-w-30 overflow-hidden text-ellipsis whitespace-nowrap text-center text-base font-bold md:text-start">
            {productName}
          </p>
        </div>
        <div className="space-y-4 text-center md:text-start">
          <p className="text-xl font-semibold md:text-base">Each</p>
          <p className="text-base font-bold text-red-500">{price}</p>
        </div>
        <div className="space-y-4 text-center md:text-start">
          <p className="text-xl font-semibold md:text-base">Quantity</p>
          <input
            type="number"
            className="w-20 border-2 border-solid border-slate-200 bg-slate-100"
            value={quantity}
            onChange={handleQuantityChange} // Truyền sự kiện đúng cách
            min={0}
            max={100}
          />
        </div>
        <div className="space-y-3 pb-10 text-center md:text-start">
          <p className="text-xl font-semibold md:text-base">Total</p>
          <p className="text-xl font-bold text-red-500">{totalPrice}</p>
        </div>
        <div className="flex h-20 justify-center pb-10 md:w-20">
          <button
            type="submit"
            className="w-full rounded-full bg-red-400 py-2 text-center hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
