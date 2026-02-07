<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <select
      v-model="value"
      v-bind="attrs"
      class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
    >
      <option
        v-for="option in options"
        :value="getOptionValue(option)"
        :key="getOptionLabel(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useAttrs, computed } from 'vue';

const attrs = useAttrs()
interface Props {
  id: string;
  label?: string;
  modelValue: string;
  options: { value: string, label: string }[];
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
});

const getOptionValue = (option: Props['options'][number]) => option.value;
const getOptionLabel = (option: Props['options'][number]) => option.label;
</script>
