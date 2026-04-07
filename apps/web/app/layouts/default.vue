<template>
  <Header />
  <LazySearch v-if="hasTriggered" />
  <slot />
</template>
<script setup lang="ts">
const { hasTriggered } = useSearchShortcuts(true);
</script>
