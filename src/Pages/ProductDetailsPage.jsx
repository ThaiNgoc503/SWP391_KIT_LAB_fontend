import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductByIdAPI } from "../api/Product";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetchAPI();
  }, [id]);

  const fetchAPI = async () => {
    const response = await getProductByIdAPI(id);
    setProduct(response);
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
          alt="hinh"
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
          <p className="px-5">
            {product.description}
          </p>
          <div className="w-[36rem] mx-5 h-[2px] rounded-full bg-slate-500"></div>
          <div className="text-center space-x-6 space-y-4">
            <button className="bg-cyan-300 rounded-full px-5 py-3 shadow-lg shadow-slate-500">
              Add to Cart
            </button>
            <button className="bg-green-400 rounded-full px-7 py-3 shadow-lg shadow-slate-500">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
