import { useEffect, useState } from "react";
import Card from "../../customer/components/Card";
import { getProductAPI, getProductPaginationAPI } from "../../api/ProductAPI";

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

    const getAllProducts = await getProductAPI();                 //lấy độ dài mãng
    const length = Math.ceil(getAllProducts.length / 12);        //lấy số trang
    setProductLength(length);                                    
    
  };

  const loadData = async (pageNumber) => {               //load lại data khi ra trước hoặc ra sau
    const data = { PageNumber: pageNumber, PageSize: 12 };
    const response = await getProductPaginationAPI(data);
    setProduct(response);                             //lấy đc 12 sản phẩm để hiện
    setPageNumber(pageNumber);                        //set lại số trang
  };

  return (
    <div  className="bg-slate-200">
      <h2 className="pt-5 text-center text-4xl font-bold">Stempede Shop</h2>
      <div className="pt-10 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
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
