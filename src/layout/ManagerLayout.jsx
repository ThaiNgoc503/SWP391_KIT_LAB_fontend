import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../manager/components/ManagerHeader";

const ManagerLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default ManagerLayout;
