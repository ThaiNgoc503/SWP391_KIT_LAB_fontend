import React from "react";
import { Outlet } from "react-router-dom";
import TaskAdmin from "../manager/components/TaskAdmin";
import AdminHeader from "../manager/components/AdminHeader";

const ManagerLayout = () => {
  return (
    <div>
      <div className="flex h-screen">
        <div className="h-full">
          <TaskAdmin />
        </div>
        <div className="flex flex-1 flex-col">
          <AdminHeader />
          <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerLayout;
