import React, { useEffect, useState } from "react";
import { DeleteItemsAPI, UpQuantity } from "../../api/CartAPI";
import { Link } from "react-router-dom";

const CartItems = ({
  productName,
  initQuantity,
  price,
  totalPrice,
  cartItemId,
  productId,
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

  const handleDelete = async (cartItemId) => {
    const response = await DeleteItemsAPI(cartItemId);
    if (response.success == true) {
      onFetchApi();
    }
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-6 space-x-3 md:grid-cols-6">
        <div className="justify-items-center md:justify-items-start">
          <Link to={`/product-list/${productId}`}>
            <img
              className="mx-5 my-2 h-[3rem] w-[3rem] md:h-[4rem] md:w-[4rem]"
              src="https://images.pexels.com/photos/29554749/pexels-photo-29554749/free-photo-of-tuy-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
          </Link>
        </div>

        <div className="ml-5 mr-5 space-x-2 space-y-3">
          <p className="w-16 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold md:text-start md:text-base">
            {productName}
          </p>
          <p className="text-sm font-bold text-red-400 md:hidden">{price}</p>
        </div>
        <div className="hidden space-y-3 text-start md:block">
          <p className="text-sm font-semibold md:text-base">Each</p>
          <p className="text-sm font-bold text-red-400">{price}</p>
        </div>
        <div className="space-y-3 text-start">
          <p className="text-sm font-semibold md:text-base">Quantity</p>
          <input
            type="number"
            class="mb-1 block text-sm text-slate-600"
            value={quantity}
            onChange={handleQuantityChange} // Truyền sự kiện đúng cách
            min={0}
            max={100}
          />
        </div>
        <div className="space-y-3 text-start">
          <p className="text-sm font-semibold md:text-base">Total</p>
          <p className="text-sm font-bold text-red-400">{totalPrice}</p>
        </div>
        <div className="flex h-20 justify-center pb-12 md:w-20">
          <button
            onClick={() => handleDelete(cartItemId)}
            type="submit"
            className="rounded-full bg-red-400 bg-gradient-to-br from-purple-300 via-red-300 px-2 text-center font-semibold ring-offset-red-500 hover:bg-gradient-to-t"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
