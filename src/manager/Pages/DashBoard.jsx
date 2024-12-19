import React, { useEffect, useState } from "react";
import { getAllOrder, getOrder } from "../../api/Orders";
import ChartBar from "../components/ChartBar";
import ChartLine from "../components/ChartLine";
import { getAllUser } from "../../api/AdminAPI";
import { FaBookmark, FaBoxOpen, FaUserGroup } from "react-icons/fa6";
import { getProductAPI } from "../../api/ProductAPI";
import { getAllLabs } from "../../api/LabAPI";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { LuContainer } from "react-icons/lu";

const DashBoard = () => {
  const [orders, setOrder] = useState([]);
  const [users, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    fetch(); //lấy order list
    fetchAll(); //lấy tất cả sản phẩm
  }, []);

  const fetch = async () => {
    const rs = await getAllOrder();
    setOrder(rs);
  };

  const fetchAll = async () => {
    const rs = (await getAllUser()).data.data;
    const rs2 = await getProductAPI();
    const rs3 = await getAllLabs();
    setUser(rs);
    setProduct(rs2);
    setLabs(rs3);
  };

  //gộp ngày và tiền lại chở thành đới tượng kiểu "2024-11-1": 3000000
  const sum = orders.reduce((value, order) => {
    if (value[order.orderDate]) {
      value[order.orderDate] += order.totalAmount;
    } else {
      value[order.orderDate] = order.totalAmount;
    }
    return value;
  }, {});

  //Object.entries chuyển đổi object thành mãng [{}, {}]....
  const sumArray = Object.entries(sum).map(([orderDate, totalAmount]) => {
    //tinh tong so tien khach hang mua trong 1 ngay
    const [yearTmp, monthTmp, dayTmp] = orderDate.split("-"); //lay nam thanh ngay string
    const year = Number.parseInt(yearTmp);
    const month = Number.parseInt(monthTmp);
    const day = Number.parseInt(dayTmp);

    return { orderDate: orderDate, totalAmount: totalAmount, year, month, day };
  });

  //sap xep ngay thang từ thấp đến cao
  sumArray.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  });

  const sumQuantityProduct = orders.reduce((result, order) => {
    order.orderDetails.forEach((detail) => {
      if (result[detail.productName]) {
        result[detail.productName] += detail.quantity;
      } else {
        result[detail.productName] = detail.quantity;
      }
    });
    return result;
  }, {});

  const dataQuantityProduct = Object.entries(sumQuantityProduct).map(
    ([productName, quantity]) => {
      return { productName: productName, quantity: quantity };
    },
  );

  const MoneyFormat = (data) => {
    const format = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(data);
    return <span>{format}</span>;
  };

  const totalMoney = orders.reduce((sum, order) => {
    const data = Number.parseInt(order.totalAmount);
    return (sum += data);
  }, 0);

  const totalQuantityProduct = orders.reduce((result, order) => {
    order.orderDetails.forEach((order) => {
      const quantity = order.quantity;
      const data = Number.parseInt(quantity, 10);
      result += data;
    });

    return result;
  }, 0);

  return (
    <div className="flex h-screen flex-wrap bg-slate-100">
      <div className="flex">
        <div className="ml-20 mr-10 mt-5 flex h-[5rem] w-[13rem] items-center justify-center gap-x-2 rounded-md bg-white text-slate-600">
          <div>
            <h3 className="text-xl font-bold">
              {users.filter((user) => user.status === "Active").length}
            </h3>
            <p>Account Active</p>
          </div>
          <div className="pl-10 text-2xl text-cyan-600">
            <FaUserGroup />
          </div>
        </div>
        <div className="mx-5 mt-5 flex h-[5rem] w-[13rem] items-center justify-center gap-x-2 rounded-md bg-white text-slate-600">
          <div>
            <h3 className="text-xl font-bold">{product.length}</h3>
            <p> Product</p>
          </div>
          <div className="pl-10 text-2xl text-cyan-600">
            <FaBoxOpen />
          </div>
        </div>
        <div className="mx-5 mt-5 flex h-[5rem] w-[13rem] items-center justify-center gap-x-2 rounded-md bg-white text-slate-600">
          <div>
            <h3 className="text-xl font-bold"> {labs.length}</h3>
            <p>Labs</p>
          </div>
          <div className="pl-10 text-2xl text-cyan-600">
            <FaBookmark />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="ml-3 h-[400px] rounded-md bg-white p-3 text-xl font-semibold">
          <h1>Daily income</h1>
          <ChartBar data={sumArray} />
        </div>
        <div>
          <div className="mx-2 h-[300px] rounded-md bg-white p-3 text-xl font-semibold">
            <h1>Total quantity product sold</h1>
            <ChartLine data={dataQuantityProduct} />
          </div>
          <div className="mx-2 mt-2 flex h-[5.5rem] w-[16rem] items-center justify-center gap-x-2 rounded-md bg-cyan-600 text-white">
            <div>
              <h3 className="text-xl font-bold">{totalQuantityProduct}</h3>
              <p> Products sold</p>
            </div>
            <div className="pl-10 text-2xl text-white">
              <LuContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
