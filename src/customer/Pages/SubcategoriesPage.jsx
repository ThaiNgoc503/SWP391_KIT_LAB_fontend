import React, { useEffect, useState } from "react";
import { ShowCategories } from "../../protected/ShowCategories";
import { getProductAPI, getProductPaginationAPI } from "../../api/ProductAPI";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";

const SubcategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLength, setProductLength] = useState();
  const { subcategoryName } = useParams();

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const data = { PageNumber: pageNumber, PageSize: 12 }; //gồm số tang và độ dài của sản phẩm
    const response = await getProductPaginationAPI(data);
    setProducts(response);

    const getAllProducts = await getProductAPI(); //lấy độ dài mãng
    const length = Math.ceil(getAllProducts.length / 12); //lấy số trang
    setProductLength(length);
  };

  return (
    <div>
      <h2 className="inline-block bg-gradient-to-br from-purple-900 via-green-400 to-red-500 bg-clip-text pl-5 pt-5 text-2xl font-semibold text-transparent">
        {subcategoryName}
      </h2>
      <div className="grid grid-cols-2 justify-items-center pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      <div className="flex justify-between p-10 px-10">
        <div>
          {pageNumber !== 1 && (
            <button
              className="text-2xl text-cyan-600"
              onClick={() => loadData(pageNumber - 1)}
            >
              <HiChevronDoubleLeft />
            </button>
          )}
        </div>
        <div>
          {pageNumber < productLength ||
            (!productLength == 1 && (
              <button
                className="text-2xl text-cyan-600"
                onClick={() => loadData(pageNumber + 1)}
              >
                <HiChevronDoubleRight />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoriesPage;
