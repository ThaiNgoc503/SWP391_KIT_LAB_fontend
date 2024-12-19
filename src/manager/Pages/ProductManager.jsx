import React, { useEffect, useState } from "react";
import { deleteProductAPI, getProductAPI } from "../../api/ProductAPI";
import PopupAddNewProduct from "../components/PopupAddNewProduct";
import PopupUpdateProduct from "../components/PopupUpdateProduct";
import { FaPlus } from "react-icons/fa6";
import { RiExchange2Line } from "react-icons/ri";
import { IoIosRemoveCircleOutline, IoIosSearch } from "react-icons/io";
import Notification from "../../customer/components/Notification";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const ProductManager = () => {
  const [product, setProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [openPopupAddNew, setOpenPopupAddNew] = useState(false);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productLength, setProductLength] = useState();
  const [notification, setNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const totalPages = productLength;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const getAllProducts = await getProductAPI(); //lấy độ dài mãng
    setProduct(getAllProducts);
    setFilterProduct(getAllProducts);
    const length = Math.ceil(getAllProducts.length / 10); //lấy số trang
    setProductLength(length);
  };

  const handleClosePopupAddNew = () => {
    setOpenPopupAddNew(false);
  };
  const handleClosePopupUpdate = () => {
    setOpenPopupUpdate(false);
  };

  const handleUpdate = (currentId) => {
    const productToUpdate = product.find((p) => p.productId === currentId);
    if (productToUpdate) {
      setSelectedProduct(productToUpdate); // Lưu thông tin sản phẩm được chọn
      setOpenPopupUpdate(true);
    }
  };

  const handleDelete = async (currentId) => {
    const productFind = product.find((p) => currentId === p.productId);
    if (productFind) {
      const isConfirmed = confirm("Do you want to delete the product?");
      if (isConfirmed) {
        const response = await deleteProductAPI(productFind.productId);
        if (response) {
          if (response.data.success === true) {
            const update = product.filter(
              (product) => currentId != product.productId,
            );
            setFilterProduct(update);
          } else {
            alert("Fail to Delete");
          }
        } else {
          setNotification(true);

          setTimeout(() => {
            setNotification(false);
          }, 3000);
        }
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchValue && searchValue.length > 0) {
      setCurrentPage(1);
      const data = product.filter((product) =>
        product.productName.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilterProduct(data);
      const length = Math.ceil(data.length / 10);
      setProductLength(length);
    } else {
      setFilterProduct(product);
      const length = Math.ceil(product.length / 10);
      setProductLength(length);
    }
  };

  const pagination = () => {
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    return filterProduct.slice(start, end);
  };

  return (
    <div className="bg-slate-100 pt-5">
      {/* ADD NEW */}
      {openPopupAddNew && (
        <PopupAddNewProduct
          handleClosePopupAddNew={handleClosePopupAddNew}
          fetchProduct={() => fetchData()}
        />
      )}
      {/* ------ */}

      <div className="flex items-center justify-end pb-5 pr-10">
        <form onSubmit={handleSearch} className="relative inline-block">
          <input
            type="text"
            placeholder="Enter user you want"
            className="h-[2rem] w-[10rem] rounded-lg border-[1px] border-solid border-cyan-100 px-2 py-1 pr-5 text-sm sm:h-[2.5rem] sm:w-[14rem] md:h-[2.5rem] md:w-[16rem] md:text-base lg:h-10 lg:w-[20rem] lg:text-lg"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary absolute right-1 top-1 rounded-md bg-cyan-600 p-1 text-white sm:right-2 sm:top-1 md:right-1 md:top-1 md:p-2 xl:top-[4px] xl:p-2"
          >
            <IoIosSearch />
          </button>
        </form>
        <div className="flex justify-end">
          <button
            onClick={() => setOpenPopupAddNew(!openPopupAddNew)}
            className="m-3 flex items-center gap-2 rounded-md bg-green-400 p-2 px-3 text-white"
          >
            <FaPlus />
            Add new
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <table className="max-w-screen mx-3 text-left text-base text-black">
          <thead className="border-b-[5px] border-slate-100 bg-white text-sm uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-3 py-2">
                #
              </th>
              <th scope="col" className="px-3 py-3">
                Name
              </th>
              <th scope="col" className="px-3 py-3">
                image
              </th>
              <th scope="col" className="px-3 py-3">
                Description
              </th>

              <th scope="col" className="px-3 py-3">
                Price
              </th>
              <th scope="col" className="px-3 py-3">
                Stock Quantity
              </th>
              <th scope="col" className="px-3 py-3">
                Ages
              </th>
              <th scope="col" className="px-2 py-3">
                Lab Name
              </th>
              <th scope="col" className="px-2 py-3">
                Subcategory Name
              </th>
              <th scope="col" className="px-2 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {pagination().length === 0 ? (
              <tr>
                <td colSpan="11" className="px-6 py-4 text-center">
                  No Product found.
                </td>
              </tr>
            ) : (
              pagination().map((product, index) => (
                <tr key={product.productId} className="border-b-[2px] bg-white">
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r-[1px] px-6 py-4 text-xl font-medium text-cyan-600"
                  >
                    {(currentPage - 1) * 10 + index + 1}
                  </th>
                  <td className="border-r-[1px] px-3 py-2">
                    {product.productName}
                  </td>
                  <td className="break-all border-r-[1px] px-2 py-2">
                    <img
                      src={product.imagePath}
                      alt="picture wrong"
                      className="w-[10rem] pb-2"
                    />
                    <a href={product.imagePath} target="_blank">
                      {product.imagePath}
                    </a>
                  </td>
                  <td className="border-r-[1px] px-3 py-2">
                    {product.description}
                  </td>
                  <td className="border-r-[1px] px-3 py-2">{product.price}</td>
                  <td className="border-r-[1px] px-3 py-2">
                    {product.stockQuantity}
                  </td>
                  <td className="border-r-[1px] px-3 py-2">{product.ages}</td>

                  <td className="border-r-[1px] px-2 py-2">
                    {product.labName}
                  </td>
                  <td className="border-r-[1px] px-2 py-2">
                    {product.subcategoryName}
                  </td>

                  <td className="border-r-[1px] px-2 py-2">
                    <div className="flex flex-col gap-y-3">
                      <button
                        onClick={() => handleUpdate(product.productId)}
                        className="flex items-center gap-2 rounded-md bg-green-400 p-1 px-2 text-white"
                      >
                        <RiExchange2Line />
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(product.productId)}
                        className="flex items-center gap-2 rounded-md bg-red-400 p-1 px-2 text-white"
                      >
                        <IoIosRemoveCircleOutline />
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {openPopupUpdate && setSelectedProduct && (
          <PopupUpdateProduct
            handleClosePopupUpdate={handleClosePopupUpdate}
            product={selectedProduct}
            fetchProduct={() => fetchData()}
          />
        )}
      </div>
      <div className="p-10">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {notification && (
        <Notification
          notificationMessage={"The Product already sold at least once"}
        />
      )}
    </div>
  );
};

export default ProductManager;
