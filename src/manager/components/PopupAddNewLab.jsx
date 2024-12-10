import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from "yup";
import { createLabsAPI } from "../../api/LabAPI";
import Notification from "../../customer/components/Notification";

const PopupAddNewLab = ({ handleClosePopupAddNew, fetchLab }) => {
  const [notification, setNotification] = useState(false);

  const formik = useFormik({
    initialValues: {
      labName: "",
      description: "",
      labFileUrl: "",
      labVideoUrl: "",
    },
    validationSchema: yup.object({
      labName: yup.string().required("Lab name is required"),
      description: yup.string().required("Description is required"),
      labFileUrl: yup
        .string()
        .required("Lab file URL is required")
        .matches(/^https?:\/\/[^\s]+$/, "Enter a valid HTTP or HTTPS URL"),
      labVideoUrl: yup
        .string()
        .required("Lab video URL is required")
        .matches(/^https?:\/\/[^\s]+$/, "Enter a valid HTTP or HTTPS URL"),
    }),
    onSubmit: async (values) => {
      const response = await createLabsAPI(values);
      if (response.success === true) {
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 3000);
        setTimeout(() => {
          handleClosePopupAddNew();
        }, 1000);
      }
      fetchLab();
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400 bg-opacity-45">
      <div className="rounded-2xl bg-gradient-to-tr from-cyan-100 via-slate-200 to-slate-300 p-5 md:w-[38rem]">
        <div className="relative flex justify-center">
          <button onClick={handleClosePopupAddNew} className="absolute left-0">
            <MdOutlineCancel className="text-2xl" />
          </button>
          <h1 className="inline-block bg-gradient-to-bl from-black via-yellow-500 to-blue-600 bg-clip-text pb-1 text-xl font-semibold text-transparent">
            Add New Lab
          </h1>
        </div>
        <form className="grid gap-3" onSubmit={formik.handleSubmit}>
          <div className="space-y-1 text-base">
            <p className="font-medium">Lab Name:</p>
            <input
              id="labName"
              name="labName"
              type="text"
              value={formik.values.labName}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2"
            />
            {formik.errors.labName && (
              <p className="text-sm text-red-400">{formik.errors.labName}</p>
            )}
          </div>
          <div className="space-y-1 text-base">
            <p className="font-medium">Description:</p>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="h-[60px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2"
            />
            {formik.errors.description && (
              <p className="text-sm text-red-400">
                {formik.errors.description}
              </p>
            )}
          </div>
          <div className="space-y-1 text-base">
            <p className="font-medium">Lab File URL:</p>
            <input
              id="labFileUrl"
              name="labFileUrl"
              type="text"
              value={formik.values.labFileUrl}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2"
            />
            {formik.errors.labFileUrl && (
              <p className="text-sm text-red-400">{formik.errors.labFileUrl}</p>
            )}
          </div>
          <div className="space-y-1 text-base">
            <p className="font-medium">Lab File URL:</p>
            <input
              id="labVideoUrl"
              name="labVideoUrl"
              type="text"
              value={formik.values.labVideoUrl}
              onChange={formik.handleChange}
              className="h-[30px] w-full rounded-md border-2 border-solid border-slate-300 py-1 pl-2"
            />
            {formik.errors.labVideoUrl && (
              <p className="text-sm text-red-400">{formik.errors.labFileUrl}</p>
            )}
          </div>
          <button
            type="submit"
            className="mt-3 rounded-full bg-green-300 p-1 text-lg"
          >
            Add Lab
          </button>
        </form>
        {notification && (
          <Notification notificationMessage={"Add new lab successfully"} />
        )}
      </div>
    </div>
  );
};

export default PopupAddNewLab;
