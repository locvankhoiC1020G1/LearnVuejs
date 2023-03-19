import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./store";
import VueSweetalert2 from "vue-sweetalert2";
import Datepicker from "@vuepic/vue-datepicker";
import constant from "./config/constant.js";

import moment from "moment";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "./style.css";
import "./assets/css/custom-sweetalert2.css";
import "@vuepic/vue-datepicker/dist/main.css";
import toast from "./helpers/toast.js";

createApp(App)
  .component("vue-datepicker", Datepicker)
  .provide("$config", constant)
  .provide("$toast", toast)
  .provide("$moment", moment)
  .use(router)
  .use(pinia)
  .use(VueSweetalert2)
  .mount("#app");
