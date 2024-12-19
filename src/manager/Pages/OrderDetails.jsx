import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../../api/Orders";

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const [orderDetails, setOrderDetail] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchAPI();
  }, []);

  const MoneyFormatter = (amount) => {
    const formattedMoney = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
    return <span>{formattedMoney}</span>;
  };

  const fetchAPI = async () => {
    const response = await getOrderById(id);
    setOrder(response);
    if (response) {
      setOrderDetail(response.orderDetails);
    }
  };

  return (
    <div className="h-screen bg-slate-100 p-5 md:px-[15rem]">
      <div className="bg-white-200 mt-9 w-[full] bg-white p-10">
        <h2 className="pb-5 text-left text-xl font-bold">Order ID: {id}</h2>
        <div className="flex flex-col gap-y-2 pl-2">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <h2 className="font-bold">Customer UserName:</h2>
              <p className="font-medium">
                <Link to={`/manager/user-details/${order.customerUsername}`}>
                  {order.customerUsername}
                </Link>
              </p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Order Date:</h2>
              <p className="font-medium">{order.orderDate}</p>
            </div>
          </div>

          <hr />
          <h2 className="font-bold">Order Details:</h2>
          {orderDetails.map((orderDetails, index) => (
            <div className="space-y-3 pb-2 pl-5" key={index}>
              <div className="space-y-2">
                <h2 className="font-semibold text-cyan-600">
                  Product Name {index + 1}:
                </h2>
                <p className="pl-2 font-medium">{orderDetails.productName}</p>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-cyan-600">Quantity:</h2>
                <p className="font-medium">{orderDetails.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-cyan-600">Price:</h2>
                <p className="font-medium">
                  {MoneyFormatter(orderDetails.price)}
                </p>
              </div>
              <hr />
            </div>
          ))}
          <div className="flex gap-2">
            <h2 className="font-bold">Total Amount:</h2>
            <p className="font-medium">{MoneyFormatter(order.totalAmount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
