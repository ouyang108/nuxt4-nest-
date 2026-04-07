<script setup lang="ts">
import { ref, onMounted } from "vue";
// import { getWordBookList } from "@/apis/word-book";
import type { WordQuery, WordList } from "@en/common";
import { BookOpen, Volume2 } from "lucide-vue-next";
import { WORD_API } from "~/constants/api";
// import { useAudio } from "@/hooks/useAudio";
let speakContent: (text: string) => void;
onMounted(() => {
  // getList();
  const { speak } = useAudio({});
  speakContent = speak;
});

const list = ref<WordList["list"]>([]);
const query = ref<WordQuery>({
  page: 1,
  pageSize: 20,
  word: "",
  gk: false,
  zk: false,
  gre: false,
  toefl: false,
  ielts: false,
  cet6: false,
  cet4: false,
  ky: false,
});
const {
  data: res,
  pending,
  error,
  refresh,
} = await useLazyFetch(WORD_API, {
  params: query,
  watch: false,
});

const searchWord = () => {
  query.value.page = 1;
  refresh();
};
const result = computed(() => res.value?.data || {});
// const getList = async () => {
//   const res = await getWordBookList(query.value);
//   if (res.success) {
//     total.value = res.data.total;
//     list.value = res.data.list;
//   }
// };

const onPageChange = (page: number) => {
  query.value.page = page;
  refresh();
};

definePageMeta({
  title: "Word Book",
  alias: "/word-book/index",
});

const filters: { key: keyof WordQuery; label: string }[] = [
  { key: "gk", label: "高考" },
  { key: "zk", label: "中考" },
  { key: "gre", label: "GRE" },
  { key: "toefl", label: "TOEFL" },
  { key: "ielts", label: "IELTS" },
  { key: "cet6", label: "六级" },
  { key: "cet4", label: "四级" },
  { key: "ky", label: "考研" },
];
</script>

<template>
  <div
    class="w-[1200px] mx-auto mt-10 bg-linear-to-br from-blue-50 to-indigo-50 rounded-[20px] p-20 shadow-lg flex flex-col h-[calc(100vh-100px)] py-10"
  >
    <!-- 标题区 -->
    <div class="h-20">
      <div class="flex items-center gap-2">
        <BookOpen class="size-5 text-blue-600" />
        <span class="text-2xl font-bold text-gray-800">词库列表</span>
      </div>
      <div class="text-sm text-gray-600">
        词典来源：牛津、柯林斯、BNC、FRQ、高考、中考、GRE、TOEFL、IELTS、大学英语六级、大学英语四级、考研
      </div>
    </div>

    <!-- 搜索 & 筛选栏 -->
    <div class="flex items-center flex-wrap gap-8 mb-5">
      <UiInput
        v-model="query.word"
        placeholder="请输入单词"
        class="w-52"
        @keyup.enter="searchWord"
      />
      <label
        v-for="f in filters"
        :key="f.key"
        class="flex items-center gap-1.5 cursor-pointer select-none text-sm text-gray-700"
      >
        <UiCheckbox v-model="query[f.key] as boolean" />
        {{ f.label }}
      </label>
      <UiButton @click="searchWord">搜索</UiButton>
    </div>

    <!-- 单词卡片列表 -->
    <div class="grid grid-cols-3 gap-2 overflow-y-auto flex-1">
      <!-- loading 骨架屏 -->
      <template v-if="pending">
        <div
          v-for="i in query.pageSize"
          :key="i"
          class="bg-white border border-blue-200 rounded-[10px] p-4 h-[220px] animate-pulse"
        >
          <div class="h-4 bg-blue-100 rounded w-1/3 mb-3"></div>
          <div class="h-3 bg-gray-100 rounded w-1/2 mb-3"></div>
          <div class="h-3 bg-gray-100 rounded w-full mb-2"></div>
          <div class="h-3 bg-gray-100 rounded w-5/6 mb-2"></div>
          <div class="h-3 bg-gray-100 rounded w-4/6 mt-6"></div>
        </div>
      </template>
      <div
        v-else
        v-for="item in result.list || []"
        :key="item.id"
        class="bg-white hover:bg-blue-50 border border-blue-200 text-gray-800 rounded-[10px] p-4 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md h-[220px]"
      >
        <div class="text-sm font-semibold text-blue-600 mb-1">
          {{ item.word }}
        </div>
        <div class="text-sm text-gray-500 mb-1 flex items-center gap-2">
          {{ item.phonetic }}
          <button
            class="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            <Volume2 class="size-4" @click="speakContent(item.phonetic)" />
          </button>
        </div>
        <div class="text-sm text-gray-700 mb-1 overflow-hidden line-clamp-2">
          {{ item.definition }}
        </div>
        <div
          v-html="item.translation"
          class="text-sm text-gray-600 mb-1 overflow-hidden line-clamp-2"
        ></div>
        <div
          class="text-sm text-gray-600 mt-3 flex items-center gap-1.5 flex-wrap"
        >
          <template v-for="f in filters" :key="f.key">
            <UiBadge
              v-if="item[f.key as keyof typeof item]"
              variant="default"
              class="text-xs"
            >
              {{ f.label }}
            </UiBadge>
          </template>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="mt-5 flex justify-start">
      <UiPagination
        :total="result.total || 0"
        :page="query.page"
        :items-per-page="query.pageSize"
        :sibling-count="1"
        show-edges
        @update:page="onPageChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
