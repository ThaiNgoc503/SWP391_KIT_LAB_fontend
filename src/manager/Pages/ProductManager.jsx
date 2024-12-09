import React, { useEffect, useState } from "react";
import {
  deleteProductAPI,
  getProductAPI,
  getProductPaginationAPI,
} from "../../api/ProductAPI";
import PopupAddNewProduct from "../components/PopupAddNewProduct";
import PopupUpdateProduct from "../components/PopupUpdate";

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
      const isConfirmed = confirm("Do you want to delete the product?");
      if (isConfirmed) {
        const response = await deleteProductAPI(productFind.productId);
        if (response.success == true) {
          fetchData();
        } else {
          alert("Fail to Delete");
        }
      }
    }
  };

  const renderPagination = () => {
    const pages = Array.from(
      { length: productLength },
      (_, index) => index + 1,
    );
    return pages.map((page) => (
      <button
        key={page}
        className={`mx-1 rounded px-2 py-1 ${
          pageNumber === page
            ? "bg-cyan-600 text-white"
            : "bg-gray-200 text-cyan-600"
        }`}
        onClick={() => loadData(page)}
      >
        {page}
      </button>
    ));
  };
  return (
    <div className="bg-gradient-to-r from-slate-200 via-slate-200 to-slate-400">
      {/* ADD NEW */}
      {openPopupAddNew && (
        <PopupAddNewProduct
          handleClosePopupAddNew={handleClosePopupAddNew}
          fetchProduct={fetchData}
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
        <table className="w-full text-left text-sm text-black">
          <thead className="border-t-[1px] border-white bg-gray-50 bg-gradient-to-br from-slate-200 to-violet-100 text-xs uppercase text-gray-700">
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
                  className="border-b-[2px] bg-gradient-to-r from-slate-300 via-slate-400 to-violet-300"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r-[1px] px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {(pageNumber - 1) * 10 + index + 1}
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

      <div className="flex justify-center p-10">{renderPagination()}</div>
    </div>
  );
};

export default ProductManager;
