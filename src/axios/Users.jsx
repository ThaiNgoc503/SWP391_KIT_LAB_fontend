import AxiosClient from "./AxiosClient";

const END_POINT = {
  PROFILE: "profile",
  UPDATE_PROFILE: "update-profile",
};

export const getUserProfile = () => {
  const response = AxiosClient.get(`${User}/${END_POINT.PROFILE}`);
};
