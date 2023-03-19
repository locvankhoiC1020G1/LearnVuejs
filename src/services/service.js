import ApiService from "./api";
import { commonStore } from "../store/modules/commonStore.js";
import { pinia } from "../store/index.js";
import Toast from "../helpers/toast.js";
const common = commonStore(pinia);

/**
 * HTTP STATUS CODE
 */
const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;
const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_INTERNAL_SERVER_ERROR = 500;

export default {
  async post(url, params = {}) {
    try {
      if (common.isCallingApi) return;
      common.isCallingApi = true;
      return await ApiService.post(url, params);
    } catch (e) {
      return this._setError(e);
    } finally {
      common.isCallingApi = false;
    }
  },
  async put(url, params = {}) {
    try {
      if (common.isCallingApi) return;
      common.isCallingApi = true;
      return await ApiService.put(url, params);
    } catch (e) {
      return this._setError(e);
    } finally {
      common.isCallingApi = false;
    }
  },
  async get(url, params = {}) {
    try {
      common.isCallingApi = true;
      return await ApiService.get(url, params);
    } catch (e) {
      return this._setError(e);
    } finally {
      common.isCallingApi = false;
    }
  },

  async delete(url, params = {}) {
    try {
      if (common.isCallingApi) return;
      common.isCallingApi = true;
      return await ApiService.delete(url, params);
    } catch (e) {
      return this._setError(e);
    } finally {
      common.isCallingApi = false;
    }
  },

  async export(url, params = {}) {
    try {
      return await ApiService.get(url, params, { responseType: "blob" });
    } catch (e) {
      e.response.data = JSON.parse(await e.response.data.text());
      return this._setError(e);
    }
  },

  async _setError(e) {
    common.isCallingApi = false;

    switch (e.response?.status) {
      case HTTP_UNPROCESSABLE_ENTITY:
        return e.response.data;
        break;
      case HTTP_UNAUTHORIZED:
        return e.response.data;
        break;
      case HTTP_FORBIDDEN:
        break;
      case HTTP_INTERNAL_SERVER_ERROR:
        console.log(e.response.data.message);
        Toast.fire({
          icon: "error",
          title: e.response.data.message || "Lỗi hệ thống",
        });
        break;
    }
    return e.response.data;
  },
};
