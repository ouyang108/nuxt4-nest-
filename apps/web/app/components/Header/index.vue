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
        @click="router.push('/home')"
        class="flex items-center gap-2 cursor-pointer rounded-[10px] px-2 py-1 text-gray-500"
      >
        <Icon name="mdi:home" class="text-xl" />
        <span>主页</span>
      </div>
      <div
        @click="router.push('/smart/chat')"
        class="flex items-center gap-2 cursor-pointer text-gray-500"
      >
        <Icon name="mdi:auto-fix" class="text-xl" />
        <span>AI</span>
      </div>
      <div
        @click="router.push('/word-book/index')"
        class="flex items-center gap-2 cursor-pointer text-gray-500"
      >
        <Icon name="mdi:notebook" class="text-xl" />
        <span>词库</span>
      </div>
      <div
        @click="router.push('/courses/index')"
        class="flex items-center gap-2 cursor-pointer text-gray-500"
      >
        <Icon name="mdi:book-open-variant" class="text-xl" />
        <span>课程</span>
      </div>
      <div
        @click="router.push('/setting/index')"
        class="flex items-center gap-2 cursor-pointer text-gray-500"
      >
        <Icon name="mdi:cog" class="text-xl" />
        <span>设置</span>
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
const router = useRouter();
</script>
