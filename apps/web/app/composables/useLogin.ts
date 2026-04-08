export const useLoginState = () => {
  const isOpenLogin = useState("login-visible", () => false);
  const hasTriggeredLogin = useState("login-loaded", () => false);

  const openLoginModal = () => {
    if (!hasTriggeredLogin.value) {
      hasTriggeredLogin.value = true; // 确保 Lazy 组件被加载
    }
    openLogin();
  };
  const openLogin = () => {
    isOpenLogin.value = true;
  };
  const closeLogin = () => (isOpenLogin.value = false);
  const handleEscKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeLogin();
    }
  };
  const windowListener = () => {
    window.addEventListener("keydown", handleEscKeydown);
    return () => {
      window.removeEventListener("keydown", handleEscKeydown);
    };
  };

  return {
    isOpenLogin,
    hasTriggeredLogin,
    openLoginModal,
    openLogin,
    closeLogin,
    windowListener,
  };
};
