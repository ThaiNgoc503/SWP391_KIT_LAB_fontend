import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt === "") {
      localStorage.removeItem("jwt");
    }
    const tokenData = JSON.parse(jwt);

    if (tokenData) {
      config.headers["Authorization"] = `Bearer ${tokenData.TOKEN}`;
    }
    return config;
  },
  (error) => {
    console.log("Error request api");
    console.log(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Error response api");
    console.log(error);
  },
);

export default instance;
