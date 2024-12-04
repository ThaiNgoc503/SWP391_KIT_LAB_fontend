import AxiosClient from "./AxiosClient";

const END_POINTS = {
  GET_ALL: "get-all",
};

export const getAllLabs = async () => {
  const response = await AxiosClient.get(`${"Labs"}/${END_POINTS.GET_ALL}`);
  return response.data.data;
};
