import Home from "../../views/Home.vue";
import AccessControl from "../middlewares/AccessControl.js";

export default [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Trang chủ",
      page: "Home",
    //   middleware: [AccessControl],thêm midderwear ở đây
    },
    component: Home,
  },
];
