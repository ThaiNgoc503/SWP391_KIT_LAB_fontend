import AxiosClient from "./AxiosClient";

const END_POINTS = {
  GET_ALL: "get-all",
};

export const getAllSubcategories = async () => {
  const response = await AxiosClient.get(
    `${"Subcategories"}/${END_POINTS.GET_ALL}`,
  );
  return response.data.data;
};
