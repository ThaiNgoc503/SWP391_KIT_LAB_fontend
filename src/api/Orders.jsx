import axiosClient from "./AxiosClient";

const END_POINTS = {
  UPDATE_DELIVERY_STATUS: "update-delivery-status",
  GET_DELIVERY_STATUS: "Get-delivery-statuses",
  GET_BY_ID: "GetById",
};

export const getOrder = async (data) => {
  const response = await axiosClient.get(`/Orders`, { params: data });
  return response.data.data.items;
};
export const getAllOrder = async () => {
  const response = await axiosClient.get(`/Orders/GetAll`);
  return response.data.data;
};

export const updateDeliveryOrder = async (id, data) => {
  const response = await axiosClient.put(
    `/Orders/${id}/${END_POINTS.UPDATE_DELIVERY_STATUS}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

export const getOrderById = async (id) => {
  const response = await axiosClient.get(`/Orders/GetById/${id}?id=${id}`);
  return response.data.data;
};