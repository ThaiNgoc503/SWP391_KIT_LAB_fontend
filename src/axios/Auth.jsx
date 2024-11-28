import AxiosClient from "./AxiosClient";

const END_POINTS = {
  REGISTER: "register",
  LOGIN: "login",
  LOGIN_GOOGLE: "login-google",
  LOGOUT: "logout",
  REFRESH: "refresh",
};

export const loginAPI = async (credentials) => {
  const response = await AxiosClient.post(
    `${"Auth"}/${END_POINTS.LOGIN}`,
    credentials
  );
  return response.data;
};

export const logoutAPI = async (refreshToken) => {
  const response = await AxiosClient.post(
    `${"Auth"}/${END_POINTS.LOGOUT}`,
    { refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
export const registerAPI = async (data) => {
  const response = await AxiosClient.post(
    `${"Auth"}/${END_POINTS.REGISTER}`,
    data
  );
  return response;
};
