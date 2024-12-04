import { useEffect, useState } from "react";
import {
  DeleteAllItemsAPI,
  getCurrentUserAddItemsAPI,
} from "../../api/CartAPI";
import CartItems from "../components/CartItems";

const CartPage = () => {
  const [cartItem, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const response = await getCurrentUserAddItemsAPI();
    setCartTotal(response.totalAmount); //lấy tổng giá tiền
    setCartItems(response.items); //lấy giá trị như price, description ...
  };

  const handleFetchAPI = () => {
    fetchAPI();
  };

  const handleClearAll = async () => {
    const response = await DeleteAllItemsAPI();
    if (response.success == true) {
      fetchAPI();
    }
  };

  return (
    <div>
      <h2 className="inline-block bg-gradient-to-t from-red-300 via-green-400 to-purple-300 bg-clip-text p-2 pl-7 pt-2 text-left text-2xl text-transparent">
        Shopping Cart
      </h2>
      <div className="grid grid-cols-7">
        <div className="col-span-5">
          {cartItem.map((items) => (
            <CartItems
              productId={items.productId}
              cartItemId={items.cartItemId}
              productName={items.productName}
              initQuantity={items.quantity}
              price={items.price}
              totalPrice={items.totalPrice}
              onFetchApi={handleFetchAPI}
            />
          ))}
        </div>
        <div className="col-span-2 mr-3 h-[20rem] rounded-md bg-gradient-to-tr from-pink-300 via-orange-200 to-red-300 p-5 text-center">
          <div className="mx-5 mb-5 h-[2px] w-[full] rounded-full bg-slate-500"></div>
          <h2 className="bg-gradient-to-r from-green-700 via-purple-400 to-cyan-900 bg-clip-text text-xl font-bold text-transparent">
            Total Amount
          </h2>
          <p className="text-lg font-bold text-red-400">{cartTotal}</p>
          <div className="mx-5 mt-5 h-[2px] w-[full] rounded-full bg-slate-500"></div>
          <button className="mt-5 w-full rounded-full bg-gradient-to-tr from-green-700 via-purple-400 to-cyan-900 py-3 text-center font-bold text-white">
            Checkout
          </button>
          <button
            onClick={() => handleClearAll()}
            className="mt-5 w-full rounded-full bg-gradient-to-tr from-red-700 via-purple-200 to-orange-900 py-3 text-center font-bold text-white"
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
