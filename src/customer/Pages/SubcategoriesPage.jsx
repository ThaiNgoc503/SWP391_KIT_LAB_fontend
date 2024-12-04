import React, { useEffect, useState } from "react";
import { ShowCategories } from "../../protected/ShowCategories";
import { getProductAPI } from "../../api/ProductAPI";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const SubcategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const { subcategoryName } = useParams();

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const getAllProducts = await getProductAPI(); //lấy độ dài mãng
    setProducts(getAllProducts);
  };

  return (
    <div>
      <h2 className="inline-block bg-gradient-to-br from-purple-900 via-green-400 to-red-500 bg-clip-text pl-5 pt-5 text-2xl font-semibold text-transparent">
        {subcategoryName}
      </h2>
      <div className="grid grid-cols-2 justify-items-center pb-3 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ShowCategories currentSubCategoryId={product.subcategoryId}>
            <Card
              key={product.productId}
              imagePath={product.imagePath}
              productName={product.productName}
              productPrice={product.price}
              productId={product.productId}
            />
          </ShowCategories>
        ))}
      </div>
    </div>
  );
};

export default SubcategoriesPage;
