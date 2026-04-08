import { BLOCKED_ROUTES } from "../constants/router";
export default defineNuxtRouteMiddleware((to, from) => {
  //   if (to.params.id === '1') {
  //     return abortNavigation()
  //   }
  //   // 在真实应用中你可能不会把每个路由都重定向到 `/`
  //   // 但在重定向前检查 `to.path` 是很重要的，否则可能会造成无限重定向循环
  //   if (to.path !== '/') {
  //     return navigateTo('/')
  //   }
  const isAllowed = BLOCKED_ROUTES.some((route) => to.path.includes(route));

  if (isAllowed) {
    return;
  } else {
    // 需要判断是否登录
    // return navigateTo("/home");
    return abortNavigation();
  }
});
