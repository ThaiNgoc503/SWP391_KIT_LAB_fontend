import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from "yup";
import { getAllLabs } from "../../api/LabAPI";
import { getAllSubcategories } from "../../api/SubcategoriesAPI";
import { updateProductAPI } from "../../api/ProductAPI";
import Notification from "../../customer/components/Notification";

const PopupUpdateProduct = ({
  handleClosePopupUpdate,
  product,
  fetchProduct,
}) => {
  const [labs, setLabs] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [notification, setNotification] = useState(false);

  const formik = useFormik({
    initialValues: {
      productName: product.productName,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      ages: product.ages.trim(),
      supportInstances: product.supportInstances,
      labId: product.labId,
      subcategoryId: product.subcategoryId,
      imagePath: product.imagePath,
    },
    validationSchema: yup.object({
      productName: yup
        .string()
        .required("Product name is required")
        .min(6, "must be more than or equal 6 digits"),
      description: yup
        .string()
        .required("Description is required")
        .min(6, "must be more than or equal 6 digits"),
      price: yup
        .number()
        .required("Price is required")
        .min(10000, "the price is more than or equal 10000")
        .typeError("Price must be a number"),
      stockQuantity: yup
        .number()
        .required("Stock quantity is required")
        .min(0, "the price is more than or equal 0")
        .typeError("stockQuantity must be a number"),
      ages: yup
        .string()
        .required("Age is required")
        .matches(
          /^(?:[1-9]?[0-9]|100)\+$/,
          "wrong fomat please enter right data example 7+",
        ),
      labId: yup
        .number()
        .required("Lab is required")
        .notOneOf([0], "Please select a valid lab")
        .typeError("labId must be a number"), // Kiểm tra labId khác 0
      subcategoryId: yup
        .number()
        .required("Subcategory is required")
        .notOneOf([0], "Please select a valid lab")
        .typeError("subcategoryId must be a number"),
      imagePath: yup
        .string()
        .required("image path is required")
        .matches(/^https?:\/\/[\S\s]*$/, "Enter correct http or https url"),
    }),
    onSubmit: async (values) => {
      const id = product.productId;
      const productData = {
        ...values,
        price: Number.parseFloat(values.price),
        stockQuantity: Number.parseInt(values.stockQuantity),
        supportInstances: Number.parseInt(values.supportInstances),
        labId: Number.parseInt(values.labId),
        subcategoryId: Number.parseInt(values.subcategoryId),
      };

      const response = await updateProductAPI(id, productData);

      if (response.success === true) {
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 3000);

        setTimeout(async () => {
          handleClosePopupUpdate();
          fetchProduct();
        }, 1000);
      }
    },
  });

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const labs = await getAllLabs();
    const subCategories = await getAllSubcategories();
    setLabs(labs);
    setSubCategories(subCategories);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400 bg-opacity-55">
      <div className="rounded-2xl bg-white p-5 md:w-[38rem]">
        <div className="relative flex justify-center">
          <button onClick={handleClosePopupUpdate} className="absolute left-0">
            <MdOutlineCancel className="text-2xl" />
          </button>
          <h1 className="pb-1 text-xl font-semibold text-black">
            Update product
          </h1>
        </div>
        <form className="grid grid-cols-2 gap-3" onSubmit={formik.handleSubmit}>
          <div className="space-y-1 text-base">
            <p className="font-medium">productName:</p>
            <input
              id="productName"
              name="productName"
              type="text"
              value={formik.values.productName}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 p-2 py-1 pl-2"
            />
            {formik.errors.productName && (
              <p className="text-sm text-red-400">
                {formik.errors.productName}
              </p>
            )}
          </div>

          <div className="space-y-1 text-base">
            <p className="font-medium">description:</p>
            <input
              id="description"
              name="description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2"
            />
            {formik.errors.description && (
              <p className="text-sm text-red-400">
                {formik.errors.description}
              </p>
            )}
          </div>
          <div className="space-y-1 text-base">
            <p className="font-medium">price:</p>
            <input
              id="price"
              name="price"
              type="text"
              value={formik.values.price}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2"
            />
            {formik.errors.price && (
              <p className="text-sm text-red-400">{formik.errors.price}</p>
            )}
          </div>
          <div className="space-y-1 text-base">
            <p className="font-medium">stockQuantity:</p>
            <input
              id="stockQuantity"
              name="stockQuantity"
              type="text"
              value={formik.values.stockQuantity}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2"
            />
            {formik.errors.stockQuantity && (
              <p className="text-sm text-red-400">
                {formik.errors.stockQuantity}
              </p>
            )}
          </div>
          <div className="space-y-1 text-base">
            <p className="font-medium">Ages:</p>
            <input
              id="ages"
              name="ages"
              type="text"
              value={formik.values.ages}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2"
            />
            {formik.errors.ages && (
              <p className="text-sm text-red-400">{formik.errors.ages}</p>
            )}
          </div>

          <div className="space-y-1 text-base">
            <p className="font-medium">Lab Name:</p>
            <select
              name="labId"
              id="labId"
              value={formik.values.labId}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2 [&::-webkit-scrollbar]:hidden"
            >
              <option value="">Select one lab</option>
              {labs.map((lab) => (
                <option key={lab.labId} value={lab.labId}>
                  {lab.labName}
                </option>
              ))}
            </select>
            {formik.errors.labId && (
              <p className="text-sm text-red-400">{formik.errors.labId}</p>
            )}
          </div>
          <div className="space-y-1 text-base">
            <p className="font-medium">Subcategory Name:</p>
            <select
              name="subcategoryId"
              id="subcategoryId"
              value={formik.values.subcategoryId}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2 text-base [&::-webkit-scrollbar]:hidden"
            >
              <option value="">Select one lab</option>
              {subCategories.map((subcategory) => (
                <option
                  key={subcategory.subcategoryId}
                  value={subcategory.subcategoryId}
                >
                  {subcategory.subcategoryName}
                </option>
              ))}
            </select>
            {formik.errors.subcategoryId && (
              <p className="text-sm text-red-400">
                {formik.errors.subcategoryId}
              </p>
            )}
          </div>
          <div className="col-span-2 space-y-1 text-base">
            <p className="font-medium">imagePath:</p>
            <input
              id="imagePath"
              name="imagePath"
              type="text"
              value={formik.values.imagePath}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2"
            />
            {formik.errors.imagePath && (
              <p className="text-sm text-red-400">{formik.errors.imagePath}</p>
            )}
          </div>
          <button
            type="submit"
            className="col-span-2 mt-1 rounded-full bg-green-300 p-1"
          >
            Update
          </button>
        </form>
        {notification && (
          <Notification
            notificationMessage={"update new product successfully"}
          />
        )}
      </div>
    </div>
  );
};

export default PopupUpdateProduct;
