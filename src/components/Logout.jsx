import React from "react";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };
  return (
    <ul className="flex gap-4 font-semibold text-xl pt-3">
      <li>
        <button onClick={() => handleLogout()}>Logout</button>
      </li>
    </ul>
  );
};

export default Logout;
