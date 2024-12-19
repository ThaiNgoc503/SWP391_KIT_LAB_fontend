import AxiosClient from "./AxiosClient";

const END_POINTS = {
  All: "all",
  USER: "user",
  STATUS: "status",
};

export const getAllSupport = async () => {
  const response = AxiosClient.get(`/SupportRequests/${END_POINTS.All}`);
  return response;
};
export const getSupportByUser = async (userName) => {
  const response = AxiosClient.get(
    `/SupportRequests/${END_POINTS.USER}/${userName}`,
  );
  return response.data.data;
};
export const updateSupport = async (supportId, userName, data) => {
  const response = AxiosClient.put(
    `/SupportRequests/${supportId}/${END_POINTS.STATUS}?username=${userName}`,
    data,
  );
  return response;
};
