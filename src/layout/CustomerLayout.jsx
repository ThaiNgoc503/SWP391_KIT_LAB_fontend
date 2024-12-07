import React from "react";
import Header from "../customer/components/CustomerHeader";
import { Outlet } from "react-router-dom";
import Footer from "../customer/components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
