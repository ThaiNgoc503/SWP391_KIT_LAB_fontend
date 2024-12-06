import AxiosClient from "./AxiosClient";

const END_POINTS = {
  GET_ALL: "get-all",
  CREATE: "create",
  UPDATE: "update",
  GET_ALL_PAGINATION: "get-all-pagination",
};

export const getProductAPI = async () => {
  const response = await AxiosClient.get(`${"Product"}/${END_POINTS.GET_ALL}`);
  return response.data.data;
};

export const getProductByIdAPI = async (id) => {
  const response = await AxiosClient.get(`${"Product"}/${id}`);
  return response.data.data;
};

export const getProductPaginationAPI = async (data) => {
  const response = await AxiosClient.get(
    `${"Product"}/${END_POINTS.GET_ALL_PAGINATION}`,
    { params: data },
  );
  return response.data.data.items;
};
export const updateProductAPI = async (id, data) => {
  const response = await AxiosClient.put(
    `${"Product"}/${END_POINTS.UPDATE}/${id}`,
    data,
  );
  return response.data;
};
export const createProductAPI = async (data) => {
  const response = await AxiosClient.post(
    `${"Product"}/${END_POINTS.CREATE}`,
    data,
  );
  return response.data;
};

export const deleteProductAPI = async (id) => {
  const response = await AxiosClient.delete(`${"Product"}/${id}`);
  return response.data;
};
