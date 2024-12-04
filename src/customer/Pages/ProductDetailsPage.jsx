import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductByIdAPI } from "../../api/ProductAPI";
import { AddItemsAPI } from "../../api/CartAPI";
import Notification from "../components/Notification";
import { ShowComponent } from "../../protected/ShowComponent";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [openAddToCart, setOpenAddToCart] = useState(false);
  const [noitification, setNoitification] = useState(false);
  const [noitificationForGuest, setNoitificationForGuest] = useState(false);
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

  const getUserRole = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return null;
    const user = JSON.parse(token);
    return user.ROLE;
  };

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

  const handleOpenAddToCart = () => {
    setOpenAddToCart(!openAddToCart);
    const role = getUserRole();
    if (!["Manager", "Customer"].includes(role)) {
      setNoitificationForGuest(true);
    }
    setTimeout(() => {
      setNoitificationForGuest(false);
    }, 1000);
  };
  const handleBuy = () => {
    const role = getUserRole();
    if (!["Manager", "Customer"].includes(role)) {
      setNoitificationForGuest(true);
    }
    setTimeout(() => {
      setNoitificationForGuest(false);
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
            {product.price}&#8363;
          </p>

          <p className="">{product.description}</p>
          <div className="space-x-6 space-y-4">
            <button
              onClick={() => handleOpenAddToCart()}
              className="rounded-lg bg-cyan-300 px-2 py-2 font-semibold text-slate-100 shadow-md shadow-green-200"
            >
              Add To Cart
            </button>
            <button
              onClick={() => handleBuy()}
              className="rounded-lg bg-green-400 px-2 py-2 font-semibold text-slate-100 shadow-md shadow-cyan-200"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      <ShowComponent roleRequired={["Manager", "Customer"]}>
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
          <Notification notificationMessage={"Add to cart successfully"} />
        )}
      </ShowComponent>
      {noitificationForGuest && (
        <Notification notificationMessage={"You Need To Login To Buy"} />
      )}
    </div>
  );
};

export default ProductDetailsPage;
