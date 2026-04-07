<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { WORD_API } from "~/constants/api";
import type { Word } from "@en/common";
const wordList = ref<Word[]>([]);
const { isOpen } = useSearchShortcuts();
const copyWord = (word: string) => {
  // http环境不支持复制

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(word)
      .then(() => {
        console.log("复制成功");
      })
      .catch((err) => {
        console.error("复制失败:", err);
      });
  } else {
    console.error("当前环境不支持复制功能");
  }
};
// 可以使用虚拟列表来优化性能，这样就不做分页了
const getList = async () => {
  const res = await $fetch(WORD_API, {
    params: {
      word: search.value,
      page: 1,
      pageSize: 20,
    },
  });

  wordList.value = res.data.list || [];
};
let timer: ReturnType<typeof setTimeout> | null = null;
const search = customRef((track, trigger) => {
  let value = ""; //默认值
  return {
    get() {
      track(); //告诉vue追踪value的值
      return value;
    },
    set(newValue: string) {
      value = newValue;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        getList();
        trigger(); //告诉vue触发value的值，从而触发依赖
      }, 500);
    },
  };
}); //搜索的一个值
onMounted(() => {});
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 w-full h-full z-40 bg-black opacity-30 blur-sm"
  />
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 shadow-lg z-50 p-30 pt-20">
      <div
        :class="
          wordList.length > 0
            ? 'rounded-tr-[10px] rounded-tl-[10px]'
            : 'rounded-[10px]'
        "
        class="flex items-center gap-2 shadow-lg w-1/2 mx-auto p-3 bg-white"
      >
        <Search class="size-5 text-gray-500" />
        <!-- <ClientOnly> -->
        <UiInput
          v-focus
          placeholder="搜索"
          type="text"
          v-model="search"
          class="w-full h-full text-sm border-none rounded-lg p-2 focus:outline-none"
        />
        <!-- </ClientOnly> -->
      </div>
      <div
        v-if="wordList.length > 0"
        class="w-1/2 mx-auto max-h-[500px] border-t border-gray-200 overflow-y-auto"
      >
        <div
          @click="copyWord(item.word)"
          v-for="item in wordList"
          :key="item.id"
          class="bg-white hover:bg-blue-50 text-gray-800 p-4 cursor-pointer shadow-sm hover:shadow-md"
        >
          <div class="text-sm font-semibold text-blue-600 mb-1">
            {{ item.word }}
          </div>
          <div
            v-html="item.translation"
            class="text-sm text-gray-700 mb-1 overflow-hidden line-clamp-2"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
