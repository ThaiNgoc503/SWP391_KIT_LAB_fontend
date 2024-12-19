import AxiosClient from "./AxiosClient";

const END_POINT = {
  PROFILE: "profile",
  UPDATE_PROFILE: "update-profile",
};

export const getUserProfile = async (username) => {
  const response = await AxiosClient.get(
    `${"Users"}/${END_POINT.PROFILE}/${username}`,
  );
  console.log(username);
  return response;
};

export const updateUserProfile = async (username, values) => {
  const response = await AxiosClient.put(
    `${"Users"}/${END_POINT.UPDATE_PROFILE}/${username}`,
    values,
  );
  return response.data;
};
