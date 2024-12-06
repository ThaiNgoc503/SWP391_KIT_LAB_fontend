import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { getProductAPI } from "../../api/ProductAPI";

const CategoryHome = ({ currentSubCategoryId, subcategoryName }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getDataAPI();
  }, []);

  const getDataAPI = async () => {
    const response = await getProductAPI();
    setProduct(response);
  };

  const filteredProducts = product
    .filter((product) => product.subcategoryId === currentSubCategoryId)
    .slice(0, 4);

  return (
    <div className="mx-2 mt-10 space-y-2 rounded-lg bg-slate-100 px-5 py-5 md:mx-[85px] md:px-[1rem]">
      <h2 className="text-xl font-semibold">{subcategoryName}</h2>
      <hr />
      <div className="ml-5 grid grid-cols-2 md:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.productId}
            imagePath={product.imagePath}
            productName={product.productName}
            productPrice={product.price}
            productId={product.productId}
          />
        ))}
      </div>
      <div className="pt-6 text-center text-black">
        <Link
          to={`/subcategories/${subcategoryName}/${currentSubCategoryId}`}
          className="font-base rounded-md bg-slate-200 px-5 py-2 text-lg text-cyan-600 hover:bg-cyan-600 hover:text-white"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default CategoryHome;
