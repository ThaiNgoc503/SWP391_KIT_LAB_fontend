import AxiosClient from "./AxiosClient";

const END_POINT = {
  PROFILE: "profile",
  UPDATE_PROFILE: "update-profile",
};

export const getUserProfile = async () => {
  const response = await AxiosClient.get(`${"Users"}/${END_POINT.PROFILE}`);
  return response.data.data;
};
