import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getProductAPI, getProductPaginationAPI } from "../axios/Product";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [productAll, setProductAll] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLength, setProductLength] = useState();
  useEffect(() => {
    fetchAPI();
  }, []);
  const fetchAPI = async () => {
    const data = { PageNumber: pageNumber, PageSize: 12 };
    const response = await getProductPaginationAPI(data);
    const getAllData = await getProductAPI();
    setProductAll(getAllData);
    const length = Math.ceil(getAllData.length / 12);
    setProductLength(length);
    console.log(productLength);
    setProduct(response);
  };

  const loadData = async (pageNumber) => {
    const data = { PageNumber: pageNumber, PageSize: 12 };
    console.log(data);
    const response = await getProductPaginationAPI(data);
    setProduct(response);
    setPageNumber(pageNumber);
  };

  return (
    <div className="bg-slate-200">
      <h2 className="pt-5 text-center text-4xl font-bold">Stempede Shop</h2>
      <div className="pt-10 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {product.map((product) => (
          <Card
            key={product.productId}
            productName={product.productName}
            productPrice={product.price}
            productId={product.productId}
          />
        ))}
      </div>
      <div className="p-10 px-10 flex justify-between">
        <div>
          {pageNumber !== 1 && (
            <button
              className="text-cyan-600"
              onClick={() => loadData(pageNumber - 1)}
            >
              "trước"
            </button>
          )}
        </div>
        <div>
          {pageNumber < productLength && (
            <button
              className="text-cyan-600"
              onClick={() => loadData(pageNumber + 1)}
            >
              "Sau"
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
