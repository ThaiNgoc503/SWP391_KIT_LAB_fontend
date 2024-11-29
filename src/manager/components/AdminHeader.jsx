import  { useEffect, useState } from "react";
import logo from "../../assets/kitlab_logo.webp";
import { Link } from "react-router-dom";
import Login from "../../components/Login";
import Logout from "../../components/Logout";
const AdminHeader = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    tokenTest();
  }, []);

  const tokenTest = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
    return hasToken;
  };

  return (
    <div className="relative">
      <div className="flex justify-between pt-3 pb-3 pl-9 pr-24 bg-slate-400">
        <img src={logo} className="w-14 h-14" />
        <ul className="flex gap-5 font-bold text-2xl pt-2">
          <li>
            <Link to="user">User</Link>
          </li>
          <li>
            <Link to="ban-list">Ban User</Link>
          </li>
          <li>
            <Link to="product-manager">Product Manager</Link>
          </li>
         
        </ul>
        {hasToken ? <Logout /> : <Login />}
      </div>
      <div className="absolute w-full h-1 bg-black bottom-0"></div>
    </div>
  );
};

export default AdminHeader;
