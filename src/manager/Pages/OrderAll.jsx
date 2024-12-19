import React, { useEffect, useRef, useState } from "react";
import { FaCartShopping, FaFilter, FaFirstOrderAlt } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getAllOrder, updateDeliveryOrder } from "../../api/Orders";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Notification from "../../customer/components/Notification";
import { GrUpdate } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { TiTick, TiTickOutline } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";

const OrderAll = () => {
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startYear, setStartYear] = useState(new Date());
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [menu, setMenu] = useState(false);
  const [notification, setNotification] = useState(false);
  const menuRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const response = await getAllOrder();
    setOrder(response);
    setFilteredOrder(response);
  };

  useEffect(() => {
    filterOrderDate();
  }, [startDate]);

  useEffect(() => {
    filterOrderYear();
  }, [startYear]);

  const filterOrderDate = () => {
    if (!startDate) {
      setFilteredOrder(order);
    } else {
      //   const filter = order.filter((order) => {
      //     const choiceDate = new Date(startDate).toISOString().split("T")[0];
      //     const orderDay = new Date(order.orderDate).toISOString().split("T")[0];
      //     return choiceDate === orderDay;
      //   });
      //   setFilteredOrder(filter);
      const choiceDate = new Date(startDate).toLocaleDateString();
      const filter = order.filter((order) => {
        const orderDay = new Date(order.orderDate).toLocaleDateString();
        return choiceDate === orderDay;
      });
      setFilteredOrder(filter);
    }
  };
  const filterOrderYear = () => {
    if (!startYear) {
      setFilteredOrder(order);
    } else {
      const filter = order.filter((order) => {
        const choiceDate = startYear.getFullYear();
        const orderDay = new Date(order.orderDate).getFullYear();
        return choiceDate === orderDay;
      });
      setFilteredOrder(filter);
    }
  };

  const filterOrder = (data) => {
    const today = new Date();
    const sevenDayAgo = new Date(today);
    sevenDayAgo.setDate(today.getDate() - data);

    const filter = order.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= sevenDayAgo && orderDate <= today;
    });
    setFilteredOrder(filter);
  };

  const handleUpdate = async (id, currentStatus) => {
    let newStatus = "";
    if (currentStatus === "Đã đặt hàng") {
      newStatus = "Đang giao hàng";
    } else if (currentStatus === "Đang giao hàng") {
      newStatus = "Đã giao hàng";
    }
    const data = { deliveryStatus: newStatus };
    const response = await updateDeliveryOrder(id, data);
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
      const response = order.filter((order) =>
        order.customerUsername
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      );
      setFilteredOrder(response);
    } else {
      setFilteredOrder(order);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-5">
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col items-end justify-end gap-y-5 md:pr-[9rem]">
          <ul ref={menuRef} className="flex gap-x-2">
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
            <li className="relative">
              <button
                onClick={() => setMenu(!menu)}
                className="flex items-center gap-x-2 rounded-md bg-yellow-100 px-5 py-2"
              >
                <FaFilter className="text-sm" />
                Filter
              </button>
              {menu && (
                <ul className="absolute mt-1 flex flex-col rounded-md bg-white">
                  <li className="border-[1px] border-slate-200 p-1 hover:bg-slate-100">
                    <button onClick={() => filterOrder(7)}>7 Days</button>
                  </li>
                  <li
                    onClick={() => filterOrder(30)}
                    className="border-[1px] border-slate-200 p-1 hover:bg-slate-100"
                  >
                    30 Day
                  </li>
                  <li
                    onClick={() => filterOrder(365)}
                    className="border-[1px] border-slate-200 p-1 hover:bg-slate-100"
                  >
                    1 Year
                  </li>
                  <li className="border-[1px] border-slate-200 p-1 hover:bg-slate-100">
                    <button onClick={() => fetchApi()}>All</button>
                  </li>
                  <li className="border-[1px] border-slate-200 p-1">
                    <DatePicker
                      selected={startYear}
                      onChange={(date) => setStartYear(date)}
                      showYearPicker
                      dateFormat="yyyy"
                    />
                  </li>
                  <li className="border-[1px] border-slate-200 p-1">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <ul className="flex gap-x-2">
            <li className="">
              <Link
                to="/manager/orderAll"
                className="flex items-center gap-x-2 rounded-md bg-green-300 px-3 py-2 hover:bg-opacity-90"
              >
                <div>
                  <FaFirstOrderAlt />
                </div>
                <p>All</p>
              </Link>
            </li>
            <li className="">
              <Link
                to="/manager/order"
                className="flex items-center gap-x-2 rounded-md bg-sky-300 px-3 py-2 hover:bg-opacity-90"
              >
                <div>
                  <FaCartShopping />
                </div>
                <p>Order</p>
              </Link>
            </li>
            <li>
              <Link
                to="/manager/delivery"
                className="flex items-center gap-x-2 rounded-md bg-orange-300 px-2 py-2 hover:bg-opacity-90"
              >
                <div>
                  <TbTruckDelivery />
                </div>
                <p>Delivery</p>
              </Link>
            </li>
            <li>
              <Link
                to="/manager/delivery-success"
                className="flex items-center gap-x-2 rounded-md bg-cyan-300 px-2 py-2 hover:bg-opacity-90"
              >
                <div>
                  <TiTickOutline />
                </div>
                <p>Delivery Successful</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <table className="max-w-screen mx-3 text-left text-base text-black">
              <thead className="border-b-[5px] border-slate-100 bg-white text-sm uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    OrderId
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    orderDate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    totalAmount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delivery
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrder.length == 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrder.map((order, index) => (
                    <tr key={index} className="border-b-[2px] bg-white">
                      <th
                        scope="row"
                        className="whitespace-nowrap border-l-[1px] border-r-[1px] px-6 py-4 text-xl font-medium text-cyan-600"
                      >
                        {index + 1}
                      </th>
                      <td className="border-r-[1px] px-3 py-4">
                        <Link to={`/manager/order-details/${order.orderId}`}>
                          {order.orderId}
                        </Link>
                      </td>
                      <td className="border-r-[1px] px-3 py-4">
                        <Link
                          to={`/manager/user-details/${order.customerUsername}`}
                        >
                          {order.customerUsername}
                        </Link>
                      </td>
                      <td className="border-r-[1px] px-3 py-4">
                        {order.orderDate}
                      </td>
                      <td className="border-r-[1px] px-3 py-4">
                        {order.totalAmount}
                      </td>
                      <td className="border-r-[1px] px-3 py-4">
                        <div className="flex items-center gap-x-2">
                          <p>{order.deliveryStatus}</p>
                          {order.deliveryStatus === "Đã giao hàng" && (
                            <p className="text-xl">
                              <TiTick />
                            </p>
                          )}
                          {order.deliveryStatus === "Đang giao hàng" && (
                            <button
                              onClick={() =>
                                handleUpdate(
                                  order.orderId,
                                  order.deliveryStatus,
                                )
                              }
                            >
                              <GrUpdate />
                            </button>
                          )}
                          {order.deliveryStatus === "Đã đặt hàng" && (
                            <button
                              onClick={() =>
                                handleUpdate(
                                  order.orderId,
                                  order.deliveryStatus,
                                )
                              }
                            >
                              <GrUpdate />
                            </button>
                          )}
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
    </div>
  );
};

export default OrderAll;
