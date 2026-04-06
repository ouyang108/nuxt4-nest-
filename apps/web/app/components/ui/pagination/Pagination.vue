<script setup lang="ts">
import {
  PaginationRoot,
  PaginationList,
  PaginationListItem,
  PaginationFirst,
  PaginationPrev,
  PaginationNext,
  PaginationLast,
  PaginationEllipsis,
} from "reka-ui";
import type { PaginationRootProps, PaginationRootEmits } from "reka-ui";
import { useForwardPropsEmits } from "reka-ui";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<PaginationRootProps & { class?: string }>(),
  { showEdges: true },
);
const emits = defineEmits<PaginationRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const btnBase =
  "inline-flex items-center justify-center size-9 rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50";
const btnGhost = `${btnBase} hover:bg-accent hover:text-accent-foreground`;
const btnActive = `${btnBase} border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground`;
</script>

<template>
  <PaginationRoot v-bind="forwarded" :class="cn('', props.class)">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst :class="btnGhost">
        <ChevronsLeft class="size-4" />
      </PaginationFirst>
      <PaginationPrev :class="btnGhost">
        <ChevronLeft class="size-4" />
      </PaginationPrev>

      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem
          v-if="item.type === 'page'"
          :value="item.value"
          :class="
            cn(
              btnBase,
              item.isSelected
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-accent hover:text-accent-foreground border border-input bg-background shadow-xs',
            )
          "
        >
          {{ item.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :index="index"
          :class="cn(btnGhost, 'cursor-default')"
        >
          <MoreHorizontal class="size-4" />
        </PaginationEllipsis>
      </template>

      <PaginationNext :class="btnGhost">
        <ChevronRight class="size-4" />
      </PaginationNext>
      <PaginationLast :class="btnGhost">
        <ChevronsRight class="size-4" />
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
