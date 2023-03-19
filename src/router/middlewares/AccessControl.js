export default function AccessControl({ to, next, auth }) {
  const allowedRoutes = auth.user.staff_position?.allowed_vue_router_routes;
  if (allowedRoutes == "all_privileges") return next();
  if (allowedRoutes?.split(",").indexOf(to.name) >= 0) return next();
  return next({
    name: "Forbidden",
  });
}
