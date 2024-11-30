import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductByIdAPI } from "../../api/ProductAPI";
import { AddItemsAPI } from "../../api/CartAPI";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [openAddToCart, setOpenAddToCart] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenAddToCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchAPI();
  }, [id]);

  const fetchAPI = async () => {
    const response = await getProductByIdAPI(id);
    setProduct(response);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const data = {
      productId: product.productId,
      quantity: quantity,
    };
    await AddItemsAPI(data);
    setQuantity(1);
  };

  return (
    <div className="bg-slate-200">
      <div className="flex pl-3 bg-slate-200 border-solid border-2">
        <Link to="/product-list" className="text-base">
          &gt;Product
        </Link>
        <p className="text-base">&gt;Product details</p>
      </div>

      <div className="grid grid-col-1 justify-items-center md:grid-cols-2 p-5">
        <img
          src={product.imagePath}
          alt="anh"
          className="w-[30rem] h-[25rem] m-5 rounded-xl md:w-[40rem] mx-5"
        />
        <div className="pt-4 space-y-3">
          <h2 className="text-center text-xl font-bold p-5 pb-3">
            {product.productName}
          </h2>
          <div className="flex  justify-center">
            <p className="text-base font-semibold">age: {product.ages}</p>
          </div>
          <p className="md:pt-6 px-5 text-red-500 text-xl font-extrabold text-center">
            ${product.price}
          </p>

          <div className="w-[36rem] mx-5 h-[2px] rounded-full bg-slate-500"></div>
          <p className="px-5">{product.description}</p>
          <div className="w-[36rem] mx-5 h-[2px] rounded-full bg-slate-500"></div>
          <div className="text-center space-x-6 space-y-4 ">
            <button
              onClick={() => setOpenAddToCart(!openAddToCart)}
              className="bg-cyan-300 rounded-full px-5 py-3 shadow-lg shadow-slate-500"
            >
              Add to Cart
            </button>
            <button className="bg-green-400 rounded-full px-7 py-3 shadow-lg shadow-slate-500">
              Buy now
            </button>
          </div>
        </div>
      </div>

      {openAddToCart && (
        <div
          ref={menuRef}
          className=" gap-4 fixed bottom-0 right-0 bg-white h-[25rem] w-[25rem] z-50 p-5 rounded-ss-2xl shadow-xl bg-opacity-100"
        >
          <form onSubmit={handleAddToCart} className="text-center space-y-5">
            <div className="flex items-center justify-center">
              <img src={product.imagePath} alt="" className="w-32 h-32" />
            </div>
            <div>
              <p className="font-semibold text-xl">{product.productName}</p>
              <p>Stock Quantity: {product.stockQuantity}</p>
            </div>

            <div className="space-y-3">
              <p>Quantity:</p>
              <input
                type="number"
                className="text-white p-1 px-2 w-[10rem] border-solid border-2 border-slate-300 rounded-lg bg-slate-400"
                min={0}
                max={100}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-300 rounded-full px-5 py-3 shadow-lg shadow-slate-500"
            >
              Add to Cart
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
