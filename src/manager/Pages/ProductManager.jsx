import React, { useEffect, useState } from "react";
import { getProductAPI } from "../../api/Product";
import AddNewProduct from "../components/AddNewProduct";

const ProductManager = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await getProductAPI();
    setProduct(response);
    console.log(response);
  };

  return (
    <div>
      <h1 className="text-center mt-10">Product Manager</h1>
      <div className="justify-end flex">
        <button className=" m-3 bg-green-400 p-2 px-3 rounded-md text-white">
          Add new
        </button>
      </div>
      <AddNewProduct />
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                <td colSpan="8" className="text-center px-6 py-4">
                  No Product found.
                </td>
              </tr>
            ) : (
              product.map((product, index) => (
                <tr
                  key={product.productId}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                      <button className="bg-green-400 p-2 px-3 rounded-md text-white">
                        Update
                      </button>
                      <button className="bg-red-400 p-2 px-3 rounded-md text-white">
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
