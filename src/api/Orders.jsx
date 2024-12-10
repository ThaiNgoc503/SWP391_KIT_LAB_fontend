import axiosClient from "./AxiosClient";

export const getOrder = async (data) => {
  const response = await axiosClient.get(`/Orders`, { params: data });
  return response.data.data.items;
};
