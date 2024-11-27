import AxiosClient from "./AxiosClient";

const END_POINTS = {
  REGISTER: "register",
  LOGIN: "login",
  LOGIN_GOOGLE: "login-google",
  LOGOUT: "logout",
  REFRESH: "refresh",
};

export const loginAPI = async (credentials) => {
  try {
    const response = await AxiosClient.post(`${"Auth"}/${END_POINTS.LOGIN}`, credentials);
    return response.data; 
  } catch (error) {
    console.error("Login failed:", error);
  }
};
