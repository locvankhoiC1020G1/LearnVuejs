import axios from "axios";
import { authStore } from "../store/modules/authStore.js";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.common["contentType"] = "application/json";
axios.defaults.headers.common["Cache-Control"] = "no-cache";
axios.defaults.headers.common["Cache-control"] = "no-store";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Pragma"] = "no-cache";
axios.defaults.headers.common["Expires"] = 0;
axios.defaults.headers.common["Timezone"] = new Date().getTimezoneOffset();
axios.defaults.headers.common["X-Request-With"] = "XMLHttpRequest";
axios.interceptors.request.use(
  async function (config) {
    const auth = authStore();
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default {
  request(method, url, params, data, headers = {}, config = {}) {
    return axios.request({
      ...config,
      url,
      params,
      data,
      method: method.toLowerCase(),
      headers,
    });
  },

  post(url, data, headers = {}, config = {}) {
    return this.request("post", url, {}, data, headers, config);
  },

  get(url, params = null, config = {}) {
    return this.request("get", url, params, {}, {}, config);
  },

  put(url, data, config = {}) {
    return this.request("put", url, {}, data, {}, config);
  },

  delete(url, params = {}, data = {}, config = {}) {
    return this.request("delete", url, params, data, {}, config);
  },
};
