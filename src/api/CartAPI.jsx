import AxiosClient from "./AxiosClient";

const END_POINTS = {
  GET_CURRENTS_USER: "get-current-user",
  ADD_ITEMS: "add-items",
  UPDATE_ITEMS_QUANTITY: "update-items-quantity",
  REMOVE_ITEMS: "remove-items",
  CLEAR_ALL_ITEMS: "clear-all-items",
  CHECKOUT: "checkout",
};

export const getCurrentUserAddItemsAPI = async () => {
  const response = await AxiosClient.get(
    `${"Cart"}/${END_POINTS.GET_CURRENTS_USER}`,
  );
  return response.data.data;
};

export const AddItemsAPI = async (data) => {
  await AxiosClient.post(`${"Cart"}/${END_POINTS.ADD_ITEMS}`, data);
};

export const UpQuantity = async (quantity, cartItemId) => {
  await AxiosClient.put(
    `${"Cart"}/${END_POINTS.UPDATE_ITEMS_QUANTITY}/${cartItemId}`,
    { quantity },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
