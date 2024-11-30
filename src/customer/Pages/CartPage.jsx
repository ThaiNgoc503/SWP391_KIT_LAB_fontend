import { useEffect, useState } from "react";
import { getCurrentUserAddItemsAPI } from "../../api/CartAPI";
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

  return (
    <div>
      <h2 className="text-center">My Cart</h2>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          {cartItem.map((items) => (
            <CartItems
              cartItemId={items.cartItemId}
              productName={items.productName}
              initQuantity={items.quantity}
              price={items.price}
              totalPrice={items.totalPrice}
              onFetchApi={handleFetchAPI}
            />
          ))}
        </div>
        <div className="text-center  p-5">
          <div className="w-[full] mx-5 h-[2px] rounded-full bg-slate-500 mb-5"></div>
          <p className="font-bold text-xl">Total Amount</p>
          <p className="text-lg font-semibold text-red-500">{cartTotal}</p>
          <div className="w-[full] mx-5 h-[2px] mt-5 rounded-full bg-slate-500"></div>
          <button className="hover:bg-slate-800  hover:text-white mt-5 bg-slate-400 w-full py-3 text-center rounded-full">
            Checkout
          </button>
          <button className="hover:bg-red-600 hover:text-white mt-5 bg-red-400 w-full py-3 text-center rounded-full">
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
