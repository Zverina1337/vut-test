<template>
  <button
    v-bind="attrs"
    class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer"
    :class="variantClasses"
  >
    <slot/>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs, type ButtonHTMLAttributes } from "vue";
const attrs = useAttrs() as ButtonHTMLAttributes;

interface Props {
  variant?: "primary" | "danger" | "default";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700";
    case "danger":
      return "border border-red-500 text-red-500 hover:bg-red-50 active:bg-red-100";
    default:
      return "border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100";
  }
});
</script>
