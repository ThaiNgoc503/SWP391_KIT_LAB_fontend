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
    <div className="mx-2 ml-5 mt-10 w-[24rem] space-y-2 rounded-lg bg-white px-2 py-5 sm:w-[28rem] md:ml-10 md:w-[30rem] lg:w-[45rem] xl:ml-10 xl:w-[55rem]">
      <h2 className="text-xl font-semibold">{subcategoryName}</h2>
      <hr />
      <div className="ml-5 flex w-full">
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
          className="font-base rounded-md bg-slate-50 px-5 py-2 text-lg text-cyan-600 hover:bg-cyan-600 hover:text-white"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default CategoryHome;
