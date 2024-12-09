import AxiosClient from "./AxiosClient";

const END_POINTS = {
  REGISTER: "register",
  LOGIN: "login",
  LOGIN_GOOGLE: "login-google",
  LOGOUT: "logout",
  REFRESH: "refresh",
};

export const loginAPI = async (data) => {
  const response = await AxiosClient.post(
    `${"Auth"}/${END_POINTS.LOGIN}`,
    data,
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
    },
  );
  return response;
};

export const registerAPI = async (value) => {
  try {
    const response = await AxiosClient.post(
      `${"Auth"}/${END_POINTS.REGISTER}`,
      value,
    );
    return response; // Trả về toàn bộ phản hồi
  } catch (error) {
    console.error("Error in registerAPI:", error.response || error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
