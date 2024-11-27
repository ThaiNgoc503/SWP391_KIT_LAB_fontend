import React from "react";
import Footer from "./src/components/Footer";
import { Outlet } from "react-router-dom";
import AdminHeader from "./src/Admin/components/AdminHeader";

const LayoutAdmin = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default LayoutAdmin;
