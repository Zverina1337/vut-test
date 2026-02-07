<template>
  <button v-bind="attrs">
    <slot/>
  </button>
</template>

<script setup lang="ts">
import { useAttrs, type ButtonHTMLAttributes } from 'vue';
const attrs = useAttrs() as ButtonHTMLAttributes;

interface Emits {
  (e: 'click'): void
} 

const emit = defineEmits<Emits>()
</script>
