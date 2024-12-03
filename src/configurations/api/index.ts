import axios from "axios";

export const api = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_URL,
  };

  const instance = axios.create(defaultOptions);
  instance.defaults.headers.common["Content-Type"] = "application/json";

  return instance;
};
