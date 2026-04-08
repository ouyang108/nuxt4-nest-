<template>
  <header
    class="flex items-center h-20 border-b border-gray-200 justify-center sticky top-0 bg-white z-10 w-full"
  >
    <div class="w-300 mx-auto flex items-center justify-between">
      <div
        class="text-2xl font-bold bg-indigo-700 text-white rounded-[10px] px-2 py-1 w-10 flex items-center justify-center h-10"
      >
        E
      </div>
      <div class="text-2xl font-bold">English App</div>
      <div
        v-for="menu in menus"
        :key="menu.path"
        @click="changePath(menu.path)"
        :class="[
          'flex items-center gap-2 cursor-pointer rounded-[10px] px-2 py-1',
          isActive(menu.path)
            ? 'bg-indigo-100 text-indigo-700 font-semibold'
            : 'text-gray-500 hover:bg-gray-100',
        ]"
      >
        <Icon :name="menu.icon" class="text-xl" />
        <span>{{ menu.label }}</span>
      </div>
      <div
        class="flex items-center gap-2 bg-blue-200 text-blue-700 rounded-full px-2 py-1"
      >
        <Icon name="mdi:weather-sunny" class="text-xl" />
        <span class="font-bold text-sm">{{ 0 }}</span>
      </div>
      <div
        class="flex items-center gap-2 bg-amber-200 text-amber-700 rounded-full px-2 py-1"
      >
        <Icon name="mdi:star" class="text-xl" />
        <span class="font-bold text-sm">{{ 0 }}</span>
      </div>
      <div
        class="flex items-center gap-2 border-l cursor-pointer border-gray-200 pl-4"
      >
        <img
          class="w-10 h-10 rounded-full ml-2 mr-2"
          src="https://gips3.baidu.com/it/u=3493347002,3356558679&fm=3074&app=3074&f=PNG?w=2048&h=2048"
        />
        <span class="text-sm font-bold">{{ "未登录" }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { BLOCKED_ROUTES } from "../../constants/router";
const { isOpenLogin } = useAuth("web");
const router = useRouter();
const route = useRoute();

const menus = [
  { path: "/home", icon: "mdi:home", label: "主页" },
  { path: "/smart/chat", icon: "mdi:auto-fix", label: "AI" },
  { path: "/word-book/index", icon: "mdi:notebook", label: "词库" },
  { path: "/courses/index", icon: "mdi:book-open-variant", label: "课程" },
  { path: "/setting/index", icon: "mdi:cog", label: "设置" },
];
const changePath = (path: string) => {
  isOpenLogin(path);
  if (route.path !== path) {
    router.push(path);
  }
};

const isActive = (path: string) => route.path === path;
</script>
