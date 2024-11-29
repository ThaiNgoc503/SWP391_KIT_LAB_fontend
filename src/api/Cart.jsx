import AxiosClient from "./AxiosClient";

const END_POINTS = {
  GET_CURRENTS_USER: "get-current-user",
  ADD_ITEMS: "add-items",
  UPDATE_ITEMS_QUANTITY: "update-items-quantity",
  REMOVE_ITEMS: "remove-items",
  CLEAR_ALL_ITEMS: "clear-all-items",
  CHECKOUT: "checkout",
};

export const getCurrentUserAddItemsAPI = async (credentials) => {
  const response = await AxiosClient.get(
    `${"Cart"}/${END_POINTS.GET_CURRENTS_USER}`
  );
  return response.data.data;
};
