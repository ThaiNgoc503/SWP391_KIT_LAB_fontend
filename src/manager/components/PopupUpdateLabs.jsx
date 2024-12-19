import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from "yup";
import Notification from "../../customer/components/Notification";
import { updateLabsAPI } from "../../api/LabAPI";

const PopupUpdateLabs = ({ handleClosePopupUpdate, fetchLab, Lab }) => {
  const [notification, setNotification] = useState(false);

  const formik = useFormik({
    initialValues: {
      labName: Lab.labName,
      description: Lab.description,
      labFileUrl: Lab.labFileUrl,
      labVideoUrl: Lab.videoURL,
    },
    validationSchema: yup.object({
      labName: yup
        .string()
        .required("Lab name is required")
        .min(6, "must be more than or equal 6 digits"),
      description: yup
        .string()
        .required("Description is required")
        .min(6, "must be more than or equal 6 digits"),
      labFileUrl: yup
        .string()
        .required("Lab file URL is required")
        .matches(
          /^https?:\/\/[\S\s]+$/,
          "Please enter a valid URL (http or https)",
        ),
      labVideoUrl: yup
        .string()
        .required("Lab video URL is required")
        .matches(
          /^https?:\/\/[\S\s]+$/,
          "Please enter a valid URL (http or https)",
        ),
    }),
    onSubmit: async (values) => {
      const id = Lab.labId;
      const value = {
        ...values,
        labName: values.labName,
        description: values.description,
        labFileUrl: values.labFileUrl,
        videoURL: values.labVideoUrl,
      };

      const response = await updateLabsAPI(id, value);

      if (response.success === true) {
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 3000);

        setTimeout(() => {
          handleClosePopupUpdate();
          fetchLab();
        }, 1000);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400 bg-opacity-55">
      <div className="rounded-2xl bg-white p-5 md:w-[38rem]">
        <div className="relative flex justify-center">
          <button onClick={handleClosePopupUpdate} className="absolute left-0">
            <MdOutlineCancel className="text-2xl" />
          </button>
          <h1 className="pb-1 text-xl font-semibold text-black">Update Lab</h1>
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block font-medium">Lab Name:</label>
            <input
              id="labName"
              name="labName"
              type="text"
              value={formik.values.labName}
              onChange={formik.handleChange}
              className="w-full rounded-md border border-slate-300 p-2"
            />
            {formik.errors.labName && (
              <p className="text-sm text-red-500">{formik.errors.labName}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full rounded-md border border-slate-300 p-2"
            />
            {formik.errors.description && (
              <p className="text-sm text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium">Lab File URL:</label>
            <input
              id="labFileUrl"
              name="labFileUrl"
              type="text"
              value={formik.values.labFileUrl}
              onChange={formik.handleChange}
              className="w-full rounded-md border border-slate-300 p-2"
            />
            {formik.errors.labFileUrl && (
              <p className="text-sm text-red-500">{formik.errors.labFileUrl}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Lab Video URL:</label>
            <input
              id="labVideoUrl"
              name="labVideoUrl"
              type="text"
              value={formik.values.labVideoUrl}
              onChange={formik.handleChange}
              className="w-full rounded-md border border-slate-300 p-2"
            />
            {formik.errors.labVideoUrl && (
              <p className="text-sm text-red-500">
                {formik.errors.labVideoUrl}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-green-400 p-2 text-white"
          >
            Update
          </button>
        </form>
        {notification && (
          <Notification notificationMessage="Lab updated successfully!" />
        )}
      </div>
    </div>
  );
};

export default PopupUpdateLabs;
