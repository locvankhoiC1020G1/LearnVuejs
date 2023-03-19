import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { authStore } from "../store/modules/authStore.js";

/**
 * Routes
 */
import homeRoutes from "./modules/home";

const routes = [
  ...homeRoutes,
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "Đăng nhập",
    },
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    meta: {
      title: "403 - Forbidden",
    },
    component: () => import("../views/auth/Forbidden.vue"),
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    meta: {
      title: "401 - Unauthorized",
    },
    component: () => import("../views/auth/Unauthorized.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    meta: {
      title: "404 - Not Found",
    },
    component: () => import("../views/auth/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function middlewarePipeline(context, middleware, index) {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) return context.next;
  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);

    nextMiddleware({ ...context, next: nextPipeline });
  };
}

router.beforeEach((to, from, next) => {
  const auth = authStore();

  // if (!auth.token && to.name != "Login") next("/login");

  if (!to.meta.middleware) return next();

  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    auth,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

router.afterEach((to, from) => {
  nextTick(
    () =>
      (document.title =
        to?.meta?.title || "" + " - " + import.meta.env.VITE_APP_NAME)
  );
});

export default router;
