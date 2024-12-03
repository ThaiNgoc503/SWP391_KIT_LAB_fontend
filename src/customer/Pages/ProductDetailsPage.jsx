import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductByIdAPI } from "../../api/ProductAPI";
import { AddItemsAPI } from "../../api/CartAPI";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [openAddToCart, setOpenAddToCart] = useState(false);
  const [noitification, setNoitification] = useState(false);
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
    setNoitification(true);
    setTimeout(() => {
      setNoitification(false);
    }, 1000);
  };

  return (
    <div>
      <div className="grid grid-cols-2 p-5 md:px-20">
        <img
          src={product.imagePath}
          alt="anh"
          className="m-5 mx-5 h-[12rem] w-[15rem] rounded-xl md:h-[20rem] md:w-[25rem]"
        />
        <div className="space-y-3 pt-4">
          <h2 className="pb-1 text-xl font-bold">{product.productName}</h2>
          <div>
            <Link
              to={`/subcategories/${product.subcategoryName}/${product.subcategoryId}`}
            >
              <p className="inline-block rounded-md bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300 px-2 py-1 text-slate-100">
                {product.subcategoryName}
              </p>
            </Link>
          </div>
          <div className="flex">
            <p className="text-base font-semibold">age: {product.ages}</p>
          </div>
          <p className="text-xl font-extrabold text-red-500 md:pt-4">
            ${product.price}
          </p>

          <p className="">{product.description}</p>
          <div className="space-x-6 space-y-4">
            <button
              onClick={() => setOpenAddToCart(!openAddToCart)}
              className="rounded-lg bg-cyan-300 px-2 py-2 font-semibold text-slate-100 shadow-md shadow-green-200"
            >
              Add To Cart
            </button>
            <button className="rounded-lg bg-green-400 px-2 py-2 font-semibold text-slate-100 shadow-md shadow-cyan-200">
              Buy now
            </button>
          </div>
        </div>
      </div>

      {openAddToCart && (
        <div
          ref={menuRef}
          className="fixed bottom-0 right-0 z-50 h-[25rem] w-[25rem] gap-4 rounded-ss-2xl bg-opacity-100 bg-gradient-to-tr from-cyan-300 via-green-300 to-purple-200 p-5 shadow-xl"
        >
          <form onSubmit={handleAddToCart} className="space-y-5 text-center">
            <div className="flex items-center justify-center">
              <img src={product.imagePath} alt="" className="h-32 w-32" />
            </div>
            <div>
              <p className="text-xl font-semibold">{product.productName}</p>
              <p>Stock Quantity: {product.stockQuantity}</p>
            </div>

            <div className="space-y-3">
              <p>Quantity:</p>
              <input
                type="number"
                className="w-[10rem] rounded-lg border-2 border-solid bg-slate-100 p-1 px-2"
                min={0}
                max={100}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-br from-cyan-100 via-blue-300 to-blue-200 px-5 py-3 shadow-lg shadow-slate-500"
            >
              Add to Cart
            </button>
          </form>
        </div>
      )}
      {noitification && (
        <div
          id="toast-simple"
          class="absolute right-3 top-4 flex w-full max-w-xs items-center space-x-4 divide-x divide-gray-200 rounded-lg bg-green-300 p-4 font-semibold text-white shadow transition-all ease-in-out rtl:space-x-reverse rtl:divide-x-reverse"
          role="alert"
        >
          <svg
            class="h-5 w-5 rotate-45 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
            />
          </svg>
          <div class="ps-4 text-sm font-normal">Add to cart successfully.</div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
