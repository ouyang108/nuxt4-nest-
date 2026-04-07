export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("focus", {
    // 服务器端不需要 mounted 钩子，也不需要任何逻辑
    // 只要注册了这个名字，Vue 在 SSR 阶段就不会报 "Failed to resolve directive" 了
    // 看官网文档
    getSSRProps() {
      // 返回空对象，告诉服务器：忽略这个指令，直接渲染 HTML 即可
      return {};
    },
  });
});
