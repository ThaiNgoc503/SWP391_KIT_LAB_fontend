import React from "react";
import { MdOutlineCancel } from "react-icons/md";

const PopupAddNewProduct = ({ handleClosePopupAddNew }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.01);
  const [stockQuantity, setStockQuantity] = useState(2147483647);
  const [ages, setAges] = useState("");
  const [supportInstances, setSupportInstances] = useState(2147483647);
  const [labId, setLabId] = useState(0);
  const [subcategoryId, setSubcategoryId] = useState(0);
  const [imagePath, setImagePath] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400 bg-opacity-45">
      <div className="w-[30rem] bg-white p-5">
        <div className="relative flex justify-center">
          <button onClick={handleClosePopupAddNew} className="absolute left-0">
            <MdOutlineCancel className="text-xl" />
          </button>
          <h1 className="">Update Product</h1>
        </div>
        <form className="grid grid-cols-2 gap-4">
          <div>
            <p>productName:</p>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
          <div className="col-span-2">
            <p>imagePath:</p>
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
