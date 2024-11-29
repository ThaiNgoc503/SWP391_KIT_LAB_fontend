import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    const token = JSON.parse(jwt);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token.TOKEN}`;
    }
    return config;
  },
  (error) => {
    console.log("Error request api");
    console.log(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //   if (error.response?.status === 401) {
    //     localStorage.removeItem("jwt");
    //     window.location.href = "/login";
    //   }
    //   return Promise.reject(error);
    console.log("Error response api");
    console.log(error);
  }
);

export default instance;
