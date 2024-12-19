import AxiosClient from "./AxiosClient";

const END_POINTS = {
  GET_ALL: "get-all",
  CREATE: "create",
  UPDATE: "update",
  GET_ALL_PAGINATION: "get-all-pagination",
};

export const getAllLabs = async () => {
  const response = await AxiosClient.get(`${"Labs"}/${END_POINTS.GET_ALL}`);
  // console.log(response); // Log toàn bộ response
  // console.log(response.data); // Log response.data
  console.log(response.data?.data || []); // Log response.data
  return response.data.data;
};

export const getLabsByIdAPI = async (id) => {
  const response = await AxiosClient.get(`${"Labs"}/${id}`);
  return response.data.data;
};

export const getLabsPaginationAPI = async (data) => {
  const response = await AxiosClient.get(
    `${"Labs"}/${END_POINTS.GET_ALL_PAGINATION}`,
    { params: data },
  );
  return response.data.data.items;
};
export const updateLabsAPI = async (id, data) => {
  const response = await AxiosClient.put(
    `${"Labs"}/${END_POINTS.UPDATE}/${id}`,
    data,
  );
  return response.data;
};
export const createLabsAPI = async (data) => {
  const response = await AxiosClient.post(
    `${"Labs"}/${END_POINTS.CREATE}`,
    data,
  );
  return response.data;
};

export const deleteLabAPI = async (id) => {
  const response = await AxiosClient.delete(`${"Labs"}/${id}`);
  return response;
};
