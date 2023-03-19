<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { authStore } from "./store/modules/authStore.js";
import { commonStore } from "./store/modules/commonStore.js";
import { storeToRefs } from "pinia";

export default {
  components: {},
  setup() {
    const auth = authStore();
    const common = commonStore();
    const { getIsCallingApi: isCallingApi } = storeToRefs(common);
    const toggleSidebar = ref("");
    const isHideSideBar = ref(false);
    const permissionList = ref([]);

    const isLogin = computed(() => {
      return auth.isLogin;
    });

    function setValueToggleSidebar(value) {
      toggleSidebar.value = value;
      isHideSideBar.value = !isHideSideBar.value;
    }

    auth.definePermissionList(permissionList);

    return {
      permissionList,
      isLogin,
      toggleSidebar,
      isHideSideBar,
      setValueToggleSidebar,
      isCallingApi,
      common,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/style.scss";
</style>
