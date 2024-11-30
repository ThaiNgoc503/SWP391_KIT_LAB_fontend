import React from "react";

const PopupAddNewProduct = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400 bg-opacity-45">
      <div className="w-[30rem] bg-white p-5">
        <h1 className="text-center">Update Product</h1>
        <form className="grid grid-cols-2 gap-4">
          <div>
            <p>productName:</p>
            <input
              type="text"
              className="w-full rounded-md border-2 border-solid border-slate-300 py-1"
            />
          </div>
          <div>
            <p>description:</p>
            <input
              type="text"
              className="w-full rounded-md border-2 border-solid border-slate-300 py-1"
            />
          </div>
          <div>
            <p>price:</p>
            <input
              type="text"
              className="w-full rounded-md border-2 border-solid border-slate-300 py-1"
            />
          </div>
          <div>
            <p>stockQuantity:</p>
            <input
              type="text"
              className="w-full rounded-md border-2 border-solid border-slate-300 py-1"
            />
          </div>
          <div>
            <p>Ages:</p>
            <input
              type="text"
              className="w-full rounded-md border-2 border-solid border-slate-300 py-1"
            />
          </div>
          <div>
            <p>supportInstances:</p>
            <input
              type="text"
              className="w-full rounded-md border-2 border-solid border-slate-300 py-1"
            />
          </div>
          <div>
            <p>labId:</p>
            <input
              type="text"
              className="w-full rounded-md border-2 border-solid border-slate-300 py-1"
            />
          </div>
          <div>
            <p>subcategoryId:</p>
            <input
              type="text"
              className="w-full rounded-md border-2 border-solid border-slate-300 py-1"
            />
          </div>
          <button className="col-span-2 rounded-full bg-green-300 p-2">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupAddNewProduct;
