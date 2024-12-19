import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { BiLogoProductHunt } from "react-icons/bi";
import {
  MdDashboard,
  MdManageAccounts,
  MdNoAccounts,
  MdSupportAgent,
} from "react-icons/md";
import { FaFirstOrderAlt } from "react-icons/fa";
const TaskAdmin = () => {
  return (
    <div>
      <div className="flex min-h-screen w-[14rem] flex-col bg-cyan-600 pb-10 pr-0 pt-5 text-white">
        <Link
          to="/manager"
          className="flex items-center border-b-2 text-center text-sm"
        >
          <img src={logo} className="mt-2 inline-block h-14 w-14" />
          <div className="text-nowrap">Stempede kit and lab</div>
        </Link>
        <ul className="font-base flex flex-col gap-4 pt-2 text-lg md:text-xl">
          <li className="">
            <Link
              to="dashboard"
              className="flex items-center gap-x-2 px-3 py-4 hover:bg-slate-50 hover:bg-opacity-25"
            >
              <div>
                <MdDashboard />
              </div>
              <p>Dashboard</p>
            </Link>
          </li>
          <li className="">
            <Link
              to="user"
              className="flex items-center gap-x-2 px-3 py-4 hover:bg-slate-50 hover:bg-opacity-25"
            >
              <div>
                <MdManageAccounts />
              </div>
              <p> Account</p>
            </Link>
          </li>
          <li className="text-nowrap">
            <Link
              to="product-manager"
              className="flex items-center gap-x-2 px-3 py-4 hover:bg-slate-50 hover:bg-opacity-25"
            >
              <div>
                <BiLogoProductHunt />
              </div>
              <p> Products</p>
            </Link>
          </li>
          <li className="text-nowrap">
            <Link
              to="labs-manager"
              className="flex items-center gap-x-2 px-3 py-4 hover:bg-slate-50 hover:bg-opacity-25"
            >
              <div>
                <IoBookSharp />
              </div>
              <p>Labs</p>
            </Link>
          </li>
          <li className="text-nowrap">
            <Link
              to="orderAll"
              className="flex items-center gap-x-2 px-3 py-4 hover:bg-slate-50 hover:bg-opacity-25"
            >
              <div>
                <FaFirstOrderAlt />
              </div>
              <p>Order</p>
            </Link>
          </li>
          <li className="text-nowrap">
            <Link
              to="support-all"
              className="flex items-center gap-x-2 px-3 py-4 hover:bg-slate-50 hover:bg-opacity-25"
            >
              <div>
                <MdSupportAgent />
              </div>
              <p>Support</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TaskAdmin;
