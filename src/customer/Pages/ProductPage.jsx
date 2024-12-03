import { useEffect, useState } from "react";
import Card from "../../customer/components/Card";
import { getProductAPI, getProductPaginationAPI } from "../../api/ProductAPI";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLength, setProductLength] = useState();
  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const data = { PageNumber: pageNumber, PageSize: 12 }; //gồm số tang và độ dài của sản phẩm
    const response = await getProductPaginationAPI(data);
    setProduct(response);

    const getAllProducts = await getProductAPI(); //lấy độ dài mãng
    const length = Math.ceil(getAllProducts.length / 12); //lấy số trang
    setProductLength(length);
  };

  const loadData = async (pageNumber) => {
    //load lại data khi ra trước hoặc ra sau
    const data = { PageNumber: pageNumber, PageSize: 12 };
    const response = await getProductPaginationAPI(data);
    setProduct(response); //lấy đc 12 sản phẩm để hiện
    setPageNumber(pageNumber); //set lại số trang
  };

  return (
    <div>
      <h2 className="inline-block bg-gradient-to-br from-purple-900 via-green-300 to-red-900 bg-clip-text pl-7 pt-5 text-2xl font-semibold text-transparent">
        Stempede Shop All Product
      </h2>
      <div className="grid grid-cols-2 justify-items-center pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {product.map((product) => (
          <Card
            key={product.productId}
            imagePath={product.imagePath}
            productName={product.productName}
            productPrice={product.price}
            productId={product.productId}
          />
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
          {pageNumber < productLength && (
            <button
              className="text-2xl text-cyan-600"
              onClick={() => loadData(pageNumber + 1)}
            >
              <HiChevronDoubleRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
