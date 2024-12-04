import React, { useEffect, useState } from "react";
import {
  deleteProductAPI,
  getProductAPI,
  getProductPaginationAPI,
} from "../../api/ProductAPI";
import PopupAddNewProduct from "../components/PopupAddNewProduct";
import PopupUpdateProduct from "../components/PopupUpdate";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const ProductManager = () => {
  const [product, setProduct] = useState([]);
  const [openPopupAddNew, setOpenPopupAddNew] = useState(false);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLength, setProductLength] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = { PageNumber: pageNumber, PageSize: 10 }; //gồm số tang và độ dài của sản phẩm
    const response = await getProductPaginationAPI(data);
    setProduct(response);

    const getAllProducts = await getProductAPI(); //lấy độ dài mãng
    const length = Math.ceil(getAllProducts.length / 10); //lấy số trang
    setProductLength(length);
  };

  const loadData = async (pageNumber) => {
    //load lại data khi ra trước hoặc ra sau
    const data = { PageNumber: pageNumber, PageSize: 10 };
    const response = await getProductPaginationAPI(data);
    setProduct(response); //lấy đc 12 sản phẩm để hiện
    setPageNumber(pageNumber); //set lại số trang
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
      setOpenPopupUpdate(true); // Hiển thị popup
    }
  };

  const deleteProduct = async (currentId) => {
    const productFind = product.find((p) => currentId === p.productId);
    if (productFind) {
      const response = await deleteProductAPI(productFind.productId);
      if (response.success == true) {
        fetchData();
      }
    }
  };
  return (
    <div className="bg-gradient-to-r from-green-200 via-teal-200 to-cyan-200">
      {/* ADD NEW */}
      {openPopupAddNew && (
        <PopupAddNewProduct
          handleClosePopupAddNew={handleClosePopupAddNew}
          fetchProduct={fetchData()}
        />
      )}
      {/* ------ */}
      <div className="flex justify-end">
        <button
          onClick={() => setOpenPopupAddNew(!openPopupAddNew)}
          className="m-3 rounded-md bg-green-400 p-2 px-3 text-white"
        >
          Add new
        </button>
      </div>

      <div class="relative overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-left text-sm text-white">
          <thead className="border-t-[1px] border-white bg-gray-50 bg-gradient-to-br from-red-200 to-cyan-300 text-xs uppercase text-gray-700 shadow-xl backdrop-blur-2xl">
            <tr>
              <th scope="col" class="px-6 py-3">
                #
              </th>
              <th scope="col" class="px-6 py-3">
                ProductName
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                StockQuantity
              </th>
              <th scope="col" class="px-6 py-3">
                Ages
              </th>
              <th scope="col" class="px-6 py-3">
                Support Instances
              </th>
              <th scope="col" class="px-6 py-3">
                Lab ID
              </th>
              <th scope="col" class="px-6 py-3">
                Subcategory ID
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {product.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  No Product found.
                </td>
              </tr>
            ) : (
              product.map((product, index) => (
                <tr
                  key={product.productId}
                  className="border-b-[2px] bg-gradient-to-r from-rose-300 via-sky-400 to-violet-300 shadow-2xl backdrop-blur-3xl"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r-[1px] px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td class="border-r-[1px] px-6 py-4">
                    {product.productName}
                  </td>
                  <td class="border-r-[1px] px-6 py-4">
                    {product.description}
                  </td>
                  <td class="border-r-[1px] px-6 py-4">{product.price}</td>
                  <td class="border-r-[1px] px-6 py-4">
                    {product.stockQuantity}
                  </td>
                  <td class="border-r-[1px] px-6 py-4">{product.ages}</td>
                  <td class="border-r-[1px] px-6 py-4">
                    {product.supportInstances}
                  </td>
                  <td class="border-r-[1px] px-6 py-4">{product.labId}</td>
                  <td class="border-r-[1px] px-6 py-4">
                    {product.subcategoryId}
                  </td>

                  <td class="border-r-[1px] px-6 py-4">
                    <div className="flex gap-x-3">
                      <button
                        onClick={() => handleUpdate(product.productId)}
                        className="rounded-md bg-green-400 p-2 px-3 text-white"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteProduct(product.productId)}
                        className="rounded-md bg-red-400 p-2 px-3 text-white"
                      >
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
            fetchProduct={fetchData}
          />
        )}
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

export default ProductManager;
