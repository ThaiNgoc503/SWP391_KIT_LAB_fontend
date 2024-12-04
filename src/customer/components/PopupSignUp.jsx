import React from "react";
import { MdCancelPresentation } from "react-icons/md";
import { registerAPI } from "../../api/AuthAPI";
import { useFormik } from "formik";
import * as yup from "yup";

const PopupSignUp = ({ closePopupRegister, handleLoginOpen }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
      phone: "",
      address: "",
      role: "Customer", // giá trị mặc định
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Invalid email address",
        ),
      fullName: yup.string().required("Full Name is required"),
      phone: yup
        .string()
        .matches(/^0[35789][0-9]{8,9}$/, "Phone number must be numeric")
        .required("Phone is required"),
      address: yup.string().required("Address is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await registerAPI(values);
      closePopupRegister(); // Đóng popup sau khi đăng ký thành công
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 align-middle">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-[30rem] rounded-md bg-gradient-to-br from-violet-300 via-cyan-300 to-green-200">
          <div className="relative flex justify-center">
            <button
              onClick={closePopupRegister}
              className="absolute left-0 pl-3 pt-3 text-3xl"
            >
              <MdCancelPresentation />
            </button>
            <h2 className="inline-block bg-gradient-to-tr from-yellow-400 via-orange-300 to-red-400 bg-clip-text pb-2 pt-2 text-center text-3xl font-semibold text-transparent">
              Sign up
            </h2>
          </div>
          <form onSubmit={formik.handleSubmit} className="text-slate-100">
            <div className="grid grid-cols-2 gap-2 p-5">
              <div className="space-y-2">
                <label htmlFor="username" className="text-base">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Username"
                  className="rounded-md p-2 pl-5 text-black"
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-sm text-red-500">
                    {formik.errors.username}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-base">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                  className="rounded-md p-2 pl-5 text-black"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-base">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email"
                  className="rounded-md p-2 pl-5 text-black"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="fullName" className="text-base">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Full Name"
                  className="rounded-md p-2 pl-5 text-black"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-sm text-red-500">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-base">
                  Phone:
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Phone"
                  className="rounded-md p-2 pl-5 text-black"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-sm text-red-500">{formik.errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-base">
                  Address:
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Address"
                  className="rounded-md p-2 pl-5 text-black"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-sm text-red-500">
                    {formik.errors.address}
                  </p>
                )}
              </div>
            </div>

            <div className="ml-6 flex gap-1">
              <p>Already have an account? </p>
              <button
                type="button"
                className="pr-2 text-base text-blue-600 ease-in-out hover:underline"
                onClick={handleLoginOpen}
              >
                Sign in
              </button>
            </div>

            <button
              type="submit"
              className="m-5 w-[27rem] rounded-md bg-gradient-to-r from-green-400 to-green-300 p-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupSignUp;
