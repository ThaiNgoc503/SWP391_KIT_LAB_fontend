import React, { useEffect, useState } from "react";
import { getProductAPI } from "../../api/ProductAPI";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const SearchPage = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

  const handleSearch = (e) => {
    if (searchValue.trim()) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("q", searchValue.trim()); // Cập nhật giá trị `q`
      window.history.pushState(
        {},
        "",
        `${location.pathname}?${searchParams.toString()}`,
      );
      window.location.reload();
      e.preventDefault();
    }
  };
  return (
    <div>
      <form className="relative m-2 flex justify-end">
        <input
          type="text"
          placeholder="Enter product you want"
          className="h-[2rem] w-[10rem] rounded-md border-2 border-solid border-slate-300 px-2 py-1 pr-5 text-sm sm:h-[2.5rem] sm:w-[14rem] md:h-[3rem] md:w-[16rem] md:text-base lg:w-[22rem] lg:text-lg xl:h-[3.5rem] xl:w-[30rem] xl:text-xl"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-primary absolute right-1 top-1 rounded-md bg-cyan-700 p-1 text-white sm:right-2 sm:top-2 md:right-2 md:top-1.5 md:p-2.5 xl:top-[8px] xl:p-3"
        >
          <IoIosSearch />
        </button>
      </form>
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
