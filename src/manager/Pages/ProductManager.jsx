import React, { useEffect, useState } from "react";
import { getProductAPI } from "../../api/ProductAPI";
import AddNewProduct from "../components/PopupAddNewProduct";

const ProductManager = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getProductAPI();
    setProduct(response);
  };

  return (
    <div>
      <h1 className="mt-10 text-center">Product Manager</h1>
      <div className="flex justify-end">
        <button className="m-3 rounded-md bg-green-400 p-2 px-3 text-white">
          Add new
        </button>
      </div>
      <AddNewProduct />
      <div class="relative overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                  class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <th
                    scope="row"
                    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td class="px-6 py-4">{product.productName}</td>
                  <td class="px-6 py-4">{product.description}</td>
                  <td class="px-6 py-4">{product.price}</td>
                  <td class="px-6 py-4">{product.stockQuantity}</td>
                  <td class="px-6 py-4">{product.ages}</td>
                  <td class="px-6 py-4">{product.supportInstances}</td>
                  <td class="px-6 py-4">{product.labId}</td>
                  <td class="px-6 py-4">{product.subcategoryId}</td>

                  <td class="px-6 py-4">
                    <div className="flex gap-x-3">
                      <button className="rounded-md bg-green-400 p-2 px-3 text-white">
                        Update
                      </button>
                      <button className="rounded-md bg-red-400 p-2 px-3 text-white">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;
