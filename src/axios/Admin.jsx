import AxiosClient from "./AxiosClient";

const END_POINTS = {
  GET_ALL_USER: "get-all-user",
  BAN: "ban",
  UN_BAN: "unban",
};

export const getAllUser = () => {
  return AxiosClient.get(`${"Admin"}/${END_POINTS.GET_ALL_USER}`);
};

export const banUser = (userId) => {
  return AxiosClient.post(`${"Admin"}/${userId}/${END_POINTS.BAN}`);
};

export const unbanUser = (userId) => {
  return AxiosClient.post(`${"Admin"}/${userId}/${END_POINTS.UN_BAN}`);
};
