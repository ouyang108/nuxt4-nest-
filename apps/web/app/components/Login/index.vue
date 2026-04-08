<script setup lang="ts">
import LoginForm from "./component/LoginForm.vue";
import RegisterForm from "./component/RegisterForm.vue";

const { isOpenLogin } = useLoginState();
const loginType = ref("login");
const loginClass = computed(() => {
  return loginType.value === "login"
    ? "bg-indigo-500 text-white shadow-lg px-4 py-2 rounded-md text-sm font-medium transition-all"
    : " hover:text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium transition-all";
});
const registerClass = computed(() => {
  return loginType.value === "register"
    ? "bg-indigo-500 text-white shadow-lg px-4 py-2 rounded-md text-sm font-medium transition-all"
    : " hover:text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium transition-all";
});
// 注册
const handleRegister = (values: Record<string, any>) => {
  const res = $fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { ...values, xixi: "hahahahah" },
  });
};
</script>
<template>
  <div
    v-if="isOpenLogin"
    class="fixed inset-0 bg-black opacity-30 filter blur-sm z-40"
  ></div>
  <Transition name="fade">
    <div
      v-if="isOpenLogin"
      class="fixed inset-30 flex items-center justify-center z-50"
    >
      <div
        class="w-[1200px] h-[700px] bg-white rounded-[20px] shadow-2xl overflow-hidden flex"
      >
        <!-- 左侧 3D 模型区域 暂不考虑 -->
        <!-- <ModelViewer @changeType="changeType" ref="modelViewerRef" /> -->
        <div class="absolute top-10 right-6">
          <div class="flex items-center gap-2 bg-white/10 rounded-lg p-1">
            <button @click="loginType = 'login'" :class="loginClass">
              登录
            </button>
            <button @click="loginType = 'register'" :class="registerClass">
              注册
            </button>
          </div>
        </div>
        <!-- 右侧登录表单区域 -->
        <div class="flex-1 flex flex-col justify-center px-12 py-10 bg-white">
          <LoginForm v-if="loginType === 'login'" />
          <RegisterForm
            v-if="loginType === 'register'"
            @register="handleRegister"
          />
          <div class="mt-6 text-center">
            <div
              class="flex items-center justify-center gap-4 text-sm text-gray-500"
            >
              <span
                class="cursor-pointer hover:text-indigo-600 transition-colors"
                >忘记密码？</span
              >
              <span class="text-gray-300">|</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
