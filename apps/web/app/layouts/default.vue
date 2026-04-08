<template>
  <Header />
  <LazySearch v-if="hasTriggered" />
  <LazyLogin v-if="hasTriggeredLogin" />
  <slot />
</template>
<script setup lang="ts">
const { hasTriggered } = useSearchShortcuts(true);
const { hasTriggeredLogin, windowListener } = useLoginState();
let removeListener: () => void;
onMounted(() => {
  removeListener = windowListener();
});
onUnmounted(() => {
  if (removeListener) {
    removeListener();
  }
});
</script>
