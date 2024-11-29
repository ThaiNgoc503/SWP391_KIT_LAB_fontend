import React from "react";

const AddNewProduct = () => {
  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-slate-400  bg-opacity-45">
      <div className="w-[30rem] bg-white p-5">
        <h1 className="text-center">Update Product</h1>
        <form className="grid grid-cols-2 gap-4">
          <div>
            <p>productName:</p>
            <input
              type="text"
              className="border-solid border-slate-300 border-2 rounded-md py-1 w-full"
            />
          </div>
          <div>
            <p>description:</p>
            <input
              type="text"
              className="border-solid border-slate-300 border-2 rounded-md py-1 w-full"
            />
          </div>
          <div>
            <p>price:</p>
            <input
              type="text"
              className="border-solid border-slate-300 border-2 rounded-md py-1 w-full"
            />
          </div>
          <div>
            <p>stockQuantity:</p>
            <input
              type="text"
              className="border-solid border-slate-300 border-2 rounded-md py-1 w-full"
            />
          </div>
          <div>
            <p>Ages:</p>
            <input
              type="text"
              className="border-solid border-slate-300 border-2 rounded-md py-1 w-full"
            />
          </div>
          <div>
            <p>supportInstances:</p>
            <input
              type="text"
              className="border-solid border-slate-300 border-2 rounded-md py-1 w-full"
            />
          </div>
          <div>
            <p>labId:</p>
            <input
              type="text"
              className="border-solid border-slate-300 border-2 rounded-md py-1 w-full"
            />
          </div>
          <div>
            <p>subcategoryId:</p>
            <input
              type="text"
              className="border-solid border-slate-300 border-2 rounded-md py-1 w-full"
            />
          </div>
          <button className="col-span-2 bg-green-300 p-2 rounded-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
