import { BLOCKED_ROUTES } from "~/constants/router";

// composables/useAuth.ts
export const useAuth = (name: string) => {
  const { openLoginModal } = useLoginState();
  // 1. 定义 Cookie，并设置全局统一的配置
  const token = useCookie<string | null>(name, {
    maxAge: 60 * 60 * 24 * 7, // 7天
    path: "/",
    watch: true, // 响应式更新
    sameSite: "lax",
  });

  // 2. 封装操作逻辑
  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const removeToken = () => {
    token.value = null;
  };

  //  判断是否需要登录框
  const isOpenLogin = (path: string) => {
    const isAllowed = BLOCKED_ROUTES.some((route: string) =>
      path.includes(route),
    );

    if (!isAllowed) {
      // 有没有登录
      const { token } = useAuth("web");

      if (!token.value) {
        openLoginModal();
      }
    }
  };
  return {
    token,
    setToken,
    removeToken,
    isOpenLogin,
  };
};
