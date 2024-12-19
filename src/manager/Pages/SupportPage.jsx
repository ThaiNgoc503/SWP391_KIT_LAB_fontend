import React, { useEffect, useState } from "react";
import { FaFirstOrderAlt } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Notification from "../../customer/components/Notification";
import { GrUpdate } from "react-icons/gr";
import { getAllSupport, updateSupport } from "../../api/SupportAPI";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineContactSupport } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";

const SupportPage = () => {
  const [support, setSupport] = useState([]);
  const [filteredSupport, setFilteredSupport] = useState([]);
  const [notification, setNotification] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const response = await getAllSupport();
    if (response) {
      if (response.data) {
        setSupport(response.data.data);
        setFilteredSupport(response.data.data);
      }
    }
    console.log(response);
  };

  const handleUpdate = async (id, userName) => {
    const data = { supportStatus: true };
    const response = await updateSupport(id, userName, data);
    if (response) {
      if (response?.data) {
        if (response?.data.message === "Operation successful.") {
          setNotification(true);
          fetchApi();
          setTimeout(() => {
            setNotification(false);
          }, 3000);
        }
      }
    } else {
      alert("Fail to update");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      const response = support.filter((support) =>
        support.username.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredSupport(response);
    } else {
      setFilteredSupport(support);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-10 bg-slate-100 p-2 pb-10">
      <div className="flex justify-end pr-[11rem]">
        <ul className="inline-flex justify-end gap-2 pt-10">
          <li>
            <form onSubmit={handleSearch} className="relative inline-block">
              <input
                type="text"
                placeholder="Enter user you want"
                className="h-[2rem] w-[10rem] rounded-lg border-[1px] border-solid border-cyan-100 px-2 py-1 pr-5 text-sm sm:h-[2.5rem] sm:w-[14rem] md:h-[2.5rem] md:w-[16rem] md:text-base lg:h-10 lg:w-[20rem] lg:text-lg"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary absolute right-1 top-1 rounded-md bg-cyan-600 p-1 text-white sm:right-2 sm:top-1 md:right-1 md:top-1 md:p-2 xl:top-[4px] xl:p-2"
              >
                <IoIosSearch />
              </button>
            </form>
          </li>
          <li className="">
            <Link
              to="/manager/support-all"
              className="flex items-center gap-2 gap-x-2 rounded-md bg-green-300 px-3 py-2 hover:bg-opacity-90"
            >
              <div>
                <FaFirstOrderAlt />
              </div>
              <p>All</p>
            </Link>
          </li>
          <li className="">
            <Link
              to="/manager/support"
              className="flex items-center gap-2 gap-x-2 rounded-md bg-orange-300 px-3 py-2 hover:bg-opacity-90"
            >
              <div>
                <MdOutlineContactSupport />
              </div>
              <p>Support</p>
            </Link>
          </li>
          <li>
            <Link
              to="/manager/support-success"
              className="flex items-center gap-2 rounded-md bg-cyan-300 px-2 py-2 hover:bg-opacity-90"
            >
              <div>
                <TiTickOutline />
              </div>
              <p>Support Successful</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <table className="max-w-screen mx-3 text-left text-base text-black">
            <thead className="border-b-[5px] border-slate-100 bg-white text-sm uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>

                <th scope="col" className="px-6 py-3">
                  ORDER ID
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  user name
                </th>
                <th scope="col" className="px-6 py-3">
                  support Description
                </th>
                <th scope="col" className="px-6 py-3">
                  support Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSupport.filter(
                (support) => support.supportStatus === false,
              ).length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    No support found.
                  </td>
                </tr>
              ) : (
                filteredSupport
                  .filter((support) => support.supportStatus === false)
                  .map((support, index) => (
                    <tr key={index} className="border-b-[2px] bg-white">
                      <th
                        scope="row"
                        className="whitespace-nowrap border-l-[1px] border-r-[1px] px-6 py-4 text-xl font-medium text-cyan-600"
                      >
                        {index + 1}
                      </th>

                      <td className="border-r-[1px] px-3 py-4">
                        <Link to={`/manager/order-details/${support.orderId}`}>
                          {" "}
                          {support.orderId}
                        </Link>
                      </td>
                      <td className="border-r-[1px] px-3 py-4">
                        <Link to={`/manager/user-details/${support.username}`}>
                          {support.username}
                        </Link>
                      </td>
                      <td className="border-r-[1px] px-3 py-4">
                        {support.supportDescription}
                      </td>
                      <td className="border-r-[1px] px-3 py-4">
                        <div className="flex gap-x-3">
                          <p>
                            {support.supportStatus === false
                              ? "Đang giải quyết"
                              : "Đã giải quyết"}
                          </p>
                          <button
                            onClick={() =>
                              handleUpdate(support.supportId, support.username)
                            }
                          >
                            <GrUpdate />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {notification && (
        <Notification notificationMessage={"Update status successfully"} />
      )}
    </div>
  );
};

export default SupportPage;
