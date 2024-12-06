import React, { useEffect, useState } from "react";
import { getProductAPI } from "../../api/ProductAPI";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  // Lấy từ khóa từ query string
  const query = new URLSearchParams(location.search).get("q");

  const fetchAPI = async () => {
    try {
      const getAPI = await getProductAPI();
      setProducts(getAPI);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Lọc dữ liệu sau khi products được cập nhật
  useEffect(() => {
    if (query && products.length > 0) {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); 
    }
  }, [products, query]);

  return (
    <div>
      <div className="grid grid-cols-2 justify-items-center pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
    </div>
  );
};

export default SearchPage;
