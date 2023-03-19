import { defineStore } from "pinia";
import service from "../../services/service";
import router from "../../router";
import { pinia } from "../index.js";
import { commonStore } from "./commonStore.js";

const common = commonStore(pinia);

export const authStore = defineStore({
  namespaced: true,
  id: "auth",
  state: () => ({
    permissionList: [],
    token: null,
    user: null,
  }),
  actions: {
    async login(params) {
      let url = "/login";
      const response = await service.post(url, params);
      if (response.data?.success == true && response.status == 200) {
        this.token = response.data.result.token;
        this.user = response?.data.result.user;
      }

      return response;
    },
    definePermissionList(item) {
      this.permissionList = item;
    },
    async logout() {
      this.token = null;
      this.user = null;
      common.isCallingApi = true;
      setTimeout(function () {
        common.isCallingApi = false;
        router.push({ name: "Login" });
      }, 200);
    },
  },
  getters: {
    isLogin() {
      return this.token !== null;
    },
  },
  persist: true,
});
