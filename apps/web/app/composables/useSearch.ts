// composables/useSearch.ts
const useSearchState = () => {
  const isOpen = useState("search-visible", () => false);
  const hasTriggered = useState("search-loaded", () => false);

  const openSearch = () => {
    isOpen.value = true;
    hasTriggered.value = true; // 确保 Lazy 组件被加载
  };

  const closeSearch = () => (isOpen.value = false);

  return { isOpen, hasTriggered, openSearch, closeSearch };
};
export const useSearchShortcuts = (isEventListener = false) => {
  const { openSearch, isOpen, hasTriggered, closeSearch } = useSearchState();

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "f") {
      e.preventDefault();

      openSearch();
    }
  };
  const handleEscKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      isOpen.value = false;
    }
  };
  onMounted(() => {
    if (isEventListener) {
      window.addEventListener("keydown", handleKeydown);
      window.addEventListener("keydown", handleEscKeydown);
    }
  });
  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("keydown", handleEscKeydown);
  });
  return {
    isOpen,
    hasTriggered,
    closeSearch,
  };
};
