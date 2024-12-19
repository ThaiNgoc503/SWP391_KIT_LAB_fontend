import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { getUserProfile, updateUserProfile } from "../../api/UsersAPI";
import Loader from "../components/Loader";
import Notification from "../components/Notification";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notificationError, setNotificationError] = useState(false);
  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const jwt = localStorage.getItem("jwt");
    const token = JSON.parse(jwt);
    if (token) {
      const response = await getUserProfile(token.NAME);
      if (response) {
        if (response.data) {
          setProfile(response.data.data);
        }
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: profile.fullName,
      username: profile.username,
      phone: profile.phone,
      address: profile.address,
    },
    validationSchema: yup.object({
      fullName: yup.string().required("Full Name is required."),
      username: yup.string().required("Email is required."),
      phone: yup
        .string()
        .required("Phone number is required.")
        .matches(/^0[35789][0-9]{8,9}$/, "Phone number must be numeric"),
      address: yup.string().required("Address is required."),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const data = {
          fullName: values.fullName,
          username: values.username,
          phone: values.phone,
          address: values.address,
        };
        await updateUserProfile(values.username, data);
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 3000);
      } catch (error) {
        console.log("2");
        setNotificationError(true);
        setTimeout(() => {
          setNotificationError(false);
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="h-screen bg-slate-100 p-5 md:px-[15rem]">
      <div className="bg-white-200 mt-9 w-[full] bg-white p-10">
        <h2 className="text-left text-xl font-bold">My Profile</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-2 gap-5 pt-5"
        >
          <div>
            <p>FullName:</p>
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              className={`border-slate-500-200 w-full rounded-md border-2 px-3 py-1 ${formik.errors.fullName && formik.touched.fullName ? "border-red-400" : ""}`}
            />
            {formik.errors.fullName && (
              <p className="text-red-400">{formik.errors.fullName}</p>
            )}
          </div>
          <div>
            <p>Username:</p>
            <input
              type="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              className={`border-slate-500-200 w-full rounded-md border-2 px-3 py-1 ${formik.errors.email && formik.touched.email ? "border-red-400" : ""}`}
            />
            {formik.errors.username && (
              <p className="text-red-400">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <p>Phone: </p>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className={`border-slate-500-200 w-full rounded-md border-2 px-3 py-1 ${formik.errors.phone && formik.touched.phone ? "border-red-400" : ""}`}
            />
            {formik.errors.phone && (
              <p className="text-red-400">{formik.errors.phone}</p>
            )}
          </div>
          <div>
            <p>Address: </p>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className={`border-slate-500-200 w-full rounded-md border-2 px-3 py-1 ${formik.errors.address && formik.touched.address ? "border-red-400" : ""}`}
            />
            {formik.errors.address && (
              <p className="text-red-400">{formik.errors.address}</p>
            )}
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-full bg-slate-200 p-2 hover:bg-cyan-700 hover:text-white"
            >
              {isLoading ? "...Saving" : "Save Changes"}
            </button>
          </div>
        </form>
        {isLoading && <Loader />}

        {notification && (
          <Notification notificationMessage={"Updata successfully"} />
        )}
        {notificationError && (
          <Notification
            notificationMessage={"Updata is wrong, please update again"}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
