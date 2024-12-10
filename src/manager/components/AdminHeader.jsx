import React from "react";
import LogoutAdmin from "./LogoutAdmin";
const AdminHeader = () => {
  return (
    <div className="relative flex items-center justify-between border-b-2 border-cyan-600 py-1 pl-5 pr-10">
      <p className="font-semibold">MANAGER</p>
      <div>
        <LogoutAdmin />
      </div>
    </div>
  );
};

export default AdminHeader;
